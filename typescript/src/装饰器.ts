namespace a {
    interface Person {
        xx: string,
        yy: string,
    }
    function enhancer(target: any) {
        target.name = 'likai'
    }
    @enhancer
    class Person{
        constructor(){

        }
    }
    let p = new Person()
    p.xx; //此时访问的是实例上的属性，需要interface（接口）添加
    Person.name     //此时访问的是类上的属性，可以用类装饰器（enhancer，任意命名）来添加
}

//类装饰器
//把整个类替换
namespace b {
    interface Person {
        age: number
    }
    function enhancer(target: any) {
        return class Child extends Person {
            public age: number = 10;
        }
    }
    @enhancer
    class Person{
        public name: string = 'likai'
        constructor(){

        }
    }
    let p = new Person()
    p.name
    p.age
}

//装饰器工厂函数,即可传参的 装饰器
namespace c {
    function enhancer() {
        return function (target: any) {
            return class extends Person {
                constructor(name: string, age: number) {
                    super(name, age)
                }
                getAge() {
                    console.log(this.age)
                }
            }
        }
    }
    @enhancer()
    class Person{
        public name: string = 'likai'
        public age: number = 10;
        constructor( name: string, age: number ){
            this.name = name
            this.age = age
        }
    }
    let p = new Person('xiuli', 24)
    console.log( p.age )
}

//属性装饰器
namespace d {
    //target 如果装饰的是一个普通属性的话，那么target指向的是类的原型   Person.property
    //target 如果装饰的是一个类的属性static，那么target指向的是类的定义 Person
    function uppercase( target: any, propertyName: string ){
        let value = target[propertyName]
        const getter = () => value;
        const setter = (newValue: string) => {
            value = newValue.toUpperCase()
        }
        delete target[propertyName]
        Object.defineProperty( target, propertyName, {
            get: getter,
            set: setter,
            enumerable:true,
            configurable: true,
        } )
    }
    function propertyEnumerable(flag: boolean){
        return function( target: any, propertyName: string ){

        }
    }
    function methodEnumerable( flag: boolean ) {
        return function( target: any, methodName:string, propertyDesctiptor: PropertyDescriptor ){
            propertyDesctiptor.enumerable = flag
        }
    }
    function toNumber( target: any, methodName: string, propertyDesctiptor: PropertyDescriptor ){
        let oldMethod = propertyDesctiptor.value
        propertyDesctiptor.value = function(  ...args: any[] ){
            args = args.map( item => parseFloat(item) )
            return oldMethod.apply( this, args )
        }
    }
    class Person {
        @uppercase
        @propertyEnumerable(false)
        name: string = 'likai'
        @methodEnumerable(true)
        getName(){
            console.log('getName')
        }
        @toNumber
        toSum(...args: any[]){
            return args.reduce( (accu, item) => accu + item, 0 )
        }
    }
    let p = new Person()
    p.name = 'jiagou'   
    console.log(p.name) //JIAGOU
}

namespace e {
    //参数装饰器   装饰参数
    function addAge( target: any, propertyName: string, paramsIndex: number ){
        console.log(  )
    }
    class Person {
        login( userName:string, @addAge password: string ){
            console.log(userName, password)
        }
    }
}

//各种装饰器的执行顺序：
//1、属性和方法先执行，谁先写谁先执行
//2、方法的时候，先参数再方法， 而且他们一定在一起
//3、最后是类
//4、如果是同类型的，先执行后写的。例如： @lei1   @lei2   class Person {};先执行lei2，再执行lei1