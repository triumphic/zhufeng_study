// var的问题，let的优点
// 1) vai声明的变量，污染全局
// var a = 1; console.log(window.a)

// 2）使用var导致变量提升问题
// console.log(a);
// var a = 1;

// 3)var 可以被重复声明 let可以解决重复定义问题
// var a = 1;
// var a = 2;
// var a = 3;

// 4) var 作用域的问题 （常见的作用域 全局作用域  函数作用域）
{
    var a = 100;
}
console.log(a); // 100

// const 常量  不会变的量（对象：地址不变即可）