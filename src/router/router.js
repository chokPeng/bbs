import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Confessionwall from '@/views/confessionWall.vue'
import PostEditor from '@/views/postEditor.vue'
import PostDetail from '@/views/postDetail.vue'
import UserDetail from '@/views/userDetail.vue'
import Follower  from '../components/follower'
import Followee from '../components/followee'
import Active from '../components/active'
import Edi from '../views/edi.vue'
import Profile from '../views/profile.vue'
import Signup from '../components/signup.vue'
import Signin from '../components/signin.vue'
import Search from '../views/search'
Vue.use(VueRouter)
export default new VueRouter({
    mode: 'history',
    routes:[
        {path:'/login', name: 'hello',component:Login,
            children:[
                {path:'signin',component:Signin},
                {path:'signup',component:Signup}
            ]
        },
        {path:'/home',name:'home', component: Home },
        {path:'/',redirect:'login'},
        {path:'/confessionWall',name:'confessionWall',component: Confessionwall},
        {path:'/postEditor',name:'postEditor',component:PostEditor},
        {path:'/post/:id',name:'post',component:PostDetail},  //可通过this.$route.params.id获取id的值
        {path:'/user/:userId/',name:'user',component:UserDetail,
            children:[
                {path:'follower',component:Follower},
                {path:'followee',component:Followee},
                {path:'active',component:Active}
            ]
        },
        {path:'/edi',name:'edi',component:Edi},
        {path:'/profile',name:'profile',component:Profile},
        {path:'/search',name:'search',component:Search}
    ]
})