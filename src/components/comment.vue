<template>
<div class="container">
    <div class="comment-box" v-for="(comment,key) in commentList" :key="key">
        <commenterInfoBox :commenter="comment.commenter"></commenterInfoBox>
        <div class="content">
            <div class="content">{{comment.content}}</div>
        </div>
        <div class="bottom">
            <span class="time">{{comment.commentingTime|changeTime}}</span>
            <div class="reply-action" v-if="comment.commenter.userId!=currentUserId" @click="showReply(key)">
                <img :src="replyIcon" style="width:16px;height:16px">
                <span style="font-size:10px">回复</span>
            </div>
        </div>
        <div class="comment-input-box" v-if="comment.isReply">
            <img :src="$store.state.avatar|addImagePrefix" style="width:40px;height:40px;border-radius:50%;">
            <input class="input" v-model="commentReplyInput" placeholder="回复......">
            <div v-if="comment.commenter.userId!=currentUserId">
                <button  @click="submitPostCommentReply(comment.id,comment.commenter.userId)" class="button">回复</button>
            </div>
        </div>
         <!--评论的回复-->
        <div v-for="(item,index) in comment.commentReply" :key="index" class="reply">
                <commenterInfoBox :commenter="item.replier"></commenterInfoBox>
                <span>回复</span>
                <router-link :to="`/user/`+item.commenter.userId">{{item.commenter.username}}</router-link>
                <span>:</span>
                <span class="content">{{item.content}}</span>
        <!--                           回复 评论的回复                              -->
                <div class="bottom">
                    <span class="time">{{item.replyingTime|changeTime}}</span>
                    <!--如果当前用户就是replier,就不显示 回复 -->
                    <div class="reply-action" @click="showReplyReply(key,index)" v-if="item.replier.userId!=currentUserId" >
                        <img :src="replyIcon" style="width:16px;height:16px">
                        <span>回复</span>
                    </div>
                </div>
                <div v-if="item.isReplyReply">
                    <div class="reply-reply-input-box">
                        <img :src="$store.state.avatar|addImagePrefix" style="width:40px;height:40px;border-radius:50%;">
                        <input class="input" v-model="replyReplyInput" placeholder="回复......">
                        <button @click="submitPostCommentReplyReply(item.commentId,item.replier.userId)" class="button">回复</button>
                    </div>
                </div>
        </div>
    </div>
</div>
</template>
<script>
import CommenterInfoBox from './userInfo/commenterInfoBox'
export default {
    name:'comment',
    props:{
        commentList:Array,
    },
    components:{
        'commenterInfoBox':CommenterInfoBox,
    },
    data(){
        return{
            replyIcon:require('../assets/message.png'),
            input:'',
            commentReplyInput:'',
            replyReplyInput:'',
            currentUserId:this.$store.state.userId
        }
    },
    methods:{
        showReply(key){
            if(this.commentList[key].isReply){
                this.$set(this.commentList[key],'isReply',false)
               // window.console.log(this.commentList[key].isReply)
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
            }).then(()=>{
                this.$message({
                showClose: true,
                message: '回复成功',
                type: 'success'
                });
                this.$router.go(0)
            })
        },
        /***p评论的回复 */
        showReplyReply(key,index){
            if(this.commentList[key].commentReply[index].isReplyReply){
                this.$set(this.commentList[key].commentReply[index],'isReplyReply',false)
            
            }else{
                this.$set(this.commentList[key].commentReply[index],'isReplyReply',true)
                //window.console.log(this.commentList[key].commentReply[index].isReplyReply)
            }
        },
        submitPostCommentReplyReply(commentId,commenterId){
            this.$api.savePostCommentReply({
                commentId:commentId,
                commenterId:commenterId,
                replierId:this.$store.state.userId,
                content:this.replyReplyInput
            }).then(()=>{
                this.$message({
                showClose: true,
                message: '回复成功',
                type: 'success'
                });
                this.$router.go(0)
            })
        },
    }
}
</script>
<style scoped>
.container{
    background-color: #fff
}
    .comment-input-box{
        display: flex;
        flex-direction: row;
        padding: 40px;
        align-items: center;
    }
    .comment-box{
        border-bottom: 1px solid #f1f1f1;
        padding: 16px 2rem 0 20px;
        padding-top: 16px;
        padding-right: 2rem;
        padding-bottom: 0px;
        padding-left: 20px;
    }
    .content{
        font-size: 15px;
        padding:5px;
    }
    .like-action{
        margin-left: 125px;
        height: 100%;
        font-size: 25px;
        cursor: pointer;
    }
    .comment-action{
        margin-left: 125px;
        height: 100%;
        font-size: 25px;
        cursor: pointer;
    }
    .time{
        font-size: 10px;
        color: #8a9aa9;
    }
    /**回复****/
    .reply{
        padding: 1rem;
        background-color: #fafbfc;
    }
    .reply-action{
        position:absolute;
        right: 5px;
    }
    .bottom{
        position: relative;
        display: flex;
        flex-direction: row;
        font-size: 10px;
        color: #8a9aa9;
    }
    .input{
        height:40px;
        margin-left: 20px;
        margin-right: 20px;
    }
</style>