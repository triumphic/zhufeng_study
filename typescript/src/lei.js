"use strict";
//如何定义类
//类需要
var Person = /** @class */ (function () {
    function Person() {
        this.name = '李凯';
        this.age = 25;
    }
    return Person;
}());
var p1 = new Person();
console.log(p1.name);
//存取器    getter  setter
var Person1 = /** @class */ (function () {
    function Person1(name) {
        this.myname = name;
    }
    Object.defineProperty(Person1.prototype, "name", {
        get: function () {
            return this.myname;
        },
        set: function (newVal) {
            this.myname = newVal.toLocaleUpperCase();
        },
        enumerable: true,
        configurable: true
    });
    return Person1;
}());
var p2 = new Person1('likai');
console.log(p2.name); //likai
p2.name = 'xiuli';
console.log(p2.name); //XIULI
