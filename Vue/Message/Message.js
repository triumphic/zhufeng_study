import MessageComponent from './Message.vue'
import Vue from 'vue'


//单例模式
let instance;
let getVueInstance = () => {
    instance = new Vue({
        render: h => h(MessageComponent)
    }).$mount();
    document.body.appendChild(instance.$el)
}   
const Message = {
    success(options){
        //options就是当前弹出来的框

        // 将new Vue的操作只做一次---单例模式
        // 如果实例不存在，就创建一个实例
        !instance && getVueInstance() 
        // 等价于
        // if(!instance){ 
        //     getVueInstance()
        // }

        instance.$children[0].add(options)
    }
}

export {
    Message
}

export default {
    // _Vue 是挡墙的构造函数, 默认Vue.use就会调用这个方法
    install(_Vue){
        // 1) 注册全局组件  2）注册全局指令  3）往原型上添加方法、属性
        let $message = {}
        Object.keys(Message).forEach( key => {
            $message[key] = Message[key]
        } )
        //一般使用新对象时，采用拷贝的方式
        Vue.prototype.$message = $message
    }
}