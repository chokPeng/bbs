<template>
<div>
    <div  class="userInfoWall" v-if="!(JSON.stringify(this.user)==='{}')">
        <div class="text">
            <img :src="user.avatar|addImagePrefix" style="width:60px; height:60px; border-radius:50%;">
            <div class="information">
                <router-link :to="'/user/'+user.userId+'/active'">
                    <span>{{user.username}}</span>
                </router-link>
                <div class="introduction">
                    <span>{{user.introduction}}</span>
                </div>
            </div>
            <button @click="editUserInfo" v-if="this.$store.state.userId==user.userId" class="edit-button">编辑个人资料</button>
            <div v-if="$store.state.userId!=user.userId">
                <button @click="follow" v-if="!isFollow" class="button">关注</button>
                <button @click="follow" v-if="isFollow" class="button">已关注</button>
                <button @click="showChatBox" class="button">发私信</button>
            </div>
        </div>
    </div>
    <!--对话框-->
    <el-dialog :visible.sync="dialogVisible" append-to-body>
        <chatBox :oppositeUser="user"></chatBox>
    </el-dialog>
</div>
</template>
<script>
import ChatBox from '../chatBox'
export default {
    name:'userInfoWall',
    props:{
        user:Object
    },
    components:{
        'chatBox':ChatBox
    },
    data(){
        return{
            dialogVisible:false,
            isFollow:'',
            privateMessageList:[],
            userAvatar:'',//not currentUser's avatar
            content:'',
        }
    },
    mounted(){
        if(this.user.userId!=this.$store.state.userId){
            this.isFollow=this.isFollowing()
        }
    },
    methods:{
        isFollowing(){
            window.console.log("jsss")
            for(var i=0,length=this.$store.state.followingList.length;i<length;i++){
                if(this.$store.state.followingList[i].userId==this.user.userId){
                    return true
                }
            }
            return false;
        },
        follow(){
            this.$api.follow({
                followerId:this.$store.state.userId,
                followeeId:this.user.userId
            }).then((res)=>{
                this.$message({
                    showClose: true,
                    message: '关注成功',
                    type: 'success'
                });
                //更新followingList
                this.$store.commit('storeFollowingList',{
                    followingList:res.data.data
                })
                this.$router.push(0)
            })
        },
        unFollow(){
            this.$api.unFollow({
                followerId:this.$store.state.userId,
                followeeId:this.user.userId
            }).then((res)=>{
                this.$message({
                    showClose: true,
                    message: '取消关注成功',
                    type: 'success'
                });
                //更新followingList
                this.$store.commit('storeFollowingList',{
                    followingList:res.data.data
                })
                this.$router.push(0)
            })
        },
        editUserInfo(){
            this.$router.push(`/profile`)
        },
        showChatBox(){
            this.dialogVisible=true
        },
    }
}
</script>
<style scoped>
    .userInfoWall{
        display: flex;
        flex-direction: row;
        left:10%;
        background-color: #fff;
        
    }
    .text{
        display: flex;
        flex-direction: row;
        width: 700px;
        padding: 20px;
        position: relative;
    }
    .information{
        margin-left: 10px;
        vertical-align: middle;
        height: 50px;
    }
    .introduction{
        color: #8a9aa9;
        font-size:10px;
    }
    .edit-button{
        margin-top: 12px;
        margin-left: 200px;
        width: 150px;
        height: 36px;
        font-size: 13px;
        border-color: #6cbd45;
        color: #6cbd45;
        margin: 0 0 0 auto;
    }
    .follower-block{
        display: flex;
        width: 200px;
        padding-left: 2rem;
        padding-right: 2rem;
    }
    /*对话框*/
    .chat-box{
        background: #fff;
        border-radius: 2px;
        z-index: 20;
        position: absolute;
        right:50px;
        top:50px;
        width: 500px;
        border: solid 1px #8a9aa9;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px
    }
    .receiver-name{
        text-align: center;
        font-size: 30px;
    }
    .opposite{
        display: flex;
        flex-direction: row;
    }
    .login-user-site{
       display: flex;
       flex-direction: row-reverse
    }
    .time{
        color: #8a9aa9;
        font-size: 10px;
        text-align: center;
    }
    .content{
        text-align: center;
    }
    .input{
        position: relative;
        padding: 20px;
    }
    .send-button{
        color: #fff;
        background-color: #0084ff;
        position: absolute;
        right:20px;
        bottom: 1px;
    }
    .button{
        margin: 0 0 0 auto;
        padding: 0;
        width: 50px;
        height: 26px;
        font-size: 13px;
        border-color: #6cbd45;
        color: #6cbd45;
        position: absolute;
        right: 20px;
    }
</style>