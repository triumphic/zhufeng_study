let Promise = require("./promise");

let promise = new Promise((resolve, reject) => {
    console.log(1);
    reject("xxx")
}).then((data) => {
    console.log('success', data);
}, (err) => {
    console.log('失败', err);
})