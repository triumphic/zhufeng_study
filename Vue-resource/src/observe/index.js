import { arrayMethods } from './array'
class Observer {
    constructor(value) {     //需要对value属性重新定义

        //value可能是对象， 可能是数组， 分类来处理
        // value.__ob__ = this;    //this指的是Observer     这种方式会引起循环引用，换成Object.defineProperty  __ob__enumerable设置为不可枚举
        Object.defineProperty(value, '__ob__', {
            value: this,
            enumerable:false,   //不能被枚举表示  不能被循环
            configurable: false,   //补鞥呢删除此属性
        })
        if (Array.isArray(value)) {
            //数组不用defineProperty类进行代理  性能不好

            //push shift reverse sort pop unshift splice ...  重写数组的方法
            Object.setPrototypeOf(value, arrayMethods);     //value.__proto__ = arrayMethods    vue的数组中，使用重写的方法，会先找改写后的（arrayMethods中的），若没有，在根据原型链查找Array上的
            this.observeArray(value);       //处理原有数组中的对象
        } else {
            this.walk(value)
        }
    }
    observeArray(value){
        for(let i = 0 ; i <value.length ; i++){
            observe(value[i]);
        }
    }
    walk(data) {
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key]);
        })
    }
}
export function defineReactive(data, key, value) {  //vue2中数据嵌套不要过深， 过深浪费性能
    //value可能也是个对象
    if (typeof data !== 'object' || data == null) {
        return;
    }
    observe(value);  //对结果递归拦截

    Object.defineProperty(data, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue === value) return;
            observe(newValue);      //如果用户设置的是一个对象  就继续讲用户设置的对象变成响应式的
            value = newValue;
        }
    })
}
export function observe(data) {
    //只对对象类型进行观测，非对象类型无法观测
    if (typeof data !== 'object' || data == null) {
        return;
    }
    if(data.__ob__){    //防止循环引用
        return;
    }
    //通过类实现对数据的观测  类可以方便扩展，会产生实例
    return new Observer(data);
}