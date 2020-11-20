const fs = require('fs');
// 订阅好一件事 当这件事发生的时候  触发对应的函数      
// 订阅on 发布 emit  promise内部也是基于发布订阅的      


let e = {
    _obj: {},
    _callbacks: [],
    on(callback){
        this._callbacks.push(callback)
    },
    emit(key, value){
        this._obj[key] = value
        this._callbacks.forEach( method => {
            method(this._obj)
        } )
    }
}

e.on(function(obj){        // 每次发布都会触发此函数
    console.log(obj);
})


fs.readFile("./jiagouke/promise/name.txt", "utf8", function (error, data) {
    e.emit('age', data)
})
fs.readFile("./jiagouke/promise/age.txt", "utf8", function (error, data) {
    e.emit('name', data)
})