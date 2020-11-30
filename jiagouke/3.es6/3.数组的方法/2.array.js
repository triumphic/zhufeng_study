// 数组的方法 es5  forEach reduce map filter some every
// es6 find findIndex
// es7 includes

// reduce 
let r = [{price:100, count:1}, {price: 200, count: 2}, {price: 3, count: 3}].reduce((a, b)=>{
    return a + b.price*b.count;
}, 0)   // 第二个参数 0  是指定第一项为0 为了保证返回值为数值 若 a.price*a.count + b.price*b.count 返回值为NAN
console.log(r);

// reduce的常见的功能  多个数据 最终变成了一个数据
let keys = ['name', 'age'];
let values = ['lk', 26];

// let obj = keys.reduce( (a, b, index) => {
//     a[b] = values[index];
//     return a;
// }, {} )
// 简化写法
let obj = keys.reduce( (a, b, index) => (a[b] = values[index], a), {} )

console.log(obj);

// reduce redux compose ( 组合函数 )
function add(a, b){
    return a + b;
}

function toUpper(str){
    return str.toUpperCase();
}

function addStr(str){
    return "***"+str+"***";
}
// 使用reduceRight
// function compose(...fns){
//     return function(...args){
//         let lastFn = fns.pop();
//         return fns.reduceRight( (a, b) => {
//             return b(a);
//         }, lastFn(...args) )
//     }
// }
// 使用reduce   简写： let compose = (...fns) => fns.reduce((a, b) => (...args) => (a(b(...args))))
function compose(...fns){
    return fns.reduce( (a, b) => {
        return (...args) => {
            return a(b(...args))
        }
    } )
}


let r = compose(addStr, toUpper, add)('mtweb','lk');
console.log(r);


// 手写reduce
Array.prototype.reduce = function( callback, prev ){
    for( let i = 0 ; i < this.length ; i++ ){
        if(prev == undefined){
            prev =  callback(this[i], this[i+1], i+1, this);
            i++;
        }else{
            prev = callback(prev, this[i], i, this)
        }
    }
    return prev;
}

let result = [1, 2, 3].reduce( (a, b) => {
    return a + b;
}, 100 )
console.log(result);

// map 映射 filter some every 
let newArr = [1,2,3].map(item=>item*2); // 循环每一项 都*2
[1,2,3].filter(item=>item!=2); // 删除为2的 返回true表示留下
[1,2,3,4].some((item)=>item==5);
[1,2,3,4,5].every((item)=>item==1); // 看看有没有不等于1的 有的话返回false
[1,2,3].find(item=>item==2) // 找到后返回找到的那一项 找不到返回undefind
// [1,2,3].indexOf(1)>-1   => [1,2,3].includes(2)  true