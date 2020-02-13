<template>
<div>
    <el-input placeholder="请输入账号" v-model="username" ></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
    <button  class="button-submit" v-on:click="login">提交</button>
</div>
</template>
<script>
export default{
    data(){
        return{
            username: 'caidapao',
            password: 'user',
        } 
    },
    methods: {
        succeed(message) {
            this.$message({
                showClose: true,
                message,
                type: 'success'
            });
        },
        failed(message) {
            this.$message({
                showClose: true,
                message,
                type: 'error'
            });
        },
        login(){
            let param = new URLSearchParams()
            param.append('username',this.username)
            param.append('password',this.password)
            this.$api.postFormData('/login',param).then((res)=>{
                this.$store.commit('storeNameAndAvatar',{
                    userId:res.data.userId,
                    avatar:res.data.avatar
                })
                this.$router.push('/home')
            })
        },
    }
}
</script>
<style scoped>
.el-input{
    width: 200px; 
    display: flex;  
    margin: 0 auto;
}
.button-submit{
    display: flex;  /*button要使用desplay：flex； margin：0 auto居中*/
    margin: 0 auto;
}
</style>