import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js' // router名字不能用VueRouter，否路由不起作用
import elementUI from  'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import store from './vuex/store'
import { format } from 'timeago.js';
//定义全局的过滤器 "changeTime":改变时间为几周前
Vue.filter('changeTime', function(dateStr) {
    return format(dateStr, 'zh_CN');
})
Vue.use(VueQuillEditor)
Vue.use(elementUI)
Vue.config.productionTip = false
import api from '@/api';
Vue.prototype.$api=api;
axios.defaults.withCredentials=true
new Vue({
    router,
    store,
    axios,
    render: h => h(App),
}).$mount('#app')