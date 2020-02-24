<template>
<div>
    <el-input label="用户名" placeholder="吴彦祖/高圆圆,给自己起个拽拽的名字吧" validate-event minlength="1" v-model="username" clearable></el-input>
    <el-input placeholder="请输入手机号" v-model="phoneNumber" validate-event minlength="11" maxlength="11" show-word-limit></el-input>
    <el-input placeholder="请输入密码,长度在10～18之间" v-model="password" validate-event minlength="10" maxlength="18" show-password></el-input>
    <el-input placeholder="确认密码" v-model="passwordCheck" validate-event minlength="10" maxlength="18" show-password></el-input>
    <button   v-on:click="signup" class="signup-button">注册</button>
</div>
</template>
<script>
export default {
    name:"signup",
    data(){
        return{
            username:'',
            phoneNumber:'',
            password:'',
            passwordCheck:''
        }
    },
    methods:{
        signup(){
            if(this.passwordCheck!=this.password){
                this.$message({
                showClose: true,
                message: '两次密码不一致',
                type: 'error'
                });
            }
            this.$api.signup({
                username:this.username,
                userId:this.phoneNumber,
                password:this.password,
                phoneNumber:this.phoneNumber
            }).then(()=>{
                this.$router.push(`home`)
            })
        }
    }
}
</script>
<style>
 .signup-button{
    width: 100px;
    margin-top: 30px;
    height: 36px;
    margin-left: 150px;
    background-color: #0084ff
}
</style>