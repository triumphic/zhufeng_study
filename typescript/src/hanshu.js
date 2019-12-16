"use strict";
//函数定义
function hello(name) {
    console.log('姓名 ' + name);
}
//函数表达式
var getUserName = function (firstName, lastName) {
    return { name: firstName + lastName };
};
//可选参数
function printA(name, age, home) {
    console.log(name + age + home);
}
// printA()
printA('李凯');
printA('李凯', 25);
printA('李凯', 25, '山东');
//默认参数
function ajax(url, methods) {
    if (methods === void 0) { methods = 'GET'; }
}
ajax('/user');
ajax('/user', 'POST');
//剩余参数
function sum() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (accu, item) { return accu + item; }, 0);
}
//函数重载
var obj = {};
function attr(val) {
    if (typeof val == 'string') {
        obj.name = val;
    }
    else if (typeof val == 'number') {
        obj.age = val;
    }
}
attr('zhufeng');
attr(10);
console.log(obj);
function sumNum(a, b) {
}
sumNum('a', 'b');
sumNum(1, 5);
