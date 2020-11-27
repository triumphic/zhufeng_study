//什么叫高阶函数： 1.如果一个函数的参数是一个函数（回调函数也是一个高阶函数）
//2.如果一个函数返回一个函数  这个函数叫高阶函数

//判断类型
// 1）typeof 无法辨别对象类型
// 2）constructor 谁构造出来的
// 3）instanceof 判断谁是谁的实例  __proto__
// 4）Object.prototype.toString.call  

function isType(type){
    //将string保存在了这个代码块中
    return function(content){ 
        // 为了改变this指向
        return Object.prototype.toString.call(content) === `[object ${type}]`;
    }
}
// 高阶函数实现了第一个功能  保存变量（闭包）
let isString = isType("String");
// 什么叫闭包，在定义的时候，函数就已经决定了 一个函数不在自己的所在作用域下执行 
console.log(isString('hello'));