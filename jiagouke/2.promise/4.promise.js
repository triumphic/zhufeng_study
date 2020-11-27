let util = require('util');
let fs = require('fs');

let read = util.promisify(fs.readFile);

function isPromise(x){
    if( (typeof x == 'object' && x != null) || typeof x == 'function' ){
        if( typeof x.then == 'function' ){
            return true;
        }
    }
    return false;
}
Promise.all = function(promises){
    return new Promise( (resolve, reject) => {
        let arr = [];
        let idx = 0;
        let processData = function(value, index){
            arr[index] = value;
            if(++idx == promises.length){
                resolve(arr);
            }
        }
        for(let i = 0 ; i < promises.length ; i++){
            let currentValue = promises[i];
            if( isPromise(currentValue) ){
                currentValue.then( y=>{
                    processData(y, i)
                } )
            }else{
                processData(currentValue, i)
            }
        }
    } )
}


Promise.all([100, read('./jiagouke/2.promise/name.txt', 'utf8'), 16, read('./jiagouke/2.promise/age.txt', 'utf8')]).then(data=>{
    console.log(data);
}).catch(err => {
    console.log(err);
})