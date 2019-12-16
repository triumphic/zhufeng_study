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
Object.defineProperty(exports, "__esModule", { value: true });
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
//参数属性
var a;
(function (a) {
    var Person = /** @class */ (function () {
        function Person(name) {
            this.name = name;
        }
        return Person;
    }());
    var p = new Person('likai');
    // p.name = 'xiuli'  在上面name参数被readonly作用过后，name是只读的，传值进去是不可行的，报错
    console.log(p.name);
})(a || (a = {}));
//继承
/*
   子类继承父类后，子类的实例上就拥有了父类的属性和方法
                公开    受保护的  私有的
   访问修饰符   public protected private
   public   自己 自己的子类和其他类都可以访问
   protected    自己和自己的子类可以访问，其他类不可以访问
   private      只有自己可以访问，自己的子类不能访问，其他类更不行

   静态属性   static    静态属性定义的属性和变量在类上，而其他的在类的原型上
*/
var b;
(function (b) {
    var Person = /** @class */ (function () {
        function Person(name, age) {
            this.name = name;
            this.age = age;
        }
        Person.prototype.getName = function () {
            return this.name + this.Idcard;
        };
        Person.prototype.setName = function (newName) {
            this.name = newName;
        };
        return Person;
    }());
    var Student = /** @class */ (function (_super) {
        __extends(Student, _super);
        function Student(name, age, stuNo) {
            var _this = _super.call(this, name, age) || this;
            _this.stuNo = stuNo;
            return _this;
        }
        Student.getType = function () {
            return Student.type;
        };
        Student.prototype.getStuNo = function () {
            return this.stuNo;
        };
        Student.prototype.setStuNo = function (newStuNo) {
            this.stuNo = newStuNo;
        };
        Student.type = '学生';
        return Student;
    }(Person));
    var stu1 = new Student('likai', 25, 1);
    // stu1拥有父类和本身的属性和方法，因此，Student继承了Person类
    Student.type;
})(b || (b = {}));
