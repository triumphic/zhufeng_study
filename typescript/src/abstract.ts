namespace a{
    //抽象类
    //抽象描述一种抽象的概念，无法被实例化，只能被继承
    //无法创建抽象类的实例
    //抽象方法不能在抽象类中实现，只能在子类中实现，且必须实现
    abstract class Animal {
        name: string;
        abstract getName(): string
    }
    class Cat extends Animal {
        getName(): string {
            return this.name
        }
    }
    let cat = new Cat();
    cat.name = 'likai'
    console.log(cat.getName())

    //接口 interface
    //1、可以用来描述对象的形状 ，指的是对象有哪些属性，属性是什么类型
    interface Point {
        x: number,
        y: number
    }
    let point: Point = { x: 100, y: 100 }
    //2、还可以用来描述行为的抽象
    interface Speakable {
        speak(): void
    }
    interface Eatable {
        eat(): void
    }
    //类可以实现多个接口，但只能实现一个父类
    class Person implements Speakable, Eatable {
        speak() { }
        eat() { }
    }
}

namespace b{
    //重写   子类重新实现并覆盖父类的方法
    class Animal{
        constructor() {}
        speak() {
            throw new Error("此方法不能被调用")
        }
    }
    class Cat extends Animal{
        speak(){    //speak函数重写
            console.log("喵喵喵")
            super.speak()       //继承父类的speak函数
        }
    }
    let cat = new Cat()
    cat.speak()
}