<template>
<div>
    <el-input placeholder="请输入账号/手机号" v-model="userId" validate-event minlength="11" maxlength="11" show-word-limit></el-input>
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
            if(this.userId==''){
                this.$message({
                showClose: true,
                message: '账号不能为空',
                type: 'error'
                });
                return ;
            }
            if(this.password==''){
                this.$message({
                showClose: true,
                message: '密码不能为空',
                type: 'error'
                });
                return ;
            }
            this.$api.signin({
                username:this.userId,
                password:this.password
            }).then((res)=>{
                this.$store.commit('storeIdAndNumberAndAvatar',{
                    userId:res.data.userId,
                    userNumber:res.data.userNumber,
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
        background-color:#fff;
    }
</style>