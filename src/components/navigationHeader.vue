<template>
    <div class="navigationHeader">
            <el-row :gutter="3" class="el-row">
            <el-col :span="4" :offset="3" class="el-col">
                <router-link :to="'/home'"><img :src="logo" style="width:98px;height:38px"></router-link>
            </el-col>
            <el-col :span="2" class="el-col">
                <router-link :to="'/home'">首页</router-link>
            </el-col>
            <el-col :span="2" class="el-col">
                <router-link :to="'/confessionWall'">公告墙</router-link>
            </el-col>
            <el-col :span="4" class="el-col">
                <!-- <div class="block"> -->
                    <!--用户的输入自动作为形参传到searchKeyword-->
                    <el-input v-model="keyword" placeholder="请输入关键词" style="width:150px;"></el-input>
                    <el-button type="primary" @click="sendKeywordToSearch" icon="el-icon-search" style="width:30px"></el-button>
                <!-- </div> -->
            </el-col>
            <el-col :span="2" class="el-col">
                <div ><img :src="notificationFilledImage" style="width:25px;height:25px"></div>
            </el-col>
            <el-col :span="2" class="el-col">
                <div @click="showMessage"><img :src="messageImage" style="width:25px;height:25px"></div>
            </el-col>
            <el-col :span="2" class="el-col">
                <div>
                    <img :src="avatar|addImagePrefix" v-if="avatar" @click="showUserDropDownList()" style="width:30px;height:30px;border-radius:50%">
                    <div v-else>
                        <router-link :to="'/login'"><span>登录 注册</span></router-link>
                    </div>
                </div>
                <ul v-if="isShowUserDropDownList" class="user-drop-down-list">
                    <router-link :to="'/user/'+userId+'/active'"><li>我的主页</li></router-link>
                    <router-link :to="'/postEditor'"><li>发帖子</li></router-link>
                    <router-link :to="'/login'"><li>登录</li></router-link>
                    <li @click="signout">登出</li>
                </ul>
                <div v-if="allMessageList!=''" class="chat">
                    <el-dialog :visible.sync="dialogVisible" width="40%">
                        <chatBox :oppositeUser="oppositeUser" :privateMessageList="privateMessageList"></chatBox>
                    </el-dialog>
                </div>
                <div v-if="isShowMessage">
                    <div  class="privateMessageBar">
                        <span class="arrow"></span>
                        <div style="text-align:center">我的私信</div>
                        <div v-for="(item,key) in allMessageList" :key="key" class="privateMessageList">
                            <div @click="showChatBox(key)">
                                <img :src="item.oppositeUser.avatar|addImagePrefix" style="width:30px;height:30px"/>
                                <span class="username">{{item.oppositeUser.username}}</span>
                                <span>:</span>
                                <span class="content">{{item.privateMessageList[item.privateMessageList.length-1].content}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="2" class="el-col">
                <span>当前在线人数:{{currentOnlineUserNumber}}</span>
            </el-col>
            </el-row>
    </div>
</template>
<script>
import ChatBox from '../components/chatBox'
export default {
    name:'navigationHeader',
    data(){
        return{
            isShowMessage:false,
            avatar:this.$store.state.avatar,
            isShowUserDropDownList:false,
            userId:this.$store.state.userId,
            messageImage:require('../assets/message.png'),
            notificationFilledImage:require('../assets/notificationFilled.png'),
            logo:require('../assets/logo.png'),
            allMessageList:[],
            dialogVisible: false,
            oppositeUser:{},
            privateMessageList:[],
            keyword:'',
            currentOnlineUserNumber:Int16Array
        }
    },
    mounted(){
        this.getOnlineUser()
    },
    components:{
        'chatBox':ChatBox
    },
    methods:{
        showUserDropDownList(){
            this.isShowUserDropDownList=!this.isShowUserDropDownList
        },
        showMessage(){
            this.isShowMessage=!this.isShowMessage
            this.getAllPrivateMessage()
        },
        signout(){
            this.$api.signout({
                userId:this.$store.state.userId
            })
        },
        getAllPrivateMessage(){
            this.$api.getAllPrivateMessage({
                userId:this.$store.state.userId
            }).then((res)=>{
                this.allMessageList=res.data.data
                window.console.log(res.data.data)
                window.console.log(this.allMessageList.length-1)
            })
        },
        showChatBox(key){
            this.dialogVisible=true,
            this.privateMessageList=this.allMessageList[key].privateMessageList,
            this.oppositeUser=this.allMessageList[key].oppositeUser,
            window.console.log(key)
            window.console.log(this.oppositeUser)
            window.console.log(this.privateMessageList)
        },
        savePrivateMessage(){
            this.$api.savePrivateMessage({
                senderId:this.$store.state.userId,
                receiverId:this.oppositeUser.userId,
                content:this.content
            }).then(()=>{
                this.$message({
                showClose: true,
                message: '发送成功',
                type: 'success'
                });
                this.$router.go(0)
            })
        },
        sendKeywordToSearch(){
            this.$emit("search",this.keyword)
            window.console.log(this.$route.path)
            if(!(this.$route.path=="/search")){
                window.console.log("aaa")
                this.$router.push({ name: 'search', params:{keyword:this.keyword}})
            }
        },
        getOnlineUser(){
            this.$api.getOnlineUser().then((res)=>{
                window.console.log(res.data.data)
                this.currentOnlineUserNumber=res.data.data
            })
        }
    }
}
</script>
<style scoped>
 .navigationHeader{
     background-color: #fff;
     height: 60px;
 }
 .el-row{
    border-bottom:1px solid #f1f1f1;
    height:60px;
    /* text-align:center; */
 }
 .el-col{
     height:60px;
     text-align: center;
     padding-top:10px;
     padding-bottom: 10px;
 }
 .user-drop-down-list{
    width: 80px;
    z-index: 100;
    position: absolute;
    background-color: #fff;
    border: 1px solid #ebebeb;
    border-radius: 4px;
 }
 .privateMessageBar{
    background: #fff;
    border: 1px solid #ebebeb;
    border-radius: 4px;
    margin-top:20px;
     position: absolute;
     z-index:20;
     /* top:10px;*/
     right:220px;
     width:360px;
     display: flex;
     flex-direction: column;
 }
 .privateMessageList{
     border-top: 1px solid #ebebeb;
 }
 .arrow{
    margin:auto; 
    width: 0;   
    height: 0;  
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid beige
 }
 .username{
     color:#1a1a1a;
     font-size: 20px;
 }
 .content{
     overflow: hidden;
 }
 .chat /deep/ .el-dialog__header{
    padding: 0px;
 }
 /* .chat /deep/ .el-dialog__body{
    padding: 0px;
} */
</style>