<template>
<div>
    <span>关注者</span>
    <div v-for="item in followerList" :key="item.userId">
        <userInfoBox class="user-info-box" :user="item"></userInfoBox>
    </div>
</div>
</template>
<script>
import UserInfoBox from '../components/userInfo/userInfoBox'
export default {
    name:'follower',
    data(){
        return{
            followerList:[],
            myFollowingList:[]
        }
    },
    mounted(){
        window.console.log(this.$route.params.userId)
        // this.getMyFollowerList(this.$route.params.userId)
        this.getFollowers(this.$route.params.userId)
    },
    methods:{
        getFollowers(userId){
            this.$api.getFollowees(userId).then((res)=>{
                // window.console.log("myFollowingList")
                // window.console.log(res.data.data)
                this.myFollowingList=res.data.data
                this.getMyFollowerList(userId)
            })
        },
        getMyFollowerList(userId){
            this.$api.getFollowers(userId).then((res)=>{
                this.followerList=res.data.data
                for(var j = 0,len=this.followerList.length;j<len; j++) {
                    var isFollow=this.myFollowingList.some(follower=>{
                       return follower.userId==this.followerList[j].userId
                   })
                this.$set(this.followerList[j],'isFollow',isFollow)
                }
            })
        }
    },
    components:{
        'userInfoBox':UserInfoBox
    }
}
</script>