伟哥面试题总结

用友2020.06.04

1.笔试题 vue自定义组件直接用@click不行，为啥？怎么解决？多维数组排序扁平化、去重、排序？多行文字单行局左单行居右？

2.获取当前页面所有元素的标签种类

3.js动画，requestAnimation 作用，用法，优点

4.dom操作获取宽度

5.vue.use原理

6.类似element的this.$Modal. info(option)怎么实现的

新奥集团2020.06.05

1.取消请求？我说 axios的cancancel  他说rx有完整方案
2.有一个场景：可以做到任意一个个元素点击拖拽跟随鼠标，代码及思路。我说用mixin和extend，他问优点缺陷? mixin和引用组件定义方法重复的话会怎样？他说hook其实是最好的解决方案 让我说具体作用写法
3. js基础原型链 闭包 继承(有几种方式，优劣）eventloop call apply等等
4.es6各种语法作用
5.css模块化怎么做
6.css水平垂直句中的多种方式 
7.flex与grid的区别优劣
8.css模块化怎么做
9.http缓存相关
10.递归求一个数组最大值
11.链表跟数组定义，链表的优势
12.各种图表库的选型及使用场景
13.webpack基本用法;从头用webpack搭建一个项目你需要做那些事情？（思路要清晰从头到尾的细节列出来）什么时候用cli什么时候自己搭建，两种的优劣
14.移动端的性能优化
15.职业规划



神策2020.06.09
一面 技术：
1.两道手写题 20分钟以内
1）一个原生html表格，表头分别为日期（如：2020年1月2日）和数量，都为乱序，要求实现点击日期表头按照日期倒序或者正序排列
 以下表格，点击 `#data .date` 后使表格按日期排序，当前是正序则改为倒序，当前是倒序则改为正序。
<table id="data">
    <thead>
        <tr>
            <th class="date">日期</th>
            <th class="total">总次数</th>
        </tr>
    </thead>
    <tbody id='body'>
        <tr>
            <td>2017年10月23日</td>
            <td>68,112</td>
        </tr>
        <tr>
            <td>2017年8月6日</td>
            <td>68,020</td>
        </tr>
        <tr>
            <td>2017年11月11日</td>
            <td>69,433</td>
        </tr>
        <tr>
            <td >2016年5月12日</td>
            <td>69,699</td>
        </tr>
        <tr>
            <td>2017年1月18日</td>
            <td>42,565</td>
        </tr>
    </tbody>
</table>
2）实现一个函数
/**
 * @param {number} n 乘积
 * @return {Array} 拆解后的乘数
 */

function calc(n){}
console.log(calc(7));
// [7]
console.log(calc(8));
// [2, 2, 2]
console.log(calc(24));
// [2, 2, 2, 3]
console.log(calc(30));
// [2, 3, 5］

3.自我介绍 我从业务方向和技术方向分别做了介绍
4.水平垂直居中的方式? flex的属性有哪些 flex: 1对应的是哪些写法的集合
5.流程图编辑器的实现
6.vue通信方式 
7.es6用过哪些？出了一道promise 的题目
8.event相关的介绍及题目
9. vue mvvm实现思路
10. vue的生命周期及每个周期对应哪些钩子函数及作用
11.vue相对于react的区别
12.react的setState是同步还是异步的？ 怎么实现的？
13.react hook的基本语法、优势
二面 技术leader：
1.两个tab页，a、b分别有同一个实例播放器，点击a页面播放按钮，再去点b页面播放按钮 你会怎么设计？两个tab页怎么通信
2.一个按钮每次点击自增1但是需要跟服务器交互成功后按钮上的数值才加1，你会怎么实现？
3.封装一个组件思想思路，如日期组件？
4.从头搞一个项目，你如果作为主导者你会怎么做？
5.你擅长vue但是react并不擅长，你怎么胜任我们的工作？
6.职业规划

三面 技术总监：
总共一小时，各30分钟分别问对方三个问题
他
1.离职原因，针对你所述分别又提问。
2.职业规划，针对你所述分别又提问。比如我说的一点--技术成长路线，他就我说的给了看法指导建议。
3.三年前的你期望现在的你是什么样的，是否达到预期，现在的你又期望三年后的你能成为什么样的人？

四面  CTO：
1.自我介绍 
2.工作当中的提升
3.工作中的难点
4.离职原因
5.技术很业务的关系
6.有什么要问他的

东方国信2020.06.09
1.10道左右笔试题
1)水平垂直居中方式
2)link和@import的区别
3)标准盒模型和ie怪异盒模型区别
4)scss less是什么？它俩的区别
5)变量提升的题目 输出啥
6)promise settimeout相关的输出顺序
7)循环引用的一个赋值问题，会输出错误吗 报错信息是什么
8)vue生命周期
9)手写深拷贝（考虑new date 正则 函数 symbol 以及怎么避免循环引用）
10)实现一个函数接受一个url为参数，返回一个object，内容为window.location的所有属性方法
11)求和add(1, 2) 函数怎么变为add(1)(2)

2.根据以上题目面试官做了一些扩展(实现一个三角形、bfc介绍、flex的一些属性及作用、css3常用哪些、插入排序算法、es6哪些语法、7和8哪些语法、js数据类型）
3.mvvm mvc的基本思想 以及实现思路
4.业务及选型原因
5.webpack的优化做过哪些
6.性能优化做过哪些？http的缓存介绍
7.跨域的解决方案
8. 从浏览器输入url到页面渲染经历了哪些过程？浏览器的渲染过程
9.ts的基本语法介绍
10.ssr怎么实现
11.几种图表库的选型d3 g6 echarts等等
12.封装组件库需要从哪些方面考虑
13.node有了解吗？都做过什么？express和koa的一些简单介绍
14.职业规划
15.带队经验都需要做哪些事情（因为我写了小团队带队经验）

