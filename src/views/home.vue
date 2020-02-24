<template>
<div>
    <navigationHeader></navigationHeader>
    <div class="home">
        <div class="main">
            <div class="post-list">
                    <div v-for="(post,index) in postList" :key="index" >
                        <router-link :to="'/post/'+post.id">
                                <div class="menu-item">
                                    <span>{{post.title}}</span>
                                    <div class="metal-infomation">
                                        {{post.poster.username}}
                                        {{post.postingTime|changeTime}}
                                    </div>
                                </div>
                        </router-link>
                    </div>
            </div>
            <div class="side-bar">
                side-bar
            </div>
        </div>
    </div>
</div>
</template>
<script>
import NavigationHeader from '../components/navigationHeader'
export default {
    data() {
        return {
            avatar:'',
            activeIndex: '1',
            postList:[]
        };
    },
    components:{
        'navigationHeader':NavigationHeader
    },
    mounted(){
        this.getAllPosts()
        this.getUserFollow()
    },
    methods: {
        getAllPosts(){
            this.$api.getAllPosts().then((res)=>{
                window.console.log(res)
                this.postList=res.data.data
            }).catch((error)=>{
                window.console.log(error.response)
                if(error.response.status==401){
                    this.$router.push('/login')
                }
            })
        },
        getUserFollow(){
            this.$api.getFollowees(this.$store.state.userId).then((res)=>{
                //  this.$store.commit('storeNameAndAvatar',{
                //     userId:res.data.userId,
                //     avatar:res.data.avatar
                // })
                this.$store.commit('storeFollowingList',{
                    followingList:res.data.data
                })
                window.console.log(res.data.data)
            })
        }
    }
}
</script>
<style>
    .container{
        height: 100%;
    }
    .home{
        display: flex;
        flex-direction: column;
    }
    .main{
        width: 960px;
        border:1px solid cadetblue;
        display: flex;
        flex-direction: row;
        margin: auto;
        background-color: #fff;
    }
    .post-list{
        width: 700px;
        border: 1px solid blanchedalmond;
    }
    .content-box{
        display: flex;
        align-items: center;
        margin-top: 10px;
        height: 150px;
        flex-direction: column;
    }
    .tittle{
        font: 20px bold black;
        margin-left: 0px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        
    }
    .metal-infomation{
        font: 10px grey;
    
    }
    .menu-item {
        display: flex;
        flex-direction: column;
        width: 100%;
        /* text-align: left; */


        align-items: flex-start;
    }
</style>