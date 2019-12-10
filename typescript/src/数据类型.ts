//如果代码中有export import之类的代码，那么这个文件变成一个模块
export {}
let name: string = '李凯';
let age: number = 25;
let married: boolean = false;
let hobbies: string[] = ['1','2','3'];
let interests: Array<string> = ['4','5','6'];
//元组 类似一个数组，它是一个长度和类型都固定的数组
// 1)长度固定    2）数组内，类型可以不一样
let point: [number, number] = [100, 200];
let person: [string, number] = ['李凯', 10]

//枚举
enum Gender {
    BOY,
    GITL
}
console.log( `小明是${Gender.BOY}` )    //0
console.log( `小红是${Gender.GITL}` )   //1
// var Gender;
// (function (Gender) {
//     Gender[Gender["BOY"] = 0] = "BOY";
//     Gender[Gender["GITL"] = 1] = "GITL";
// })(Gender || (Gender = {}));

// ----枚举的本质----
// let Gender2 = {
//     0: 'BOY',
//     1: 'GIRL',
//     'BOY': 0,
//     'GIRL': 1,
// }

enum week {
    MONDY = 1,
    TUESDAY = 2
}

console.log( week.TUESDAY )

//常量枚举
const enum Colors {
    Red,
    Yellow,
    Blue
}
console.log( Colors.Red, Colors.Yellow, Colors.Blue )

//任意类型  anyscript
//第三方库没有类型转换 ||  类型定义的时候  ||  数据结构太复杂太灵活   用any

let root: HTMLElement | null = document.getElementById("root");
root!.style.color = 'red'

let roots: any = document.getElementById("root");
roots.style.color = 'pink'

//null undefined    是其他类型的子类型，可以把它们赋值给其他类型的变量
//null 为空    undefined  未定义
let myname: string = null;
let myname2: string = undefined

//void类型  空的    没有
function greeting( name: string ):void {
    console.log( `${name}你好` )
    return null;
}
greeting('李凯')
//函数不能有返回值

//never 永远不
//never是其他类型的子类型，代表永远不会出现的值
//在函数内部永远跑出错误，导致函数永远无法正常结束
function createError( message: string ): never {
    console.log(1)
    throw new Error('error')
    console.log(2)
}

//类型推论  猜
let nameNum = 1;    //number 由于后面的赋值而猜的 number 类型
nameNum = 2;
let nameNum2;   //any   由于后面没有赋值而猜的 any 类型
nameNum2 = 'aaa'

//包装对象  java的装箱和拆箱
//自动在基本类型和对象类型之间切换
//1、基本类型上没有方法
//2、在内部迅速完成一个装箱的操作，把基本类型迅速包装秤对象类型，然后用对象调用方法
let name2: string = '李凯';

name2.toLocaleLowerCase();
//上面的就相当于
let nameAgain = new String(name2);
nameAgain.toLocaleLowerCase()

//联合类型  
let name3: string | number;     //name3可能是string也可能是number

//类型断言  当开发者确定该变量为某个类型时可用
let name4: string | number;
(name4 as string).toLocaleLowerCase()

//字面量类型    定义的变量的值只能是定义时的几个选项之一
let name5: 'likai' | '李凯'
name5 = 'likai'

