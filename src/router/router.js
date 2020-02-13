import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Confessionwall from '@/views/confessionWall.vue'
import RichText from '@/views/richText.vue'
import PostDetail from '@/views/postDetail.vue'
import UserDetail from '@/views/userDetail.vue'
import Follower  from '../components/follower'
import Followee from '../components/followee'
Vue.use(VueRouter)
export default new VueRouter({
    mode: 'history',
    routes: [
        {path:'/login', name: 'hello',component: Login },
        {path:'/home',name:'home', component: Home },
        {path:'/',redirect:'login'},
        {path:'/confessionWall',name:'confessionWall',component: Confessionwall},
        {path:'/richText',name:'richText',component:RichText},
        {path:'/post/:id',name:'post',component:PostDetail},  //可通过this.$route.params.id获取id的值
        {path:'/user/:userId/',name:'user',component:UserDetail,
            children:[
                {path:'follower',component:Follower},
                {path:'followee',component:Followee},
            ]
        },
    ]
})