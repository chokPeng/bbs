<template>
<div class="active-container">
    <div class="active-main">
        <span>动态</span>
        <div v-for="(item,key) in activeList" :key="key" class="activeList">
            <div>
                <span class="action">{{item.action}}</span>
            </div>
            <div v-if="item.type=='用户'" class="item">
                <userInfoBox :user="item.content"></userInfoBox>
            </div>
            <div v-else-if="item.type=='帖子'" class="item">
                <router-link :to="'/post/'+item.content.id">
                            <div class="post-item">
                                    <div class="menu-item">
                                        <span class="post-title">{{item.content.title}}</span>
                                        <div class="post-content" v-html="item.content.content"></div>
                                        <div class="metal-infomation">
                                            {{item.content.poster.username}}
                                            {{item.content.postingTime|changeTime}}
                                        </div>
                                    </div>
                            </div>
                </router-link>
            </div>
            <div v-else-if="item.type=='广场'" class="item">
                <router-link :to="'/square/'+item.content.id">
                    <userInfoBox :user="item.content.poster"></userInfoBox>
                        <div class="square-content">
                            <span>{{item.content.content}}</span>
                            <div  v-if="item.content.squareImage.length!=0">
                                <swiper :imageList="item.content.squareImage"></swiper>
                            </div>
                            <div v-if="item.content.topic">
                                <span class="topic">{{item.content.topic}}</span>
                            </div>
                        </div>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import UserInfoBox from '../components/userInfo/userInfoBox'
export default {
    name:'active',
    data(){
        return{
            activeList:[],
        }
    },
    mounted(){
        this.getActive(this.$route.params.userId)
    },
    components:{
        'userInfoBox':UserInfoBox
    },
    methods:{
        getActive(userId){
            this.$api.getActive(
                userId
            ).then((res)=>{
                this.activeList=res.data.data
                this.setTypeForActiveList()
            })
        },
        setTypeForActiveList(){
            for(let i=0,length=this.activeList.length;i<length;i++){
                switch(this.activeList[i].action){
                    case "关注了":
                        this.$set(this.activeList[i],'type',"用户")
                        break;
                    case "点赞了帖子":
                        this.$set(this.activeList[i],'type',"帖子")
                        break;
                    case "收藏了帖子":
                        this.$set(this.activeList[i],'type',"帖子")
                        break;
                    case "发表了帖子":
                        this.$set(this.activeList[i],'type',"帖子")
                        break;
                    case "点赞了":
                        this.$set(this.activeList[i],'type',"广场")
                        break;
                    case "在广场发表了":
                        this.$set(this.activeList[i],'type',"广场")
                        break;
                }
            }
        }
    }
}
</script>
<style scoped>
.activeList{
    background-color: #ffff
}
.action{
    font-size: 13px;
    color: #8a9aa9;
}
.item{
    margin-bottom: 5px;
}
 .post-item{
        overflow: hidden;
        padding: 10px 20px;
        height:80px;
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
 .square-content{
        font-size: 15px;
        margin-left: 20px;
        /* float:left; */
    }
  .topic{
        font-size: 13px;
        display: inline-block;
        line-height: 22px;
        height: 22px;
        padding: 0 12px;
        border: 1px solid #007fff;
        border-radius: 14px;
        /* text-align: center; */
        color: #007fff;
        user-select: none;
        
    }
</style>