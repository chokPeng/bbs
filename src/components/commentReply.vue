<template>
<div class="commentReply">
    <commenterInfoBox :commenter="commentReply.replier"></commenterInfoBox>
    <span>回复</span><a href="https://www.gduf.edu.cn/">{{commentReply.commenter.username}}</a>
    <span class="content">:{{commentReply.content}}</span>
</div>
</template>
<script>
import CommenterInfoBox from './userInfo/commenterInfoBox'
export default {
    name:'commentReply',
    props:{
        commentReply:Object
    },
    components:{
        'commenterInfoBox':CommenterInfoBox
    }
}
</script>
<style scoped>
    .commentReply{
        background-color: #fafbfc;
        padding-top: 16px;
        padding-left: 30px;
    }
</style>