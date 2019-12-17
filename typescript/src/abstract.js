"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var a;
(function (a) {
    //抽象类
    //抽象描述一种抽象的概念，无法被实例化，只能被继承
    //无法创建抽象类的实例
    //抽象方法不能在抽象类中实现，只能在子类中实现，且必须实现
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        return Animal;
    }());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cat.prototype.getName = function () {
            return this.name;
        };
        return Cat;
    }(Animal));
    var cat = new Cat();
    cat.name = 'likai';
    console.log(cat.getName());
    var point = { x: 100, y: 100 };
    //类可以实现多个接口，但只能实现一个父类
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.speak = function () { };
        Person.prototype.eat = function () { };
        return Person;
    }());
})(a || (a = {}));
var b;
(function (b) {
    //重写   子类重新实现并覆盖父类的方法
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Animal.prototype.speak = function () {
            throw new Error("此方法不能被调用");
        };
        return Animal;
    }());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cat.prototype.speak = function () {
            console.log("喵喵喵");
            _super.prototype.speak.call(this); //继承父类的speak函数
        };
        return Cat;
    }(Animal));
    var cat = new Cat();
    cat.speak();
})(b || (b = {}));
