<template>
    <div class="user-info-box">
       <router-link target="_blank" :to="'/user/'+user.userId">
            <img :src="user.avatar|addImagePrefix" style="width:45px; height:45px; border-radius:50%; margin-right:10px;">
       </router-link>
        <div class="information">
            <router-link target="_blank" :to="'/user/'+user.userId"><span>{{user.username}}</span></router-link>
            <div class="introduction"><span>{{user.introduction}}</span></div>
        </div>
        <div v-if="!isLoginUser" class="follow-action">
            <button @click="unfollow" v-if="user.isFollow" class="button">已关注</button>
            <button @click="follow" v-else class="button">关注</button>
        </div>
    </div>
</template>
<script>
export default {
    name:'userInfoBox',
    data(){
        return{
            isShowUserInfoWall:false,
            isLoginUser:false,
        }
    },
    props:{
        user:Object
    },
    mounted(){
        this.judgeIsLoginUser(this.$store.state.userId)
        // window.console.log(this.user.avatar)
        // this.user.avatar="http://localhost:8090/image/"+this.user.avatar
    },
    methods:{
        judgeIsLoginUser(loginUserId){
            if(loginUserId==this.user.userId){
                this.isLoginUser=true
            }
        },
        showUserInfoWall(){
            if(this.isShowUserInfoWall==true){
                this.isShowUserInfoWall=false
                window.console.log("true到false")
            }else{
                this.isShowUserInfoWall=true
                window.console.log("false到true")
            }
            
        },
        follow(){
            this.$api.follow({
                followerId:this.$store.state.userId,
                followeeId:this.user.userId
            }).then(()=>{
                this.$message({
                    showClose: true,
                    message: '关注成功',
                    type: 'success'
                });
                this.user.isFollow=true;
            })
        },
        unfollow(){
            this.$api.unfollow({
                followerId:this.$store.state.userId,
                followeeId:this.user.userId
            }).then(()=>{
                this.$message({
                    showClose: true,
                    message: '取消关注成功',
                    type: 'success'
                });
            })
        }
        // judgeFollow(){
        //     if(this.judge(this.user.userId)){
        //         window.console.log("judge:"+this.judge(this.user.userId))
        //         this.$set(this.user,'isFollow',true)
        //     }else{
        //         this.$set(this.user,'isFollow',false)
        //     }
        // },
        // judge(userId){
        //     return this.$store.state.some(id=>{
        //         userId==id
        //     })
        // },
        // showUser(){
        //     window.console.log(this.user.isFollow)
        // }
    },
}
</script>
<style >
.user-info-box{
    display: flex;
    background: #fff;
    /* border-bottom: 1px solid #f1f1f1; */
    padding: 1rem 2rem 0rem 1rem;
    position: relative;
}
.button{
    margin: 0 0 0 auto;
    padding: 0;
    width: 150px;
    height: 26px;
    font-size: 13px;
    border-color: #6cbd45;
    color: #6cbd45;
}
.information{
    vertical-align: middle;
    height: 50px;
}
.follow-action{
    position: absolute;
    right: 20px;
}
.username{
    text-decoration:none;
    font: 16px bold;
}
.introduction{
    color: #8a9aa9;
    font-size: 13px;
}
</style>