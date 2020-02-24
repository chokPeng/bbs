<template>
    <div  class="userInfoWall">
        <div class="text">
            <img :src="user.avatar|addImagePrefix" style="width:60px; height:60px; border-radius:50%;">
            <div class="information">
                <router-link :to="'/home/'">
                    <span>{{user.username}}</span>
                </router-link>
                <div class="introduction">
                    <span>{{user.introduction}}</span>
                </div>
            </div>
            <button @click="editUserInfo" v-if="this.$store.state.userId==user.userId" class="edit-button">编辑个人资料</button>
            <div v-if="this.$store.state.userId!=user.userId">
                <button @click="follow" v-if="!isFollow" class="button">关注</button>
                <button @click="follow" v-if="isFollow" class="button">已关注</button>
                <button @click="sendPrivateMessage" class="button">发私信</button>
            </div>
        </div>
</div>
</template>
<script>
export default {
    name:'userInfoWall',
    props:{
        user:Object
    },
    data(){
        return{
            isFollow:''
        }
    },
    methods:{
        follow(){
            this.$api.follow({
                followerId:this.$store.state.userId,
                followeeId:this.user.userId
            }).then(()=>{
                this.isFollow=true
            })
        },
        unFollow(){
            this.$api.unFollow({
                followerId:this.$store.state.userId,
                followeeId:this.user.userId
            }).then(()=>{
                this.isFollow=false
            })
        },
        editUserInfo(){
            this.$router.push(`/profile`)
        },
        // sendPrivateMessage(){
        //     this.$api.savePrivateMessage({
        //         senderId:
        //     })
        // }
    }
}
</script>
<style>
    .userInfoWall{
        display: flex;
        flex-direction: row;
        left:10%;
        background-color: #fff;
    }
    .text{
        display: flex;
        flex-direction: row;
        width: 700px;
        padding: 20px;
    }
    .information{
        margin-left: 10px;
        vertical-align: middle;
        height: 50px;
    }
    .introduction{
        color: #8a9aa9;
        font-size:10px;
    }
    .edit-button{
        margin-top: 12px;
        margin-left: 200px;
        width: 150px;
        height: 36px;
        font-size: 13px;
        border-color: #6cbd45;
        color: #6cbd45;
        margin: 0 0 0 auto;
    }
    .follower-block{
        display: flex;
        width: 200px;
        padding-left: 2rem;
        padding-right: 2rem;
    }
</style>