let Vue;

class ModuleCollection{ //格式化
    constructor(options){
        console.log(options)
        this.register([], options); //注册模块 将模块注册成树结构
    }
    register(path, rootModule){
        console.log(path)
        let module = {  //将模块格式化
            _rawModule: rootModule,
            _children: {},
            state: rootModule.state
        }
        if(path.length == 0){
            this.root = module; //如果是根模块，将这个模块挂载到根实例上
        }else{
            //递归都用reduce方法    通过_children 属性进行查找
            let parent = path.slice(0, -1).reduce( (root, current) => {
                return root._children[current]
            },this.root )
            parent._children[path[path.length - 1]] = module
        }
        //看当前模块是否有modules
        console.log(rootModule.modules)
        if(rootModule.modules){     //如果有modules 开始重新再次注册
            forEach( rootModule.modules, (moduleName, module) => {
                this.register( path.concat(moduleName), module )
            } )
        }

    }
}
const forEach = (obj, cb) => {
    Object.keys(obj).forEach( key => {
        cb(key, obj[key])
    } )
}
class Store {
    constructor(options = {}){
        //将用户的状态放到了store中
        this.s =new Vue({   // 核心  定义了响应式变化  数据更新  更新视图
            data(){
                return {state: options.state}
            }
        })

        let getters = options.getters;
        this.getters = {};
        forEach(getters, (getterName, fn)=>{
            Object.defineProperty(this.getters, getterName, {
                get: () => {
                    return fn(this.state)
                }
            })
        })

        let mutations = options.mutations;  //获取所有的同步的更新操作方法
        this.mutations = {};
        forEach(mutations, (mutationsName, fn) => {
            this.mutations[mutationsName] = (payload) => {
                //内部的第一个参数是状态
                fn(this.state, payload)
            }
        })

        let actions = options.actions;
        this.actions = {};
        forEach( actions, (actionsName, fn) => {
            this.actions[actionsName] = (payload) => {
                fn(this, payload)
            }
        } )

        this._modules = new ModuleCollection(options);  //把数据格式化成一个想要的树结构
        console.log(this._modules)
    }
    dispatch = (actionsName, payload) => {
        this.actions[actionsName](payload)  //源码中有个变量 来控制是否是通过mutation来更新状态的，不是的话报错
    }
    //提交更改 会在当前的store上 找到对应的函数执行
    commit = (mutationsName, payload) => {
        this.mutations[mutationsName](payload)
    }
    get state(){    //类的属性访问器
        return this.s.state;
    }
}
const install = (_Vue) => {
    Vue = _Vue; //vue得构造函数
    console.log('install');
    //vue的组件渲染顺序
    Vue.mixin({
        //创建之前会被执行
        beforeCreate(){
            //我需要拿到store，给每个组件都增加$store属性
            if(this.$options && this.$options.store){
                //给根实例增加 $store 属性
                this.$store = this.$options.store;
            }else{
                //有可能单独创建了一个实例，没有父亲，那就无法获取到store属性
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

export default {
    //给用户提供一个install方法 默认会被调用
    install,
    Store
}