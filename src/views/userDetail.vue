<template>
<div>
    <navigationHeader></navigationHeader>
    <div class="user-main">
        <userInfoWall :user="user" class="user-info-wall"></userInfoWall>
        <div class="relationship-bar">
            <router-link :to="`/user/${userId}/follower`"><div>Follower</div><div>4</div></router-link>
            <router-link :to="`/user/${userId}/followee`"><div>Followee</div><div>1</div></router-link>
        </div>
    </div>
    <div><router-view></router-view></div>
</div>
</template>
<script>
import UserInfoWall from '../components/userInfo/userInfoWall'
import NavigationHeader from '../components/navigationHeader'
export default {
    name:'userDetail',
    components:{
        'userInfoWall':UserInfoWall,
        'navigationHeader':NavigationHeader,
    },
    data(){
        return{
            user:{},
            userId:'',
        }
    },
    mounted(){
        this.userId=this.$route.params.userId
        this.getUserInfo(this.userId)
    },
    methods:{
       getUserInfo(userId){
           this.$api.getUserInfo(userId).then((res)=>{
               window.console.log(res.data)
               window.console.log(res.data.data)
               this.user=res.data.data
           })
       } 
    }
}
</script>
<style >
    .user-main{
        display: flex;
        flex-direction: row;
    }
    .user-info-wall{
        width: 700px;
        margin: auto;
        border: 2px solid greenyellow
    }
    .relationship-bar{
        display: flex;
        flex-direction: row;
    }
</style>