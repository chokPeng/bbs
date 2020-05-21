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
import filters from './filter/filter.js'
// import hljs from 'highlight.js'
import {ImageDrop} from 'quill-image-drop-module'
import Quill from 'quill'
import ImageResize from 'quill-image-resize-module'
import 'swiper/dist/css/swiper.css'
//import Cookies from 'js-cookie';
//（如果使用的是2.6.0以上的版本需要自己手动去加载css）
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import {setCookie,getCookie,delCookie} from './api/cookie.js'
// Vue.prototype.$cookieStore = {setCookie,getCookie,delCookie}
Vue.use(VueAwesomeSwiper)
//Vue.use(Cookies)
//Object.defineProperty(Vue.prototype, "$Cookies", { value: Cookies })
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
for (let key in filters) {
    Vue.filter(key, filters[key]);
}
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