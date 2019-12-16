//函数定义
function hello ( name: string ): void {
    console.log('姓名 '+ name);
    
}

//type用来定义一个类型或类型别名
type GetUserNameType = ( firstName: string, lastName: string ) => {name: string}
//函数表达式
let getUserName: GetUserNameType = function( firstName: string, lastName: string ): {name: string} {
    return {name: firstName + lastName};
}
//可选参数
function printA( name: string, age?: number, home?: string ){
    console.log(name+age+home)
}
// printA()
printA('李凯')
printA('李凯', 25)
printA('李凯', 25, '山东')

//默认参数
function ajax( url: string, methods: string = 'GET' ) {

}
ajax('/user')
ajax('/user','POST')

//剩余参数
function sum( ...numbers: Array<number> ) {
    return numbers.reduce( ( accu, item ) => accu + item, 0 )
}

//函数重载
let obj: any = {}
function attr( val: string ): void
function attr( val: number ): void
function attr(val: any): void{
    if( typeof val == 'string' ){
        obj.name = val
    }else if( typeof val == 'number' ){
        obj.age = val
    }
}
attr('zhufeng')
attr(10)
console.log(obj)

function sumNum( a:number, b:number ):void
function sumNum( a:string, b:string ):void
function sumNum( a: any, b: any ): void{

}
sumNum('a', 'b')
sumNum(1, 5)