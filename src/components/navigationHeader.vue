<template>
    <div>
        <el-header>
            <el-row :gutter="20" style="border-bottom:1px solid #f1f1f1;">
            <el-col :span="5" :offset="3">
                <div class="grid-content bg-purple"><router-link :to="'/home/'"><img src="../assets/logo.png" style="width:98px;height:23px"></router-link></div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple"><router-link :to="'/home/'">首页</router-link></div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple"><router-link :to="'/confessionWall/'">表白墙</router-link></div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple"><img src="../assets/notificationFilled.png" style="width:18px;height:20px"></div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple"><img src="../assets/message.png" style="width:18px;height:20px"></div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple">
                    <img :src=avatar v-if="avatar" @click="showUserDropDownList()" style="width:18px;height:20px;border-radius:50%">
                    <div v-else>
                        <router-link :to="'/login/'"><span>登录 注册</span></router-link>
                    </div>
                </div>
                <ul v-if="isShowUserDropDownList" class="user-drop-down-list">
                    <router-link :to="'/user/'+userId"><li>我的主页</li></router-link>
                    <router-link :to="'/richText/'"><li>发帖子</li></router-link>
                    <router-link :to="'/login'"><li>登录</li></router-link>
                    <li @click="logout">登出</li>
                </ul>
            </el-col>
            </el-row>
        </el-header>
    </div>
</template>
<script>
export default {
    name:'navigationHeader',
    data(){
        return{
            avatar:this.$store.state.avatar,
            isShowUserDropDownList:false,
            userId:this.$store.state.userId
        }
    },
    methods:{
        showUserDropDownList(){
            this.isShowUserDropDownList=!this.isShowUserDropDownList
            window.console.log(this.isShowUserDropDownList)
            window.console.log(this.avatar)
        },
        logout(){
            this.$api.logout()
        }
    }
}
</script>
<style>
 a{
    text-decoration: none;
    color:#909090;
     
 }
 a:hover{
     color: blue
 }
 ul{
     list-style: none;
 }
 .user-drop-down-list{
     width: 80px;
     z-index: 100;
     position: absolute;
 }
</style>