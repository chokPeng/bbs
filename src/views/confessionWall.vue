<template>
<div>
    <navigationHeader></navigationHeader>
    <div class="confessionWall">
        <div class="confessionWall-body">
            <confessionWallEditor></confessionWallEditor>
            <div class="confessionWall-pin" v-for="(item,key) in confessionWallList" :key="key">
                <authorInfoBox :author="item.poster"></authorInfoBox>
                    <div class="content">
                        <span>{{item.content}}</span>
                    </div>
                    <div class="action">
                        <div class="like-action" @click="like(key)">
                            <img :src="likeFilledImg" v-if="item.isLike" style="width:25px;height:25px"> 
                            <img :src="likeImg" v-else style="width:25px;height:25px">
                            <span>{{item.like}}</span>
                        </div>
                        <div class="comment-action" @click="showComment(key)">
                            <img :src="commentFilledImg" v-if="item.isShowComment" style="width:25px;height:25px"> 
                            <img :src="commentImg" v-else style="width:25px;height:25px">
                            <span>{{item.comments.length}}</span>
                        </div>
                    </div>
                <div  class="comment" v-if="item.isShowComment">
                    <comment :commentList="item.comments">ddd</comment>
                </div>
                
            </div>
        </div>
    </div>
</div>
</template>
<script>
import AuthorInfoBox from '../components/userInfo/authorInfoBox'
import Comment from '../components/comment'
import ConfessionWallEditor from '../components/confessionWallEditor'
import NavigationHeader from '../components/navigationHeader'
export default {
    name: 'confessionWall',
    data (){
        return{
            likeFilledImg:require('../assets/goodFilled.png'),
            likeImg:require('../assets/good.png'),
            commentImg:require('../assets/comment.png'),
            commentFilledImg:require('../assets/commentFilled.png'),
            confessionWallList:[],
            input: '',
        }
    },
    mounted(){
        this.getConfessionWall()
    },
    methods:{
        like(key){
            //取消赞
            if(this.confessionWallList[key].isLike){
               this.$set(this.confessionWallList[key],'isLike',false)   //往confessionWallList里添加一个属性isLike，js可以随意往对象中添加数据

            }else{  // 点赞
               this.$set(this.confessionWallList[key],'isLike',true)
               window.console.log("hhh")
               window.console.log(this.confessionWallList[key].id)
                this.$api.addLike({
                    id:this.confessionWallList[key].id,
                    userId:this.$store.state.userId
                })
            }
        },
        showComment(key){
            //取消展示评论
            if(this.confessionWallList[key].isShowComment){
                
                this.$set(this.confessionWallList[key],'isShowComment',false)
            }else{  // 显示评论
                this.$set(this.confessionWallList[key],'isShowComment',true)
            }
        },
        getConfessionWall(){
            this.$api.getConfessionWall().then((res)=>{
                this.confessionWallList=res.data.data
                window.console.log(res.data)
            })
        }
    },
    components:{
        'authorInfoBox':AuthorInfoBox,
        'comment':Comment,
        'confessionWallEditor':ConfessionWallEditor,
        'navigationHeader':NavigationHeader
    }
}
</script>
<style >
    .confessionWall{
        display: flex;
        flex-direction: column;
        width: 900px;
        margin: auto;
    }
    .confessionWall-body{
        margin: auto;
        padding: 0 10rem 0 10rem;
    }
    .content{
        font-size: 15px;
    }
    .action{
        display: flex;
        position: relative;
        margin-top: 1.333rem;
        height: 34px;
        width: 500px;
        border: 1px solid #ebebeb;
    }
    .like-action{
        margin-left: 125px;
        height: 100%;
        font-size: 25px;
        cursor: pointer;
    }
    .comment-action{
        margin-left: 125px;
        height: 100%;
        font-size: 25px;
        cursor: pointer;
    }
    .comment{
        margin-left: 25px;
        /* width:200px; */
    }
</style>
