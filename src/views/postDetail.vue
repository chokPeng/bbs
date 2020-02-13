<template>
<div>
    <navigationHeader></navigationHeader>
    <div class="main-container">
        <div class="article-suspended-panel">
            <div @click="good">
                <img :src="goodImg" style="width:50px;height:50px;"><span>{{goodNum}}</span>
            </div>
            <div><img :src="commentImg" style="width:50px;height:50px;"><span>{{commentNum}}</span></div>
        </div>
        <div class="main-area">
            <authorInfoBox :author="author"></authorInfoBox> 
            <div v-html="content"></div>
            <div class="comment-input-box">
                <img :src="author.avatar" style="width:50px;height:50px;border-radius:50%;">
                <input class="input" v-model="commentInput" placeholder="输入评论......">
                <button @click="submitComment" class="button">评论</button>
            </div>
            <comment :commentList="commentList"></comment>
        </div>
        <div class="side-bar">
            side-bar
        </div>
    </div>
</div>
</template>
<script>
import NavigationHeader from '../components/navigationHeader'
import AuthorInfoBox from '../components/userInfo/authorInfoBox'
import Comment from '../components/comment'
export default {
    name:'post',
    data(){
        return{
            author:{},
            content:'',
            id:'',
            goodImg: require('../assets/good.png'),
            commentImg: require('../assets/comment.png'),
            goodNum:10,
            isGood:false,
            commentNum:1,
            commentList:[],
            input:'',
            commentInput:'',
        }
    },
    mounted(){
        //是this.$route.query
        this.id=this.$route.params.id
        this.getPost(this.id)
    },
    components:{
        'authorInfoBox':AuthorInfoBox,
        'comment':Comment,
        'navigationHeader':NavigationHeader
    },
    methods:{
        getPost(id){
                this.$api.getPost(id).then((res)=>{
                    window.console.log(res.data.data)
                    this.author=res.data.data.poster
                    this.content=res.data.data.content
                    this.commentList=res.data.data.comment
            })
        },
        good(){
            if(this.isGood==false){
                this.goodImg=require('../assets/goodFilled.png')
                this.goodNum++;
            }else{
                this.goodImg=require('../assets/good.png')
                this.goodNum--;
            }
            this.isGood=!this.isGood;
        },
        submitComment(){
            let param = new URLSearchParams()
            param.append('postId',this.id)
            param.append('commenterId',123456)
            param.append('content',this.commentInput)
            this.$api.postFormData('postComment',param)
        }
    }
}
</script>
<style scoped>
    .main-container{
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        border:1px solid cornsilk;
        width: 960px;
        background: #fff;
    }
    .main-area{
        width: 700px;
        padding: 20px;
    }
    .comment-input-box{
        display: flex;
        flex-direction: row;
    }
    .article-suspended-panel{
        display: flex;
        flex-direction: column;
        position: fixed;
        margin-left: -7rem;
        top: 16rem;
    }
    .side-bar{
        width: 200px;
        padding: 10px;
    }
    .input{
        margin-left: 10px;
        padding-left: 1rem;
        border-radius: 3px;
        width: 500px;
        border: 1px solid #f1f1f1;
    }
    .button{
        width: 50px;
        background-color: greenyellow
    }
</style>