<template>
<div>
    <navigationHeader></navigationHeader>
    <div class="user-main">
        <div class="user-content">
            <userInfoWall :user="user" class="user-info-wall"></userInfoWall>
            <div class="list-block">
                <div class="detail-list">     
                    <router-link class="item" :to="{path:`/user/${userId}/active`,params:{userId:userId}}"><span>动态</span></router-link>
                    <router-link class="item" :to="{path:`/user/${userId}/follower`, params: {userId:userId}}"><span>关注者</span></router-link>
                    <router-link class="item" :to="{path:`/user/${userId}/followee`, params: {userId:userId}}"><span>关注了</span></router-link>
                </div>
            </div>
            <div class="router-view"><router-view></router-view></div>
        </div>
        <div class="right-side-bar">
            <div class="relationship-bar">
                <router-link :to="{path:`/user/${userId}/follower`, params: {userId:userId}}"><div>关注者</div><div>4</div></router-link>
                <router-link :to="{path:`/user/${userId}/followee`,params:{userId:userId}}"><div>关注了</div><div>1</div></router-link>
            </div>
        </div>
    </div>
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
        margin:auto;
        width: 960px;
    }
    .user-content{
        width: 680px;
        padding: 20px;
    }
    .user-info-wall{
        margin-bottom: 5px;
    }
    .right-side-bar{
        width: 150px;
    }
    .relationship-bar{
        display: flex;
        flex-direction: row;
        padding: 5px;
        background-color: #fff;
        margin-top: 20px;
    }
    .list-block{
        margin: auto;
    }
    .detail-list{
        display: flex;
        flex-direction: row;
        height: 4.167rem;
        border-bottom: 1px solid #ebebeb;
        background-color: #fff;
    }
    .router-view{
        margin: auto;
    }
    .item{
        margin-right: 20px;
        align-items: center;
    }
</style>