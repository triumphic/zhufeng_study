// ES6中的模块化问题
// 什么叫模块  node中  只要是一个js文件就是一个模块
// 模块化解决的问题： 命名冲突(命名空间) 采用自执行函数的方式   解决代码的高内聚低耦合问题
// node中自带模块化功能  require module.exports commonjs规范
// cmd(seajs) amd(requirejs)
// umd 统一模块

// 常用的 3种
// node模块  commonjs规范           require  module.exports
// es6模块规范  esModule umd        import   exports
// umd 统一模块

// es6 和 node规范  在webpack环境下可以通用

// 如果通过相对路径引入  表示自定义模块
// 1) import的特点 可以变量提升 在没定义以前可以直接使用  
// 2)不能放到作用域下  只能放在顶层环境
// import { a } from './a.js'       // 从导出的对象中一个个去除 这种方式只能一个个取出来
// import * as obj from './a';     //把所有导出的内容 放到obj对象中 把导出的所有结果放到一个变量中
import obj,{a,b,c} from './module/a';      // 这个obj必须采用export default才能拿到
console.log(obj,a,b,c)

// export 导出时接口、变量
// export default 导出是一个具体的内容、具体的值
// 导入的变量不能修改