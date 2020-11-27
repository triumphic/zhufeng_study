let Promise = require("./promise");

const { resolve } = require("path")

let promise = new Promise((resolve, reject) => {
    // setTimeout(() => {
    //     resolve("xxx")
    // }, 1000)
    resolve('xxx')
})

let promise2 = promise.then((data) => {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve(new Promise( (resolve, reject) => {
                setTimeout( () => {
                    reject('hello')
                }, 1000 )
            } ))
        }, 1000 )
    } );
})

promise2.then().then().then( (data)=>{
    console.log('data',data);
}, (err) => {
    console.log('err',err);
} )
