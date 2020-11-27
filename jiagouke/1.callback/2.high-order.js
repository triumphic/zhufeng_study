// 对某些函数进行扩展  面向切片编程

function say(who){
    console.log('say', who);
}

Function.prototype.before = function(callback) {
    // 箭头函数中没有this 没有arguments
    console.log(this);  //this指向 say

    //args 就是当前参数的一个数组 ['我']
    return (...args)=>{    // 箭头函数中没有this指向，会向上级作用域查找
        callback();
        // 展开运算符 可以将数组展开依次传入
        this(...args);
    }
}
let newSay = say.before(function() {
    console.log('刷牙');
})

newSay('我');