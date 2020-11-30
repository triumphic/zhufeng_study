let a = 1;       //表示我要把a引出
let b = 2;       //表示我要把b引出
let c = 3;       //表示我要把c引出

export {
    a,
    b,
    c
}

// 默认导出 直接导出某个变量，外层引入的时候 可以直接获取到
// export default { a:1, b:2, c:3 }
let obj = {a:1, b:2};
export {
    obj as default  // 使用as重命名为default 后 等价于export default
}

