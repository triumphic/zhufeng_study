let oldArrayProtoMethods = Array.prototypel

//不能直接改写数组原有方法  不可靠，因为只有被vue控制的数组才需要改写

export let arrayMethods = Object.create(Array.prototype)

let methods = [     //concat slice 都不能改变原数组
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'reverse',
    'sort'
]

methods.forEach( method => {    //AOP切片编程
    arrayMethods[method] = function (...args) {     //重写数组方法
        console.log("数组变化");
        
        //有可能用户新增的数据是对象格式  也需要进行拦截
        let result = oldArrayProtoMethods[method].call(this, ...args);
        let inserted;
        switch(method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':  //splice(0, 1, xxx)
                inserted = args.slice(2)
            default:
                break;
        }
        if(inserted) this.__ob__.observeArray(inserted);    //this指的是value
        return result;
     }
} )