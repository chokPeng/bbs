<template>
<div class="confessionWall">
    <navigationHeader></navigationHeader>
    <div class="confessionWall-main">
        <div class="navigation-bar">
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="getConfessionWall()">
                <span>全部</span>
            </el-menu-item>
            <el-menu-item index="2" @click="getConfessionWall('树洞')">
                <span>树洞</span>
            </el-menu-item>
            <el-menu-item index="3" @click="getConfessionWall('资讯')">
                <span>资讯</span>
            </el-menu-item>
            <el-menu-item index="4" @click="getConfessionWall('其他')">
                <span>其他</span>
            </el-menu-item>
            <el-menu-item index="5" @click="getConfessionWall('找对象')">
                <span>找对象</span>
            </el-menu-item>
            <el-menu-item index="6"  @click="getConfessionWall('寻物启事')">
                <span>寻物启事</span>
            </el-menu-item>
            <el-menu-item index="7" @click="getConfessionWall('失物招领')">
                <span>失物招领</span>
            </el-menu-item>
            </el-menu>
        </div>
        <div class="confessionWall-body" v-if="confessionWallList">
            <confessionWallEditor></confessionWallEditor>
            <div class="confessionWall-pin" v-for="(item,key) in confessionWallList" :key="key">
                    <userInfoBox :user="item.poster"></userInfoBox>
                    <div class="content">
                        <span>{{item.content}}</span>
                        <div  v-if="item.confessionWallImage.length!=0">
                            <swiper :imageList="item.confessionWallImage"></swiper>
                        </div>
                        <div class="ss" v-if="item.topic">
                            <span class="topic" v-if="item.topic">{{item.topic}}</span>
                        </div>
                    </div>
                    <div class="action">
                        <div class="like-action">
                            <img :src="likeFilledImg" @click="like(key)" v-if="item.isLike" style="width:25px;height:25px;cursor:pointer;"> 
                            <img :src="likeImg" @click="like(key)" v-else style="width:25px;height:25px;cursor:pointer;">
                            <span>{{item.like}}</span>
                        </div>
                        <div class="comment-action" >
                            <img :src="commentFilledImg" @click="showComment(key)" v-if="item.isShowComment" style="width:25px;height:25px;cursor:pointer;"> 
                            <img :src="commentImg" @click="showComment(key)" v-else style="width:25px;height:25px;cursor:pointer;">
                            <span class="comment-length">{{item.comments.length}}</span>
                        </div>
                    </div>
                <div  class="comment" v-if="item.isShowComment">
                    <div class="comment-input-box">
                        <img :src="$store.state.avatar|addImagePrefix" style="width:40px;height:40px;border-radius:50%;">
                        <input class="input" v-model="commentInput" placeholder="输入评论......">
                        <button @click="submitComment(item.id)" class="button">评论</button>
                    </div>
                    <comment :commentList="item.comments"></comment>
                </div>
                
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Swiper from '../components/swiper'
import UserInfoBox from '../components/userInfo/userInfoBox'
import Comment from '../components/comment'
import ConfessionWallEditor from '../components/confessionWallEditor'
import NavigationHeader from '../components/navigationHeader'
export default {
    name: 'confessionWall',
    data (){
        return{
            likeFilledImg:require('../assets/goodFilled.png'),
            likeImg:require('../assets/good.png'),
            commentImg:require('../assets/comment.png'),
            commentFilledImg:require('../assets/commentFilled.png'),
            confessionWallList:[],
            pictureIcon:require('../assets/picture.png'),
            commentInput: '',
        }
    },
    mounted(){
        this.getConfessionWall()
    },
    methods:{
        getConfessionWall(type){
            this.$api.getConfessionWall(type).then((res)=>{
                this.confessionWallList=res.data.data
            })
        },
        like(key){
            //取消赞
            if(this.confessionWallList[key].isLike){
               this.$set(this.confessionWallList[key],'isLike',false)   //往confessionWallList里添加一个属性isLike，js可以随意往对象中添加数据
                this.deleteConfessionWallLike(this.confessionWallList[key].id)
            }else{  // 点赞
               this.$set(this.confessionWallList[key],'isLike',true)
               window.console.log("hhh")
               window.console.log(this.confessionWallList[key].id)
               this.addLike(this.confessionWallList[key].id)
            }
        },
        addLike(confessionWallId){
            this.$api.saveConfessionWallLike({
                confessionWallId:confessionWallId,
                userrId:this.$store.state.userId
            }).then(()=>{
                this.$router.go(0)
            })
        },
        deleteConfessionWallLike(confessionWallId){
            this.$api.deleteConfessionWallLike({
                confessionWallId:confessionWallId,
                userId:this.$store.state.userId
            }).then(()=>{
                this.$router.go(0)
            })
        },
        showComment(key){
            //取消展示评论
            if(this.confessionWallList[key].isShowComment){
                
                this.$set(this.confessionWallList[key],'isShowComment',false)
            }else{  // 显示评论
                this.$set(this.confessionWallList[key],'isShowComment',true)
            }
            window.console.log(this.confessionWallList[key].isShowComment)
        },
        submitComment(id){
            this.$api.saveConfessionWallComment({
                confessionWallId:id,
                commenterId:this.$store.state.userId,
                content:this.commentInput
            }).then(()=>{
                this.$message({
                showClose: true,
                message: '评论成功',
                type: 'success'
              });
              this.$router.go(0)
            })
        }
    },
    components:{
        'userInfoBox':UserInfoBox,
        'comment':Comment,
        'confessionWallEditor':ConfessionWallEditor,
        'navigationHeader':NavigationHeader,
        'swiper':Swiper
    }
}
</script>
<style scoped>
    .confessionWall{
        height:100%;
    }
    .confessionWall-main{
        display: flex;
        flex-direction: column;
        width: 900px;
        margin: auto;
        height: 100%;
    }
    .navigation-bar{
        position: absolute;
        top:40%;
        left:200px;
        margin: auto;
        background-color: #ffff;
        text-align: center;
        width: 120px;
    }
    .confessionWall-body{
        padding: 10px 10rem 0 10rem;
    }
    .confessionWall-pin{
         background-color: #ffff;
         margin-bottom: 10px;
         border-radius: .2rem;
    }
    .topic{
        font-size: 13px;
        display: inline-block;
        line-height: 22px;
        height: 22px;
        padding: 0 12px;
        border: 1px solid #007fff;
        border-radius: 14px;
        /* text-align: center; */
        color: #007fff;
        user-select: none;
        
    }
    .image{
        display: flex;
        flex-direction: row
    }
    .content{
        font-size: 15px;
        margin-left: 20px;
        /* float:left; */
    }
    .action{
        display: flex;
        position: relative;
        margin-top: 1.333rem;
        height: 34px;
        border: 1px solid #ebebeb;
    }
    .like-action{
        height: 100%;
        font-size: 25px;
        flex: 1 1 33.333%;
        text-align: center;
    }
    .comment-action{
        height: 100%;
        font-size: 25px;
        flex: 1 1 33.333%;
        text-align: center;
    }
    .comment{
        margin-left: 25px;
    }
    .input{
        height: 50px;
        width: 200px;
        margin-left: 50px;
        padding-left:10px;
    }
    .comment-length{
        font-size: 5px;

    }
</style>
