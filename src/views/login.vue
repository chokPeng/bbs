<template>
<div class="container">
    <div class="main">
        <div class="action-list">
            <router-link class="item" :to="{path:`/login/signin`}"><span>登录</span></router-link>
            <router-link class="item" :to="{path:`/login/signup`}"><span>注册</span></router-link>
        </div>
        <div clss="item">
            <router-view></router-view>
        </div>
    </div>
</div>
</template>
<script>
export default{
    data(){
        return{
            username: '13229443974',
            password: 'user',
        } 
    },
}
</script>
<style scoped>
    .container{
        height: 100%;
        display: flex;
        flex-direction: row;
        margin:auto;
        background-color: #ffff;
        background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582480257239&di=b8250dc65db225f023ee8e897dc39a89&imgtype=0&src=http%3A%2F%2Fp19.qhimg.com%2Fbdr%2F__%2Ft01045720a07b5702b5.jpg);
        background-repeat: no-repeat;
        background-color: #b8e5f8;
    }
    .main{
        width: 400px;
        margin: auto
    }
    .action-list{
        display: flex;
        flex-direction: row;
    }
    .item{
        /* width: 600px;
        height: 600px; */
        margin: auto
    }
</style>