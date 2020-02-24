<template>
<div class="active-container">
    <div class="active-main">
        <span>动态</span>
            <div class="active-pin" v-for="(item,key) in confessionWallList" :key="key">
                <div class="user-action">
                    <span class="action-content">{{item.action}}</span>
                    <span class="action-time">{{item.time|changeTime}}</span>
                </div>
                <userInfoBox :user="item.content.poster"></userInfoBox>
                    <router-link :to="`/post/`+item.content.id">
                        <div class="post-header">
                            <span class="topic">{{item.content.topic}}</span>
                            <span class="title">{{item.content.title}}</span>
                        </div>
                        <div class="content" v-html="item.content.content">
                            <!-- {{item.content.content}} -->
                        </div>
                    </router-link>
                    <div class="post-action">
                        <div class="like-action" @click="like(key)">
                            <img :src="likeFilledImg" v-if="item.isLike" style="width:25px;height:25px"> 
                            <img :src="likeImg" v-else style="width:25px;height:25px">
                            <span>{{item.like}}</span>
                        </div>
                        <div class="comment-action" @click="showComment(key)">
                            <img :src="commentFilledImg" v-if="item.isShowComment" style="width:25px;height:25px"> 
                            <img :src="commentImg" v-else style="width:25px;height:25px">
                            <!-- <span>{{item.comments.length}}</span> -->
                        </div>
                    </div>
                <div  class="comment" v-if="item.isShowComment">
                    <comment :commentList="item.content.comment">ddd</comment>
                </div>
                
            </div>
    </div>
</div>
</template>
<script>
import UserInfoBox from '../components/userInfo/userInfoBox'
import Comment from '../components/comment'
export default {
    name: 'confessionWall',
    data (){
        return{
            likeFilledImg:require('../assets/goodFilled.png'),
            likeImg:require('../assets/good.png'),
            commentImg:require('../assets/comment.png'),
            commentFilledImg:require('../assets/commentFilled.png'),
            confessionWallList:[],
            userId:''
        }
    },
    mounted(){
        this.userId=this.$route.params.userId
        this.getActive()
    },
    methods:{
        like(key){
            //取消赞
            if(this.confessionWallList[key].isLike){
               this.$set(this.confessionWallList[key],'isLike',false)   //往confessionWallList里添加一个属性isLike，js可以随意往对象中添加数据

            }else{  // 点赞
               this.$set(this.confessionWallList[key],'isLike',true)
               window.console.log("hhh")
               window.console.log(this.confessionWallList[key].id)
                this.$api.addLike({
                    id:this.confessionWallList[key].id,
                    userId:this.$store.state.userId
                })
            }
        },
        showComment(key){
            //取消展示评论
            if(this.confessionWallList[key].isShowComment){
                
                this.$set(this.confessionWallList[key],'isShowComment',false)
            }else{  // 显示评论
                this.$set(this.confessionWallList[key],'isShowComment',true)
            }
        },
        getActive(){
            this.$api.getActive(this.userId).then((res)=>{
                this.confessionWallList=res.data.data
                window.console.log(this.confessionWallList)
            })
        }
    },
    components:{
        'userInfoBox':UserInfoBox,
        'comment':Comment,
    }
}
</script>
<style scoped>
    .active-container{
        height:100%;
    }
    .active-main{
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: auto;
        height: 100%;
    }
    .active-pin{
        margin-bottom: 8px;
        background-color: #ffff;
    }
    .user-action{
        font-size: 15px;
        border-bottom: 1px solid #ebebeb;
        color: #8a9aa9;
        position: relative;
        height: 20px;
    }
    .action-content{
        left: 8px;
        position:absolute;
        
    }
    .action-time{
        right: 8px;
        position:absolute;
    }
    .post-header{
        width: 100%;
    }
    .title{
        font-size: 15px;
        color: black;
        display: inline;
    }
    .topic{
        left: 8px;
        margin-right: 10px;
        padding: 3px 6px;
        display: inline-block;
        font-size: 13px;
        font-weight: 500;
        color: #007fff;
        background-color: #e5f2ff;
        border-radius: 2px;
    }
    .content{
        max-height: 100px;
        overflow: hidden;
        font-size: 10px;
        margin-left: 30px;
    }
    .post-action{
        display: flex;
        position: relative;
        height: 34px;
        width: 100%;
        border: 1px solid #ebebeb;
    }
    .like-action{
        height: 100%;
        font-size: 25px;
        cursor: pointer;
        width: 50%;
    }
    .comment-action{
        margin-left: 125px;
        height: 100%;
        font-size: 25px;
        cursor: pointer;
        width:50%;
    }
    .comment{
        margin-left: 25px;
        /* width:200px; */
    }
</style>
