<template>
<div style="height:100%">
    <navigationHeader></navigationHeader>
    <div class="home">
        <div class="main">
            <div class="post-list">
                    <div v-for="(post,index) in postList" :key="index" >
                        <router-link :to="'/post/'+post.id">
                            <div class="post-item">
                                    <div class="menu-item">
                                        <span class="post-title">{{post.title}}</span>
                                        <div class="post-content" v-html="post.content"></div>
                                        <div class="metal-infomation">
                                            {{post.poster.username}}
                                            {{post.postingTime|changeTime}}
                                        </div>
                                    </div>
                            </div>
                        </router-link>
                    </div>
            </div>
            <div class="side-bar">
                <div class="nav-bar">
                    <el-row :gutter="5">
                        <el-col :span="12" class="el-col">
                            <router-link :to="'/postEditor'">
                                <img :src="postEditImg" style="width:30px;height:30px">
                                <div class="action-name">发帖子</div>
                            </router-link>
                        </el-col>
                        <el-col :span="12" class="el-col">
                            <router-link :to="'/user/'+$store.state.userId+'/active'">
                                <img :src="userDetailImg" style="width:30px;height:30px">
                                <div class="action-name">我的主页</div>
                            </router-link>
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <span class="notification">关于作者</span>
                    <ul class="acount-list">
                        <li><a href ="https://weibo.com/u/5140101806" target="view_window"><img :src="sinaLogo" class="logo-item"></a></li>
                        <li><a href="https://github.com/chokPeng" target="view_window"><img :src="githubLogo" class="logo-item"></a></li>
                        <li><a href="https://juejin.im/user/5ca8b654518825664912cf42" target="view_window"><img :src="juejinLogo" class="logo-item"></a></li>
                    </ul>
                </div>
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
            postList:[],
            userDetailImg:require('../assets/userDetail.png'),
            postEditImg:require('../assets/postEdit.png'),
            onlineUserNumber:Int16Array,
            sinaLogo:require('../assets/sina.png'),
            juejinLogo:require('../assets/juejin.png'),
            githubLogo:require('../assets/github.png'),
        };
    },
    components:{
        'navigationHeader':NavigationHeader
    },
    mounted(){
        this.getAllPosts(),
        this.getFollowingList(),
        this.getUserSquareLikeList(),
        this.getCollectedPostIdListList(),
        this.getUserRole()
    },
    methods: {
        getAllPosts(){
            this.$api.getAllPosts().then((res)=>{
                this.postList=res.data.data
            }).catch((error)=>{
                if(error.response.status==401){
                    this.$router.push('/login')
                }
            })
        },
        getUserRole(){
            this.$api.getUserRole(this.$store.state.userId).then((res)=>{
                //window.console.log(res.data.data)
                this.$store.commit('storeUserRole',{
                    role:res.data.data
                })
            })
        },
        getFollowingList(){
            // window.console.log("ssss:")
            // window.console.log(this.$store.state)
            // window.console.log(this.$store.state.userId)
            this.$api.getFollowees(this.$store.state.userId).then((res)=>{
                 this.$store.commit('storeFollowingList',{
                    followingList:res.data.data
                })
            })
        },
        getUserSquareLikeList(){
            this.$api.getUserSquareLikeList({
                userId:this.$store.state.userId
            }).then((res)=>{
                this.$store.commit('storeSquareLikeList',{
                    squareLikeList:res.data.data
                })
            })
        },
        getCollectedPostIdListList(){
            this.$api.getCollectedPostIdList({
                collectorId:this.$store.state.userId
            }).then((res)=>{
                this.$store.commit('storeCollectionList',{
                    collectionList:res.data.data
                })
            })
        }
        
    }
}
</script>
<style scoped>
    .container{
        height: 100%;
    }
    .home{
        display: flex;
        flex-direction: column;
    }
    .main{
        width: 960px;
        /* border:1px solid cadetblue; */
        display: flex;
        flex-direction: row;
        margin: auto;
        padding: 5px;
        text-align: center;
    }
    .post-list{
        width: 700px;
        border: 1px solid blanchedalmond;
        background-color: #fff;
        
    }
    .post-item{
        
        overflow: hidden;
        padding: 10px 20px;
        height:80px;
        text-align: center;
        border-bottom: 1px solid bisque;
        border-bottom: 1px solid rgba(178,186,194,.15);
    }
    .content-box{
        display: flex;
        align-items: center;
        margin-top: 10px;
        height: 150px;
        flex-direction: column;
    }
    .post-title{
        font: 20px bold;
        color:black;
        margin-left: 0px;
    }
    .post-content{
        max-height:40px;
        color: #444;
        font-size: 15px;
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
        align-items: flex-start;
    }
    .side-bar{
        margin-left: 50px;
        width: 260px;
    }
    .nav-bar{
        background-color: #fff;
        padding: 10px;
    }
    .el-col{
        height:80px;
        text-align: center;
    }
    .action-name{
        color: #444;
        font-size: 16px;
    }
    .notification{
        text-align: center;
        color: #909090;
        font-size:12px;
    }
    .acount-list{
        display: flex;
        justify-content: center;
        margin: 1rem 0;
    }
    .logo-item{
        width: 24px;
        margin-left: .5rem;
        margin-right: .5rem;
        cursor: pointer;
    }
</style>