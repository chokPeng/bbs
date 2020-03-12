<template>
<div>
    <navigationHeader></navigationHeader>
    <div class="main-container" v-if="JSON.stringify(post)!='{}'">
        <div class="article-suspended-panel">
            <div @click="like">
                <img :src="likeImg" style="width:50px;height:50px;"><span>{{likeNum}}</span>
            </div>
            <div><img :src="commentImg" style="width:50px;height:50px;"><span v-if="post.comment.length!=0">{{post.comment.length}}</span></div>
            <div @click="saveCollection"><img :src="collectImg" style="width:50px;height:50px;"></div>
        </div>
        <div class="main-area">
            <div class="header">
                <userInfoBox :user="post.poster"></userInfoBox>
                <div v-if="post.poster.userId==$store.state.userId">
                    <button @click="deletePost" class="delete-button">删除</button>
                </div>
            </div>
            <div class="post-title">
                <span>{{post.title}}</span>
                <span>{{post.readingTime}}</span>
            </div>
            <div v-html="post.content"></div>
            <div class="bottom">
                <span class="postingTime">{{post.postingTime|changeTime}}</span>
                <span class="readingTimes">阅读{{post.readingTimes}}</span>
            </div>
            <div class="comment-title">评论</div>
            <div class="comment-input-box">
                <img :src="$store.state.avatar|addImagePrefix" style="width:50px;height:50px;border-radius:50%;">
                <input class="input" v-model="commentInput" placeholder="输入评论......">
                <button @click="submitComment" class="button">评论</button>
            </div>
            <comment :commentList="post.comment"></comment>
        </div>
        
    </div>
</div>
</template>
<script>
import NavigationHeader from '../components/navigationHeader'
import UserInfoBox from '../components/userInfo/userInfoBox'
import Comment from '../components/comment'
export default {
    name:'post',
    data(){
        return{
            post:{},
            likeImg: require('../assets/like.png'),
            commentImg: require('../assets/comment.png'),
            collectImg: require('../assets/collect.png'),
            likeNum:0,
            isLike:false,
            commentNum:1,
            input:'',
            commentInput:'',
            commentReplyInput:'',
        }
    },
    mounted(){
        this.id=this.$route.params.id
        this.getPost(this.id)
        this.getPostLike(this.id)
        
    },
    components:{
        'userInfoBox':UserInfoBox,
        'comment':Comment,
        'navigationHeader':NavigationHeader,
    },
    methods:{
        isUserLike(){
            this.$api.isUserLike({
                userNumber:this.$store.state.userNumber,
                id:this.post.id
            }).then((res)=>{
                window.console.log(res.data.data)
                //返回结果为1,证明用户已经点过赞了
                if(res.data.data==1){
                    this.isLike=true
                    this.likeImg=require('../assets/likeFilled.png')
                }
            })
        },
        //判断是否已经被收藏
        isCollected(){
            for(let i=0,length=this.$store.state.collectionList.length;i<length;i++){
                if(this.post.id==this.$store.state.collectionList[i]){
                    window.console.log("ssssssaaaa")
                    this.collectImg=require('../assets/collectFilled.png')
                    break;
                }
            }
            
        },
        deletePost(){
            this.$api.deletePost({
                postId:this.post.id
            }).then((res)=>{
                window.console.log(res.data.data)
                if(res.data.code==1){
                    this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    });
                    this.$router.push(`/home`)
                }
            })
        },
        getPostLike(postId){
            this.$api.getPostLike({
                postId:postId
            }).then((res)=>{
                window.console.log(res.data.data)
                this.likeNum=res.data.data
            })
        },
         showReply(key){
            if(this.post.comment[key].isReply){
                this.$set(this.post.comment[key],'isReply',false)
                window.console.log(this.post.comment[key].isReply)
            }
           else{
                this.$set(this.post.comment[key],'isReply',true)
            }
            
        },
        submitPostCommentReply(commentId,commenterId){
            this.$api.savePostCommentReply({
                commentId:commentId,
                commenterId:commenterId,
                replierId:this.$store.state.userId,
                content:this.commentReplyInput,   
            })
        },
        /*以上为comment.vue 的方法*/
        getPost(id){
                this.$api.getPost(id).then((res)=>{
                    window.console.log(res.data.data)
                    this.post=res.data.data
                    this.isUserLike()
                    this.isCollected()
            })
        },
        like(){
            if(this.isLike==false){
                this.likeImg=require('../assets/likeFilled.png')
                this.$api.savePostLike({
                    userId:this.$store.state.userId,
                    userNumber:this.$store.state.userNumber,
                    postId:this.post.id
                }).then((res)=>{
                    window.console.log(res.data.data)
                })
                this.likeNum++;
            }else{
                this.likeImg=require('../assets/like.png')
                this.$api.deletePostLike({
                    postId:this.post.id,
                    userId:this.$store.state.userId,
                    userNumber:this.$store.state.userNumber
                }).then((res)=>{
                    window.console.log(res.data.data)
                })
                this.likeNum--;
            }
            this.isLike=!this.isLike;
        },
        submitComment(){
            this.$api.savePostComment({
                postId:this.post.id,
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
        },
        saveCollection(){
            if(!this.isCollect==true){
                this.$api.saveCollection({
                    postId:this.post.id,
                    collectorId:this.$store.state.userId
                }).then(()=>{
                    this.collectImg=require('../assets/collectFilled.png'),
                    this.$message({
                        showClose: true,
                        message: '收藏成功',
                        type: 'success'
                    })
                })
            }else{
                this.$api.deleteCollection({
                    postId:this.post.id,
                    collectorId:this.$store.state.userId
                }).then(()=>{
                    this.collectImg=require('../assets/collect.png'),
                    this.$message({
                        showClose: true,
                        message: '取消收藏成功',
                        type: 'success'
                    })
                })
            }
        }
    }
}
</script>
<style scoped>
    .main-container{
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        border:1px solid cornsilk;
        width: 960px;
        background: #fff;
    }
    .main-area{
        width: 700px;
        padding: 20px;
    }
    .header{
        display: flex;
        flex-direction: row;
        position: relative;
    }
    .post-title{
        color:  black;
        font-size: 20px;
        text-align: center;
        padding: 10px;
    }
    .comment-input-box{
        display: flex;
        flex-direction: row;
        padding: 40px;
        align-items: center;
    }
    .article-suspended-panel{
        display: flex;
        flex-direction: column;
        position: fixed;
        margin-left: -7rem;
        top: 16rem;
    }
    .bottom{
        position: relative;
        font-size: 1px;
        color: #909090;
    }
    .postingTime{
        position: absolute;
        left: 10px;
    }
    .readingTimes{
        position: absolute;
        right:  10px;
    }
    .input{
        margin-left: 10px;
        padding-left: 1rem;
        border-radius: 3px;
        width: 500px;
        border: 1px solid #f1f1f1;
        height: 40px;
    }
    .button{
        width: 50px;
        background-color: greenyellow;
        margin-left: 20px;
    }
    /*以下为comment.vue 的 css*/
    .comment-title{
        color: #8a9aa9;
        font-size: 16px;
        text-align: center;
        padding: 10px;
    }
    .delete-button{
        margin: 0 0 0 auto;
        padding: 0;
        width: 80px;
        height: 26px;
        font-size: 13px;
        border-color: #6cbd45;
        color: #6cbd45;
        position: absolute;
        right:20px;
    }
</style>