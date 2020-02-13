<template>
<div>
    <div class="comment-box" v-for="comment in commentList" :key="comment.id">
        <commenterInfoBox :commenter="comment.commenter"></commenterInfoBox>
        <div class="content">
            <span>{{comment.content}}</span>
        </div>
        <commentReply  v-for="(item,index) in comment.commentReply" :key="index" :commentReply="item"></commentReply>
    </div>
</div>
</template>
<script>
import CommenterInfoBox from './userInfo/commenterInfoBox'
import CommentReply from './commentReply'
export default {
    name:'comment',
    props:{
        commentList:Array,
    },
    components:{
        'commenterInfoBox':CommenterInfoBox,
        'commentReply':CommentReply,
    },
    data(){
        return{
            input:''
        }
    },
    methods:{
    }
}
</script>
<style scoped>
    .comment-box{
        border-bottom: 1px solid #f1f1f1;
        padding: 16px 2rem 0 20px;
        padding-top: 16px;
        padding-right: 2rem;
        padding-bottom: 0px;
        padding-left: 20px;
    }
    .content{
        font-size: 18px;
    }
    .action{
        display: flex;
        position: relative;
        margin-top: 1.333rem;
        height: 34px;
        width: 500px;
        border-top: 1px solid #ebebeb;
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
</style>