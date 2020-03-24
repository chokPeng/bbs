<template>
<div class="square">
    <navigationHeader></navigationHeader>
    <div class="square-main">
        <div class="navigation-bar">
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="getSquare()">
                <span>全部</span>
            </el-menu-item>
            <el-menu-item index="2" @click="getSquare('树洞')">
                <span>树洞</span>
            </el-menu-item>
            <el-menu-item index="3" @click="getSquare('资讯')">
                <span>资讯</span>
            </el-menu-item>
            <el-menu-item index="4" @click="getSquare('杂谈')">
                <span>杂谈</span>
            </el-menu-item>
            <el-menu-item index="5" @click="getSquare('表白墙')">
                <span>表白墙</span>
            </el-menu-item>
            <el-menu-item index="6"  @click="getSquare('寻物启事')">
                <span>寻物启事</span>
            </el-menu-item>
            <el-menu-item index="7" @click="getSquare('失物招领')">
                <span>失物招领</span>
            </el-menu-item>
            </el-menu>
        </div>
        <div class="square-body" v-if="squareList">
            <squareEditor></squareEditor>
            <div class="square-pin" v-for="(item,key) in squareList" :key="key">
                <router-link :to="'/square/'+item.id">
                    <userInfoBox :user="item.poster"></userInfoBox>
                    <div class="content">
                        <span>{{item.content}}</span>
                        <div  v-if="item.squareImage.length!=0">
                            <swiper :imageList="item.squareImage"></swiper>
                        </div>
                        <div v-if="item.topic">
                            <span class="topic" >{{item.topic}}</span>
                        </div>
                    </div>
                </router-link>
                    <div class="action">
                        <div class="like-action">
                            <img :src="likeFilledImg" @click="like(key)" v-if="item.isLike" style="width:25px;height:25px;cursor:pointer;"> 
                            <img :src="likeImg" @click="like(key)" v-else style="width:25px;height:25px;cursor:pointer;">
                            <span class="length">{{item.like}}</span>
                        </div>
                        <div class="comment-action" >
                            <img :src="commentFilledImg" @click="showComment(key)" v-if="item.isShowComment" style="width:25px;height:25px;cursor:pointer;"> 
                            <img :src="commentImg" @click="showComment(key)" v-else style="width:25px;height:25px;cursor:pointer;">
                            <span class="length">{{item.comments.length}}</span>
                        </div>
                    </div>
                <div  class="comment" v-if="item.isShowComment">
                    <div class="comment-input-box">
                        <img :src="$store.state.avatar|addImagePrefix" style="width:40px;height:40px;border-radius:50%;">
                        <input class="input" v-model="commentInput" placeholder="输入评论......">
                        <button @click="submitComment(item.id)" class="button">评论</button>
                    </div>
                    <comment :commentList="item.comments"></comment>
                </div>
                
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Swiper from '../components/swiper'
import UserInfoBox from '../components/userInfo/userInfoBox'
import Comment from '../components/comment'
import SquareEditor from '../components/squareEditor'
import NavigationHeader from '../components/navigationHeader'
export default {
    name: 'square',
    data (){
        return{
            likeFilledImg:require('../assets/likeFilled.png'),
            likeImg:require('../assets/like.png'),
            commentImg:require('../assets/comment.png'),
            commentFilledImg:require('../assets/commentFilled.png'),
            squareList:[],
            pictureIcon:require('../assets/picture.png'),
            commentInput: '',
        }
    },
    mounted(){
        this.getSquare()
    },
    methods:{
        getSquare(type){
            this.$api.getSquare(type).then((res)=>{
                this.squareList=res.data.data
                this.isUserLike()
            })
        },
        isUserLike(){
            for(let i=0,length=this.squareList.length;i<length;i++){
                for(let j=0,length=this.$store.state.squareLikeList.length;j<length;j++){
                    if(this.squareList[i].id==this.$store.state.squareLikeList[j]){
                        this.$set(this.squareList[i],'isLike',true)
                    }
                }
            }
        },
        like(key){
            //取消赞
            if(this.squareList[key].isLike){
               this.$set(this.squareList[key],'isLike',false)   //往squareList里添加一个属性isLike，js可以随意往对象中添加数据
               this.$api.deleteSquareLike({
                    squareId:this.squareList[key].id,
                    userId:this.$store.state.userId
                }).then((res=>{                                 //返回值为用户点赞的square的最新数据
                    this.$store.commit('storeSquareLikeList',{
                        squareLikeList:res.data.data
                    })
                }))
                this.squareList[key].like--;
            }else{  // 点赞
               this.$set(this.squareList[key],'isLike',true)
               this.$api.saveSquareLike({
                    squareId:this.squareList[key].id,
                    userId:this.$store.state.userId
                }).then((res)=>{
                    this.$store.commit('storeSquareLikeList',{
                        squareLikeList:res.data.data
                    })
                })
               this.squareList[key].like++
            }
        },
        showComment(key){
            //取消展示评论
            if(this.squareList[key].isShowComment){
                this.$set(this.squareList[key],'isShowComment',false)
            }else{  // 显示评论
                this.$set(this.squareList[key],'isShowComment',true)
            }
        },
        submitComment(id){
            if(this.commentInput==''){
                this.$message({
                showClose: true,
                message: '评论不能为空',
                type: 'error'
                });
                return ;
            }
            this.$api.saveSquareComment({
                squareId:id,
                commenterId:this.$store.state.userId,
                content:this.commentInput
            }).then(()=>{
                this.$message({
                showClose: true,
                message: '评论成功',
                type: 'success'
              });
              this.$router.go(0)
            })
        }
    },
    components:{
        'userInfoBox':UserInfoBox,
        'comment':Comment,
        'squareEditor':SquareEditor,
        'navigationHeader':NavigationHeader,
        'swiper':Swiper
    }
}
</script>
<style scoped>
    .square{
        height:100%;
    }
    .square-main{
        display: flex;
        flex-direction: column;
        width: 900px;
        margin: auto;
        height: 100%;
    }
    .navigation-bar{
        position: absolute;
        top:40%;
        left:200px;
        margin: auto;
        background-color: #ffff;
        text-align: center;
        width: 120px;
    }
    .square-body{
        padding: 10px 10rem 0 10rem;
    }
    .square-pin{
         background-color: #ffff;
         margin-bottom: 10px;
         border-radius: .2rem;
    }
    .topic{
        font-size: 13px;
        display: inline-block;
        line-height: 22px;
        height: 22px;
        padding: 0 12px;
        border: 1px solid #007fff;
        border-radius: 14px;
        color: #007fff;
        user-select: none;
        
    }
    .image{
        display: flex;
        flex-direction: row
    }
    .content{
        font-size: 15px;
        margin-left: 20px;
        /* float:left; */
    }
    .action{
        display: flex;
        position: relative;
        margin-top: 1.333rem;
        height: 34px;
        border: 1px solid #ebebeb;
    }
    .like-action{
        height: 100%;
        font-size: 25px;
        flex: 1 1 33.333%;
        text-align: center;
    }
    .comment-action{
        height: 100%;
        font-size: 25px;
        flex: 1 1 33.333%;
        text-align: center;
    }
    .comment{
        margin-left: 25px;
    }
    .input{
        height: 50px;
        width: 200px;
        margin-left: 50px;
        padding-left:10px;
    }
    .length{
        font-size: 5px;

    }
</style>
