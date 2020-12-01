// 如何用proxy 来实现响应式原理
let obj = {
    name: {
        name: 'lk'
    },
    arr: ['吃', '喝', '玩']
}

// 缺点： 兼容性差 可以代理13种方法 set get...
let handler = {
    // target 就是原对象 obj
    // key 就是当前取得哪个值
    get(target, key){
        if(typeof target[key] === 'object' && target[key] !== null){
            // 递归代理 只有取到对应值的时候 才会进行代理
            return new Proxy(target[key], handler);
        }
        return Reflect.get(target, key); //等价于 return target[key];
    },
    set(target, key, value){
        let oldValue = target[key];
        console.log(key, target,oldValue, value);
        if(!oldValue){
            console.log('新增属性');
        }else if(oldValue !== value){
            console.log('修改属性');
        }
        // target[key] = value;    // 设置时 如果设置不成功，设置不成功不会报错  例如对象不可配置
        return Reflect.set(target, key, value);
    }
}
let proxy = new Proxy(obj, handler)
// proxy.name.name = '大牛'
// console.log(proxy.name.name);

// proxy.arr.push(123)
// proxy.arr[0] = 100
proxy.xxx = 100;
console.log(proxy);