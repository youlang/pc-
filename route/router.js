import VueRouter from "vue-router"
import Vue from 'vue'
import store from '../vuex'
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
            path: '*',
            redirect: '/login',
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
                },
                {

                    // 首页
                    path: '/menu-list',
                    name: 'menu-list',
                    meta: {
                        navbarOption: "菜单权限",
                    },
                    component: (resolve) => require(['@/pages/multiple/home/menu/index'], resolve),
                }
            ]
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.path != '/login' && (!store.state.common.appToken || !(store.state.common.userInfo || {}).userid)) {
        next('/login')
    } else {
        next()
    }
    // next()
})
export default router