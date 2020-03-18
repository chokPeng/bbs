<template>
    <div>
        <span class="title">收藏夹</span>
        <div class="post-list">
                    <div v-for="(item,index) in collectionList" :key="index" >
                        <router-link :to="'/post/'+item.post.id">
                            <div class="post-item">
                                    <div class="menu-item">
                                        <span class="post-title">{{item.post.title}}</span>
                                        <div class="post-content" v-html="item.post.content"></div>
                                        <div class="metal-infomation">
                                            {{item.post.poster.username}}
                                            {{item.post.postingTime|changeTime}}
                                        </div>
                                    </div>
                            </div>
                        </router-link>
                    </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'collection',
    data(){
        return{
           collectionList:[],
        }
    },
    mounted(){
        this.getCollectionList(this.$route.params.userId)
        // this.collectionList=this.$store.state.collectionList
        // window.console.log(this.collectionList)
        // this.postList=this.$store.state.collectionList
    },
    methods:{
        getCollectionList(userId){
            this.$api.getCollection({
                collectorId:userId
            }).then((res)=>{
                this.collectionList=res.data.data
            })
        }
    }
}
</script>
<style scoped>
.title{
    text-align: center;
}
    .post-list{
        border: 1px solid rgba(178,186,194,.15);
        background-color: #fff;
        
    }
    .post-item{
        
        overflow: hidden;
        padding: 10px 20px;
        height:80px;
        text-align: center;
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
</style>