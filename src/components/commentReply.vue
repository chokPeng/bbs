<template>
<div class="commentReply">
    <!-- <div v-if="JSON.stringify(commentReply.replier)!='{}'"> -->
        <commenterInfoBox :commenter="commentReply.replier"></commenterInfoBox>
    <!-- </div> -->
    <span>回复</span><router-link :to="`/user/`+commentReply.commenter.userId">{{commentReply.commenter.username}}</router-link>
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
    .reply-reply{
        background-color: greenyellow;
    }
</style>