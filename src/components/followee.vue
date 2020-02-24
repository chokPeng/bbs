<template>
<div>
    <span>关注了</span>
    <div v-for="(item,key) in followeeList" :key="key">
        <userInfoBox class="user-info-box" :user="item"></userInfoBox>
    </div>
</div>
</template>
<script>
import UserInfoBox from '../components/userInfo/userInfoBox'
export default {
    name:'followee',
    data(){
        return{
            followeeList:[]
        }
    },
    mounted(){
        this.getFollowees(this.$route.params.userId)
    },
    methods:{
        getFollowees(userId){
            this.$api.getFollowees(userId).then((res)=>{
                window.console.log(res.data)
                this.followeeList=res.data.data
                for(var j = 0,len=this.followeeList.length;j<len; j++) {
                    window.console.log("dssaadwr")
                    this.$set(this.followeeList[j],'isFollow',true)
                }
            })
        }
    },
    components:{
        'userInfoBox':UserInfoBox
    }
}
</script>
<style>
</style>