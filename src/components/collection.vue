<template>
    <div>
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
</template>
<script>
export default {
    name:'collection',
    data(){
        return{
            collectionList:[],
            postList:[]
        }
    },
    mounted(){
        this.collectionList=this.$store.state.collectionList
        window.console.log(this.collectionList)
        this.postList=this.$store.state.collectionList.postList
    },
}
</script>
<style scoped>
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
</style>