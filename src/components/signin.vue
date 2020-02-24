<template>
<div>
    <el-input placeholder="请输入账号/手机号" v-model="userId" ></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
    <button  class="signin-button" v-on:click="signin">登录</button>
</div>
</template>
<script>
export default {
    name:'signin',
    data(){
        return{
            userId:'',
            password:''
        }
    },
    methods:{
        signin(){
            this.$api.signin({
                username:this.userId,
                password:this.password
            }).then((res)=>{
                this.$store.commit('storeNameAndAvatar',{
                    userId:res.data.userId,
                    username:res.data.username,
                    avatar:res.data.avatar
                })
                this.$router.push('/home')
            })
        },
    }
}
</script>
<style scoped>
    .signin-button{
        width: 100px;
        margin-top: 30px;
        height: 36px;
        margin-left: 150px;
        background-color: #0084ff
    }
</style>