//观察一个数据Vue2.0    defineProperty，针对数组length，只针对对象，数组没有使用defineProperty

let arrayProtos = Array.prototype; //数组原型上的方法
let proto = Object.create(arrayProtos);
['push', 'shift', 'splice'].forEach( method => {
    proto[method] = function(...args) { //这个数组应该也被监控
        console.log('视图更新');
        // Array.prototype.push.call([1,2,3],4,5,6)
        let inserted;   //默认没有插入新数据
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':  //数组的splice方法，只有传递三个参数才有追加效果
                inserted = args.splice(2);
            default:
                break;
        }
        observerArray(inserted)
        arrayProtos[method].call(this, ...args)

    }
} )
function observerArray(obj){
    for (let i = 0; i < obj.length; i++) {
        let item = obj[i];
        observer(item)
    }
}
function observer(obj){
    if (typeof obj !== 'object' || typeof obj === null) {
        return obj;
    }
    //处理数组  push shift splice   (如果调用者三个方法，应该把这个值也判断一下是否是对象)
    if( Array.isArray(obj) ){
        Object.setPrototypeOf(obj, proto)   //实现一个对数组方法进行重写    相当于obj.__proto__ = proto
        observerArray(obj)
    }else{
        //处理对象
        for (let key in obj) {
            defineReactive(obj, key, obj[key])
        }
    }
    
}

function defineReactive(obj, key, value){
    observer(value);    //递归创建响应式数据，性能不好
    Object.defineProperty(obj,key,{
        get() {
            return value;
        },
        set(newValue) { //给某个key设置值的时候，可能也是一个对象
            observer(newValue);
            if(value !== newValue){
                value = newValue;
            }
        }
    })
}

let data = {
    d: [1,2,3,{name:'lk'}]
};
// console.log(observer(data));
observer(data)
data.d[3].name = {
    n: 'jsk'
}
data.d.push({
    age: 26
})
data.d.push({
    num: 100
})
data.d[4].age = 25;
//特点：    使用对象的时候  必须先声明属性，这个属性才是响应式的
// 1.增加不存在的属性 不能更新视图  （vm.$set）
// 2.vue默认会递归所有数据，增加getter和setter
// 3.数组里套对象是支持响应式变化的，如果是常量则没有效果
// 4.修改数组索引和长度 是不会导致视图更新的
// 5.如果新增的数据，vue中也会帮你监控（对象类型）