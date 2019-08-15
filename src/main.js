import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './router';
import App from './app.vue';
import Echarts from 'echarts'
import axios from 'axios'
import store from './store/store.js'
import animated from 'animate.css'
import common from  './assets/common/common.js'
import 'babel-polyfill'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

import Blob from './excel/Blob.js'
import Export2Excel from './excel/Export2Excel.js'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// import Jquery from 'jquery'
Vue.use(VueRouter);
// Vue.use($);
Vue.prototype.$echarts = Echarts
Vue.prototype.$http = axios
// Vue.prototype.$JQ = Jquery
Vue.use(animated);
Vue.use(common);

axios.defaults.baseURL = 'http://dccuat.liby.com.cn/hanadcc/queryByPage'; 
// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    // iView.LoadingBar.start();
    // Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    // iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    store,
    render: h => h(App)
});
