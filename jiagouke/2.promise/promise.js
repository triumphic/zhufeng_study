const { promises } = require("fs")

const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

// 判断x的状态 是让promise2变成成功态还是失败态
function resolvePromise(promise2, x, resolve, reject) {
    // 1) 不能引用同一个对象 可能会造成死循环
    if( promise2 === x ){
        throw Error('TypeError: Chaining cycle detected for promise #<Promise>')
    }
    // 2) 判断x的类型 x如果是对象或者是函数 说明它有可能是一个promise
    let called;
    if( (typeof x === 'object' && x != null) || typeof x === 'function' ){
        // 有可能是promise  peomise要有then方法
        try {
            let then = x.then; // 看当前的promise有没有then方法 有可能取then的时候报错
            if(typeof then === 'function'){ // 是一个promise
                then.call(x, y => { // 当前promise解析出来的结果可能还是一个promise 继续解析知道它是一个普通值位置
                    if( called ) return;
                    called = true;
                    // 递归解析resolve的值
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if( called ) return;
                    called = true;
                    reject(r);
                })
            }else{
                resolve(x)
            }
        } catch (e) {
            if( called ) return;
            called = true;
            reject(e)
        }
    }else{
        resolve(x)
    }
}
class Promise {
    constructor(executor) {
        this.state = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];
        let resolve = (value) => {
            if( value instanceof Promise ){
                value.then( resolve, reject)    //递归解析，知道是普通值为止
                return;
            }
            if (this.state === PENDING) {
                this.state = RESOLVED;
                this.value = value;
                this.resolveCallbacks.forEach(fn => fn());
            }
        }
        let reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.rejectCallbacks.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            console.log(e);
            reject(e)
        }
    }
    catch(errcallback){ // catch就是没有成功的then方法
        this.then(null, errcallback);
    }
    then(onfulfilled, onrejected) {
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : v=>v;
        onrejected = typeof onrejected === 'function' ? onrejected : err => {throw err};
        //为了实现链式调用，就创建一个新的promise
        let promise2 = new Promise((resolve, reject) => {
            if (this.state === RESOLVED) {
                setTimeout(() => {
                    try {
                        let x = onfulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onrejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.state === PENDING) {
                this.resolveCallbacks.push(() => {
                    // 切片编程
                    //TODO...
                    setTimeout(() => {
                        try {
                            let x = onfulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.rejectCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return promise2;
    }
}

module.exports = Promise;