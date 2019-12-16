import { stringify } from "querystring";

//如何定义类
//类需要
class Person {
    name: string = '李凯';
    age: number;
    constructor() {
        this.age = 25;
    }
}
let p1 = new Person()
console.log( p1.name )

//存取器    getter  setter
class Person1 {
    myname: string;
    constructor(name: string) {
        this.myname = name;
    }
    get name(){
        return this.myname
    }
    set name(newVal: string){
        this.myname = newVal.toLocaleUpperCase()
    }
}
let p2 = new Person1('likai')
console.log(p2.name)    //likai
p2.name = 'xiuli'
console.log(p2.name)    //XIULI

//参数属性
namespace a{
    class Person {
        constructor(public readonly name: string) {  //public的作用在这里相当于在类中定义name: string 和 constructor中添加this.name = name

        }
       
    }
    let p = new Person('likai')
    // p.name = 'xiuli'  在上面name参数被readonly作用过后，name是只读的，传值进去是不可行的，报错
    console.log(p.name)
}

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
namespace b{
    class Person {
        public name: string;
        protected age: number;
        private Idcard: number;
        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }
        getName(){
            return this.name + this.Idcard
        }
        setName(newName: string){
            this.name = newName;
        }
    }
    class Student extends Person{
        static type: string = '学生'
        stuNo: number;
        constructor( name: string, age: number, stuNo: number ){
            super( name, age )
            this.stuNo = stuNo
        }
        static getType(){
            return Student.type
        }
        getStuNo(){
            return this.stuNo
        }
        setStuNo(newStuNo: number){
            this.stuNo = newStuNo;
        }
    }
    let stu1 = new Student('likai', 25, 1)
    // stu1拥有父类和本身的属性和方法，因此，Student继承了Person类
    Student.type
}