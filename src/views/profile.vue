<template>
<div>
    <navigationHeader></navigationHeader>
    <div class="main">
        <h1>个人资料</h1>
        <img :src="avatarShow" style="width:100px;height:100px">
        <ul>
            <li>
                <button @click="selectPicture" class="avatar-button">上传头像</button>
                <input type="file" accept=".jpg" @change="changeMultipleFiles"  value="avatar" ref="file" style="display:none">
            </li>
            <li>
                <el-radio v-model="sex" label="男">男</el-radio>
                <el-radio v-model="sex" label="女">女</el-radio>
            </li>
            <li class="item"><span>昵称:</span><input type="text" v-model="username"></li>
            <li class="item"><span>电话:</span><input type="text" v-model="phoneNumber"></li>
            <li class="item"><span>位置:</span><input type="text" v-model="location"></li>
            <li class="item"><span>介绍:</span><input type="text" v-model="introduction"></li>
            <li class="item"><span>邮箱:</span><input type="text" v-model="email"></li>
        </ul>
        <button class="button" @click="saveUserInfo">提交</button>
    </div>
</div>
</template>
<script>
import NavigationHeader from "../components/navigationHeader"
export default {
    name:"profile",
    data(){
        return{
            sex:'',
            username:'',
            phoneNumber:'',
            location:'',
            introduction:'',
            email:'',
            avatar:{},
            avatarShow:{}
        }
    },
    mounted(){
        this.getUserInfo()
    },
    methods:{
        getUserInfo(){
            this.$api.getUserInfo(this.$store.state.userId).then((res)=>{
                window.console.log(res.data.data)
                this.sex=res.data.data.sex;
                this.username=res.data.data.username;
                this.phoneNumber=res.data.data.phoneNumber;
                this.location=res.data.data.location;
                this.introduction=res.data.data.introduction;
                this.email=res.data.data.email;
                this.avatarShow="http://localhost:8090/image/"+res.data.data.avatar
            })
        },
        getFileUrl(file) {
            let url = null
            if (window.createObjectURL !== undefined) { // basic
                url = window.createObjectURL(file)
            } else if (window.URL !== undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file)
            } else if (window.webkitURL !== undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file)
            }
            return url
        },
        changeMultipleFiles(e) {
           window.console.log(e)
           this.avatar = e.target.files[0]
           this.avatarShow=this.getFileUrl(this.avatar)
            
        },
        selectPicture(){
            this.$refs.file.click();
            this.$refs.file.value = null;
       },
       saveUserInfo(){
           if(this.username==''){
                this.$message({
                showClose: true,
                message: '用户名不能为空',
                type: 'error'
                });
                return ;
            }
           const regPhoneNumber = /^1[0-9]{10}$/;
            if(this.phoneNumber==''|| !regPhoneNumber.test(this.phoneNumber)) {
                this.$message({
                showClose: true,
                message: '输入正确的手机号',
                type: 'error'
                });
                return ;
            }
            const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if(this.email==''|| !regEmail.test(this.email)) {
                this.$message({
                showClose: true,
                message: '输入正确的邮箱',
                type: 'error'
                });
                return ;
            }
          window.console.log("dddd")
          const uploadForm=new FormData();
          uploadForm.append('userId',this.$store.state.userId)
          uploadForm.append('avatarFile',this.avatar)
          uploadForm.append('sex', this.sex);
          uploadForm.append('username', this.username);
          uploadForm.append('phoneNumber',this.phoneNumber)
          uploadForm.append('location',this.location)
          uploadForm.append('email',this.email)
          uploadForm.append('introduction',this.introduction)
          this.$api.saveUserInfo(
              uploadForm
          ).then((res)=>{
              this.$message({
                showClose: true,
                message: '更新资料成功',
                type: 'success'
              });
              this.$router.go(0)
              //this.$router.push('/confessionWall')
              window.console.log(res.data)
          })
      },
    },
    components:{
        'navigationHeader':NavigationHeader
    }

}
</script>
<style scoped>
    .main{
        display: flex;
        flex-direction: column;
        width: 800px;
        padding: 50px;
        font-size: 20px;
        background-color: #ffff;
        margin: auto;
    }
    .avatar-button{
        margin: 0 0 0 auto;
        padding: 0;
        width: 55px;
        height: 26px;
        font-size: 13px;
        border-color: #6cbd45;
        color: #6cbd45;
    }
    .item{
        display: flex;
        flex-direction: row;
        width: 500px;
        text-align: center;
        align-items: center;
    }
    input{
        width: 350px;
        height:60px;
        font-size: 18px;
    }
    .button{
        margin-top: 12px;
        margin-left: 200px;
        width: 55px;
        height: 26px;
        font-size: 13px;
        border-color: #6cbd45;
        color: #6cbd45;
        margin: auto;
    }
</style>