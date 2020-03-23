import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Square from '@/views/square.vue'
import PostEditor from '@/views/postEditor.vue'
import PostDetail from '@/views/postDetail.vue'
import UserDetail from '@/views/userDetail.vue'
import Follower  from '../components/follower'
import Followee from '../components/followee'
import Active from '../components/active'
import Profile from '../views/profile.vue'
import Signup from '../components/signup.vue'
import Signin from '../components/signin.vue'
import Search from '../views/search'
import Collection from '../components/collection.vue'
import SquareDetail from '../views/squareDetail.vue'
Vue.use(VueRouter)
export default new VueRouter({
    routes:[
        {path:'/login', name: 'hello',component:Login,
            children:[
                {path:'signin',component:Signin},
                {path:'signup',component:Signup}
            ]
        },
        {path:'/home',name:'home', component: Home },
        {path:'/',redirect:'login'},
        {path:'/square',name:'square',component: Square},
        {path:'/square/:id',name:'squareDetail',component: SquareDetail},
        {path:'/postEditor',name:'postEditor',component:PostEditor},
        {path:'/post/:id',name:'post',component:PostDetail},  //可通过this.$route.params.id获取id的值
        {path:'/user/:userId/',name:'user',component:UserDetail,
            children:[
                {path:'follower',component:Follower},
                {path:'followee',component:Followee},
                {path:'active',component:Active},
                {path:'collection',component:Collection}
            ]
        },
        {path:'/profile',name:'profile',component:Profile},
        {path:'/search',name:'search',component:Search}
    ]
})