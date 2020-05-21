<template>
    <div>
    <navigationHeader></navigationHeader>
    <div class="main-container" v-if="JSON.stringify(square)!='{}'">
        <div class="article-suspended-panel">
            <div @click="like">
                <img :src="likeImg" style="width:50px;height:50px;"><span>{{square.like}}</span>
            </div>
            <div><img :src="commentImg" style="width:50px;height:50px;">
                <span v-if="square.comments.length!=0">{{square.comments.length}}</span>
            </div>
        </div>
        <div class="main-area">
            <div class="header">
                <userInfoBox :user="square.poster"></userInfoBox>
                <div v-if="square.poster.userId==$store.state.userId||this.$store.state.role=='admin'">
                    <button @click="deleteSquare" class="delete-button">删除</button>
                </div>
            </div>
            
            <div class="content">
                <span>{{square.content}}</span>
                <div  v-if="square.squareImage.length!=0">
                    <div v-for="(item,key) in square.squareImage" :key="key">
                        <img :src="item|addImagePrefix">
                    </div>
                </div>
                <div v-if="square.topic">
                    <span class="topic" >{{square.topic}}</span>
                </div>
            </div>
            <div class="postingTime">{{square.postingTime|changeTime}}</div>
            <div class="comment-title">评论</div>
            <div class="comment-input-box">
                <img :src="$store.state.avatar|addImagePrefix" style="width:50px;height:50px;border-radius:50%;">
                <input class="input" v-model="commentInput" placeholder="输入评论......">
                <button @click="submitComment" class="button">评论</button>
            </div>
            <comment :commentList="square.comments"></comment>
        </div>
    </div>
</div>
</template>
<script>
import NavigationHeader from '../components/navigationHeader'
import UserInfoBox from '../components/userInfo/userInfoBox'
import Comment from '../components/comment'
export default {
    name:'squareDetail',
    data(){
        return{
            square:{},
            likeImg: require('../assets/like.png'),
            commentImg: require('../assets/comment.png'),
            collectImg: require('../assets/collect.png'),
            isLike:false,
            commentNum:1,
            input:'',
            commentInput:'',
            commentReplyInput:'',
        }
    },
    components:{
        'userInfoBox':UserInfoBox,
        'comment':Comment,
        'navigationHeader':NavigationHeader,
    },
    mounted(){
        this.getSquareById(this.$route.params.id)
    },
    methods:{
        isUserLike(){
            for(let j=0,length=this.$store.state.squareLikeList.length;j<length;j++){
                if(this.square.id==this.$store.state.squareLikeList[j]){
                    this.isLike=true
                    this.likeImg=require('../assets/likeFilled.png')
                    break
                }
            }
        },
        deleteSquare(){
            this.$api.deleteSquare(this.square.id).then((res)=>{
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
        showReply(key){
            if(this.post.comment[key].isReply){
                this.$set(this.square.comment[key],'isReply',false)
            }
           else{
                this.$set(this.squarecomment[key],'isReply',true)
            }
            
        },
        submitSquareCommentReply(commentId,commenterId){
            this.$api.savePostCommentReply({
                commentId:commentId,
                commenterId:commenterId,
                replierId:this.$store.state.userId,
                content:this.commentReplyInput,   
            })
        },
        getSquareById(id){
                this.$api.getSquareById(id).then((res)=>{
                    this.square=res.data.data
                    this.isUserLike()
            })
        },
        like(){
            if(this.isLike==false){
                this.likeImg=require('../assets/likeFilled.png')
                this.$api.saveSquareLike({
                    squareId:this.square.id,
                    userId:this.$store.state.userId
                }).then((res)=>{
                    this.$store.commit('storeSquareLikeList',{
                        squareLikeList:res.data.data
                    })
                })
                this.square.like++;
            }else{
                this.likeImg=require('../assets/like.png')
                this.$api.deleteSquareLike({
                    squareId:this.square.id,
                    userId:this.$store.state.userId
                }).then((res=>{
                    this.$store.commit('storeSquareLikeList',{
                        squareLikeList:res.data.data
                    })
                }))
                this.square.like--;
            }
            this.isLike=!this.isLike;
        },
        submitComment(){
            if(this.contentInput==''){
                this.$message({
                showClose: true,
                message: '评论不能为空',
                type: 'error'
                });
                return ;
          }
            this.$api.saveSquareComment({
                squareId:this.square.id,
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
    }
}
</script>
<style scoped>
    .main-container{
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        border:1px solid cornsilk;
        width: 800px;
        background: #fff;
        /* height: 100%; */
    }
    .main-area{
        width: 700px;
        padding: 20px;
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
    .header{
        position: relative; 
    }
    .delete-button{
        margin: 0 0 0 auto;
        padding: 0;
        width: 40px;
        height: 26px;
        font-size: 5px;
        color: #76839b;
        position: absolute;
        right:5px;
        cursor:pointer;
    }
    .content{
        padding: 20px;
    }
    .postingTime{
        font-size: 1px;
        color: #909090;
    }
    .input{
        margin-left: 10px;
        padding-left: 1rem;
        border-radius: 3px;
        width: 500px;
        border: 1px solid #f1f1f1;
        height: 40px;
    }
    .topic{
        font-size: 13px;
        display: inline-block;
        line-height: 22px;
        height: 22px;
        padding: 0 12px;
        border: 1px solid #007fff;
        border-radius: 14px;
        color: #007fff;
        user-select: none;
        margin-top: 15px;
        
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
    
</style>