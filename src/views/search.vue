<template>
<div>
    <navigationHeader @search="search"></navigationHeader>
    <div  class="home">
        <div class="main">
            <!--用户-->
            <ul v-for="(item,key) in userList" :key="key" class="userList">
                <li><userInfoBox :user="item" style="width:500px;"></userInfoBox></li>
            </ul>
            <!--帖子-->
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
        </div>
    </div>
    
    <div>

    </div>
</div>
</template>
<script>
import NavigationHeader from '../components/navigationHeader'
import UserInfoBox from '../components/userInfo/userInfoBox'
export default {
    name:'search',
    data(){
        return{
            userList:[],
            postList:[],
        }
    },
    mounted(){
        window.console.log(this.$route.params.keyword)
        this.keyword=this.$route.params.keyword
        this.search(this.keyword)
    },
    components:{
        'userInfoBox':UserInfoBox,
        'navigationHeader':NavigationHeader
    },
    methods:{
        search(keyword){
            if(this.keyword==''){
                this.$message({
                showClose: true,
                message: '关键字不能为空',
                type: 'error'
                });
                return ;
            }
            window.console.log(keyword)
            this.$api.search({
                keyword:keyword
            }).then((res)=>{
                this.userList=res.data.data.userList,
                this.postList=res.data.data.postList
            })
        }
    }
}
</script>
<style scoped>
     .home{
        display: flex;
        flex-direction: column;
    }
    .main{
        width: 960px;
        display: flex;
        flex-direction: column;
        margin: auto;
        padding: 5px;
    }
    .userList{
        display: flex;
        flex-direction: column;
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
</style>