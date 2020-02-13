<template>
    <div  class="userInfoWall">
        <div class="text">
            <img :src="user.avatar" style="width:60px; height:60px; border-radius:50%;">
            <div class="information">
                <router-link :to="'/home/'">
                    <span>{{user.username}}</span>
                </router-link>
                <div class="introduction">
                    <span>{{user.introduction}}</span>
                </div>
            </div>
            <button @click="saveFollower" class="button">关注</button>
        </div>
</div>
</template>
<script>
export default {
    name:'userInfoWall',
    props:{
        user:Object
    },
    mounted(){
        this.user.joinTime=this.timestampToTime(this.user.joinTime)
         window.console.log(this.user.joinTime)
    },
    methods:{
        //将时间戳转化成YYYY-MM-DD
        timestampToTime (cjsj) {
            var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            window.console.log(date)
            var Y = date.getFullYear() + '-'
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
            var D = date.getDate() + ' '
            return (Y+M+D)
        },
        saveFollower(){
            this.$api.saveFollower({
                followerId:this.$store.state.userId,
                followeeId:this.user.userId
            })
        }
    }
}
</script>
<style scoped>
    .userInfoWall{
        display: flex;
        flex-direction: row;
        /* position:absolute; */
        /* z-index:2; */
        left:10%;
    }
    .text{
        display: flex;
        flex-direction: row;
        width: 700px;
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
    .button{
        margin-top: 12px;
        margin-left: 200px;
        width: 55px;
        height: 26px;
        font-size: 13px;
        border-color: #6cbd45;
        color: #6cbd45;
    }
    .follower-block{
        display: flex;
        width: 200px;
        padding-left: 2rem;
        padding-right: 2rem;
    }
</style>