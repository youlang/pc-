import VueRouter from "vue-router"
import Vue from 'vue'
Vue.use(VueRouter);
const router = new VueRouter({
    // mode:'history',
    routes: [
        {
            // 登录
            path: '/login',
            name: 'login',
            meta: {
                navbarOption: "登录",
            },
            component: (resolve) => require(['@/pages/multiple/login'], resolve)
        },
        {
            // 登录
            path: '/home',
            name: 'home',
            meta: {
                navbarOption: "主页",
            },
            redirect: '/index',
            component: (resolve) => require(['@/pages/multiple/home'], resolve),
            children: [
                {

                    // 首页
                    path: '/index',
                    name: 'index',
                    meta: {
                        navbarOption: "首页",
                    },
                    component: (resolve) => require(['@/pages/multiple/home/content/index'], resolve),
                }
            ]
        }
    ]
});
export default router