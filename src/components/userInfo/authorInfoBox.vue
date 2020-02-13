<template>
    <div class="authorInfoBox">
       <router-link :to="'/user/'+author.userId">
            <img :src="author.avatar" style="width:45px; height:45px; border-radius:50%; margin-right:10px;">
       </router-link>
        <div class="information">
            <router-link :to="'/user/'+author.userId"><span>{{author.username}}</span></router-link>
            <div class="introduction"><span>{{author.introduction}}</span></div>
        </div>
        <button @click="showUser" class="button">关注</button>
    </div>
</template>
<script>
export default {
    name:'authorInfoBox',
    data(){
        return{
            isShowUserInfoWall:false,
        }
    },
    props:{
        author:Object
    },
    methods:{
        showUserInfoWall(){
            if(this.isShowUserInfoWall==true){
                this.isShowUserInfoWall=false
                window.console.log("true到false")
            }else{
                this.isShowUserInfoWall=true
                window.console.log("false到true")
            }
            
        },
        showUser(){
            
            window.console.log(this.author.username)
            window.console.log(this.author.userId)
        }
    },
    components:{
        //"userInfoWall":UserInfoWall
    },
}
</script>
<style scoped>
.authorInfoBox{
    display: flex;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    padding: 1rem 2rem 2rem 1rem;
}
.button{
    margin: 0 0 0 auto;
    padding: 0;
    width: 55px;
    height: 26px;
    font-size: 13px;
    border-color: #6cbd45;
    color: #6cbd45;
}
.information{
    vertical-align: middle;
    height: 50px;
}
.username{
    text-decoration:none;
    font: 16px bold;
}
.introduction{
    color: #8a9aa9;
    font-size: 13px;
}
</style>