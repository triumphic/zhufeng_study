const fs = require('fs');

function after(times, callback) {
    let recourse = {}
    return function(key, value){
        recourse[key] = value;
        if( --times == 0 ){
            callback(recourse)
        }
    }
}
let out = after(2, function(recourse){
    console.log(recourse);
})
fs.readFile("./jiagouke/promise/name.txt", "utf8", function (error, data) {
    out('name', data)
})
fs.readFile("./jiagouke/promise/age.txt", "utf8", function (error, data) {
    out('age', data)
})