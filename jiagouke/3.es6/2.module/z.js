// z文件 需要整合 x文件和y文件  这个文件作为统一的入口

// import {x} from './x';
// import {y} from './y'

// export {
//     x,
//     y
// }

// 导入立刻导出
export * from './x'     // 在文件中导出所有内容
export {y} from './y'   // 在文件中导出部分内容

console.log(y)  // 没有import 未声明（import有声明的效果） y不存在   undefined

//  默认import语法 叫静态语法 
//  动态加载     草案中提供了一个语法  import() 可以实现懒加载

let btn = document.createElement('button');
btn.addEventListener('click', async function(){
    let result = await import('./a.js');        // 动态导入a这个文件  返回的是一个promise
    console.log(result);
})
