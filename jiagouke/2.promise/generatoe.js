// generator

// function * read(){
//     let a = yield 1;
//     console.log(a);
//     let b = yield 2;
//     console.log(b);
//     let c = yield 3;
//     console.log(c);
// } 

// let it = read();
// it.next('hello');    // 第一次传递的参数 是无意义的
// it.next('world');    //next传递的参数 会给上一次yield的返回值
// it.next('xxx');

const util = require('util');
const fs = require('fs');
let read = util.promisify(fs.readFile);
function * readAge(){
    let content = yield read('./jiagouke/2.promise/name.txt', 'utf8');
    let age = yield read(content, 'utf8');
    return age;
}

//co 库   ：   依次执行 生成器  不停地调用next方法，将最终结果返回出来
function co(it){
    return new Promise( (resolve, reject) => {
        // 异步迭代
        function next(r){
            let { value, done} = it.next(r);
            if(done){
                resolve(value);
            }else{
                Promise.resolve(value).then( data=>{
                    next(data);
                }, reject )
            }
        }
        next()
    } )
}

co(readAge()).then( data => {
    console.log(data);
} )