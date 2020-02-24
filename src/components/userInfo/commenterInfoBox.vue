<template>
    <div class="commenterInfoBox">
        <div v-if="JSON.stringify(commenter)!='{}'">
            <router-link :to="'/user/'+commenter.userId">
                <img :src="commenter.avatar|addImagePrefix" style="width:35px; height:35px; border-radius:50%;margin-right: 10px;">
            </router-link>
        </div>
        <div class="information">
            <router-link :to="'/user/'+commenter.userId">
                <span>{{commenter.username}}</span>
            </router-link>
            <div class="introduction">
                <span>{{commenter.introduction}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'commenterInfoBox',
    props:{
        commenter:{}
    }
}
</script>
<style scoped>
.commenterInfoBox{
    display: flex;
}
.information{
    vertical-align: middle;
    height: 50px;
}
.username{
    font:14px bold;
    text-decoration:none;
}
.introduction{
    color: #8a9aa9;
    font-size:10px;
}
</style>