export default [
    {
        path: '/login',
        component: () => import(/*webpackchunkName:'login'*/'../views/user/login.vue')
    },
    {
        path: '/register', 
        component: () => import(/*webpackchunkName:'register'*/'../views/user/register.vue')
    },
    {
        path: '/forget', 
        component: () => import(/*webpackchunkName:'forget'*/'../views/user/forget.vue')
    }
]