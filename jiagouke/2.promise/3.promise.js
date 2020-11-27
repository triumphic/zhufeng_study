let fs = require('fs');
// const { promisify } = require('util');
let Promise = require('./promise')

// function read(...args){
//     return new Promise( (resolve, reject) => {
//         fs.readFile(...args, function(err, data){
//             if(err) reject(err);
//             resolve(data);
//         })
//     } )
// }

function promisify(fn){
    return function(...args){
        return new Promise( (resolve, reject) => {
            fn(...args, function(err, data) {
                if(err) reject(err);
                resolve(data);
            })
        } )
    }
}

let readFile = promisify(fs.readFile);

readFile('./jiagouke/2.promise/name.txt', 'utf8').then( data => {
    console.log(data);
    return readFile(data, 'utf8');
}, err => {
    console.log(err);
} ).then(data=>{
    console.log(data);
}).catch(e =>{
    console.log(e);
})



// fs.readFile('./jiagouke/2.promise/name.txt', 'urf8', function(err, data){
//     fs.readFile(data, 'utf8', function(err, data){
//         console.log(data);
//     })
// })
