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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var a;
(function (a) {
    function enhancer(target) {
        target.name = 'likai';
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            enhancer
        ], Person);
        return Person;
    }());
    var p = new Person();
    p.xx; //此时访问的是实例上的属性，需要interface（接口）添加
    Person.name; //此时访问的是类上的属性，可以用类装饰器（enhancer，任意命名）来添加
})(a || (a = {}));
//类装饰器
//把整个类替换
var b;
(function (b) {
    function enhancer(target) {
        return /** @class */ (function (_super) {
            __extends(Child, _super);
            function Child() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.age = 10;
                return _this;
            }
            return Child;
        }(Person));
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'likai';
        }
        Person = __decorate([
            enhancer
        ], Person);
        return Person;
    }());
    var p = new Person();
    p.name;
    p.age;
})(b || (b = {}));
//装饰器工厂函数,即可传参的 装饰器
var c;
(function (c) {
    function enhancer() {
        return function (target) {
            return /** @class */ (function (_super) {
                __extends(class_1, _super);
                function class_1(name, age) {
                    return _super.call(this, name, age) || this;
                }
                class_1.prototype.getAge = function () {
                    console.log(this.age);
                };
                return class_1;
            }(Person));
        };
    }
    var Person = /** @class */ (function () {
        function Person(name, age) {
            this.name = 'likai';
            this.age = 10;
            this.name = name;
            this.age = age;
        }
        Person = __decorate([
            enhancer()
        ], Person);
        return Person;
    }());
    var p = new Person('xiuli', 24);
    console.log(p.age);
})(c || (c = {}));
//属性装饰器
var d;
(function (d) {
    //target 如果装饰的是一个普通属性的话，那么target指向的是类的原型   Person.property
    //target 如果装饰的是一个类的属性static，那么target指向的是类的定义 Person
    function uppercase(target, propertyName) {
        var value = target[propertyName];
        var getter = function () { return value; };
        var setter = function (newValue) {
            value = newValue.toUpperCase();
        };
        delete target[propertyName];
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    }
    function propertyEnumerable(flag) {
        return function (target, propertyName) {
        };
    }
    function methodEnumerable(flag) {
        return function (target, methodName, propertyDesctiptor) {
            propertyDesctiptor.enumerable = flag;
        };
    }
    function toNumber(target, methodName, propertyDesctiptor) {
        var oldMethod = propertyDesctiptor.value;
        propertyDesctiptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args = args.map(function (item) { return parseFloat(item); });
            return oldMethod.apply(this, args);
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'likai';
        }
        Person.prototype.getName = function () {
            console.log('getName');
        };
        Person.prototype.toSum = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return args.reduce(function (accu, item) { return accu + item; }, 0);
        };
        __decorate([
            uppercase,
            propertyEnumerable(false)
        ], Person.prototype, "name", void 0);
        __decorate([
            methodEnumerable(true)
        ], Person.prototype, "getName", null);
        __decorate([
            toNumber
        ], Person.prototype, "toSum", null);
        return Person;
    }());
    var p = new Person();
    p.name = 'jiagou';
    console.log(p.name); //JIAGOU
})(d || (d = {}));
var e;
(function (e) {
    //参数装饰器   装饰参数
    function addAge(target, propertyName, paramsIndex) {
        console.log();
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.login = function (userName, password) {
            console.log(userName, password);
        };
        __decorate([
            __param(1, addAge)
        ], Person.prototype, "login", null);
        return Person;
    }());
})(e || (e = {}));
//各种装饰器的执行顺序：
//1、属性和方法先执行，谁先写谁先执行
//2、方法的时候，先参数再方法， 而且他们一定在一起
//3、最后是类
//4、如果是同类型的，先执行后写的。例如： @lei1   @lei2   class Person {};先执行lei2，再执行lei1
