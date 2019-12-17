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

    //3、任意属性
    interface PlainObject {
        [propName: string]: number  //给任意属性的描述，下面的对象中只要类型对，添加多少项都可以
    }
    let obj: PlainObject = {
        a: 1,
        b: 2,
        c: 3,
    }

    // 4、接口继承
    interface SpeakableFather{
        speakFather(): void
    }
    interface SpeakableSon extends SpeakableFather{
        speakSon(): void
    }
    // SpeakableSon继承了SpeakableFather中定义的方法
    class Human implements SpeakableSon{
        speakFather() {  }
        speakSon() {  }
    }

    //5、接口的只读-readonly
    interface Circle{
        readonly PI: number,
        radius: number
    }
    let circle: Circle = {
        PI: 3.14,
        radius: 10,
    }
    // circle.PI = 3.15    //加了readonly之后无法更改

    //6、接口还可以用来约束函数
    interface DisCoount{
        (price: number): number     //约束了函数的参数是number类型，返回值是number类型
    }
    let cost: DisCoount = function( price: number ): number {
        return price * 0.8;
    }

    // 7、可索引接口---是用来对数组和对象进行约束的
    interface UserInterface{
        [index: number]: string
    }
    let arr: UserInterface = ['1', '2', '3']
    let obj2: UserInterface = {
        1: '1',
        2: '2',
        3: '3',
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

namespace c{
    //类接口    可以用来装饰类
    interface Speakable{
        name: string,
        speak(words: string): void
    }
    class Dog implements Speakable {
        name: string;
        speak() {  }
    }
    //约束构造函数类型  使用new约束
    class Animal{
        constructor( public name: string ){

        }
    }
    interface withNameClass{
        new(name: string): Animal
    }
    function createAnimal( clazz: withNameClass, name: string ){    //使用接口定义入参中的构造函数---new 的是构造函数
        return new clazz(name);
    }
    createAnimal( Animal, 'zhufeng' )
}