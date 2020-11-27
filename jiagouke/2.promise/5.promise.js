const { promises } = require('fs');
const { resolve } = require('path');
let Promise = require('./promise');

// let p = new Promise((resolve, reject) => {
//     resolve(new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(100)
//         }, 1000)
//     })
//     )
// })

// p.then(data => {
//     console.log(data);
// })

Promise.resolve= function(value){
    return new Promise((resolve, reject) => {
        resolve(value)
    })
}
Promise.reject= function(value){
    return new Promise((resolve, reject) => {
        reject(value)
    })
}

Promise.resolve( new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100)
    }, 1000)
}) ).then( data => {
    console.log(data);
} )

//Promise.resolve 和 Promise.reject区别

//Promise.resolve 这里可以接受一个promise，Promise.reject 接受promise不会有等待效果