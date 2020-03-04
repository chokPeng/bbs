<template>
<div>
    <navigationHeader></navigationHeader>
    <div class="main-container">
        <div class="article-suspended-panel">
            <div @click="good">
                <img :src="goodImg" style="width:50px;height:50px;"><span>{{goodNum}}</span>
            </div>
            <div><img :src="commentImg" style="width:50px;height:50px;"><span>{{commentList.length}}</span></div>
        </div>
        <div class="main-area">
            <div v-if="JSON.stringify(user)!='{}'">
                <userInfoBox :user="user"></userInfoBox>
            </div>
            <div class="post-title">{{title}}</div>
            <div v-html="content"></div>
            <div>{{postingTime|changeTime}}</div>
            <div class="comment-title">评论</div>
            <div class="comment-input-box">
                <img :src="$store.state.avatar|addImagePrefix" style="width:50px;height:50px;border-radius:50%;">
                <input class="input" v-model="commentInput" placeholder="输入评论......">
                <button @click="submitComment" class="button">评论</button>
            </div>
            <comment :commentList="commentList"></comment>
        </div>
        <div class="side-bar" v-if="user.userId==$store.state.userId">
           <button @click="deletePost" class="delete-button">删除帖子</button>
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
            user:{},
            content:'',
            id:'',
            goodImg: require('../assets/good.png'),
            commentImg: require('../assets/comment.png'),
            goodNum:Int16Array,
            isGood:false,
            commentNum:1,
            commentList:[],
            input:'',
            commentInput:'',
            postingTime:'',
            commentReplyInput:'',
            title:'',
        }
    },
    mounted(){
        window.console.log(JSON.stringify(this.user))
        this.id=this.$route.params.id
        this.getPost(this.id)
        this.getPostLike(this.id)
        this.isUserLike()
    },
    components:{
        'userInfoBox':UserInfoBox,
        'comment':Comment,
        'navigationHeader':NavigationHeader,
    },
    methods:{
        isUserLike(){
            this.$api.isUserLike({
                userId:this.$store.state.userId,
                id:this.id
            }).then((res)=>{
                window.console.log(res.data.data)
                //返回结果为1,证明用户已经点过赞了
                if(res.data.data==1){
                    this.isGood=true
                    this.goodImg=require('../assets/goodFilled.png')
                }
            })
        },
        deletePost(){
            this.$api.deletePost({
                postId:this.id
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
                this.goodNum=res.data.data
            })
        },
         showReply(key){
            if(this.commentList[key].isReply){
                this.$set(this.commentList[key],'isReply',false)
                window.console.log(this.commentList[key].isReply)
            }
           else{
                this.$set(this.commentList[key],'isReply',true)
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
                    this.title=res.data.data.title
                    this.user=res.data.data.poster
                    this.content=res.data.data.content
                    this.postingTime=res.data.data.postingTime
                    this.commentList=res.data.data.comment
                    window.console.log("neibu")
                    window.console.log(JSON.stringify(this.user)=={})
            })
        },
        good(){
            if(this.isGood==false){
                this.goodImg=require('../assets/goodFilled.png')
                this.$api.savePostLike({
                    userId:this.$store.state.userId,
                    postId:this.id
                }).then((res)=>{
                    window.console.log(res.data.data)
                })
                this.goodNum++;
            }else{
                this.goodImg=require('../assets/good.png')
                this.$api.deletePostLike({
                    postId:this.id,
                    userId:this.$store.state.userId
                }).then((res)=>{
                    window.console.log(res.data.data)
                })
                this.goodNum--;
            }
            this.isGood=!this.isGood;
        },
        submitComment(){
            this.$api.savePostComment({
                postId:this.id,
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
    .side-bar{
        width: 200px;
        padding: 10px;
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
}
</style>