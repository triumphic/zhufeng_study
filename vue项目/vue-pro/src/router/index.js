import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 像前端的读写文件  路径   读取的子目录
require.context('./', false, /\.router.js$/);
// 入口文件


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
