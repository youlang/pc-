import Vue from 'vue'
import App from './App.vue'
import router from './route/router';
import http from './http/index'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css';
let joint = {}
import local from "./utils/local";
Vue.use(local, joint);
// vuex
import store from "./vuex";
Vue.use(ViewUI);
Vue.config.productionTip = false
Vue.prototype.$model = http;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')