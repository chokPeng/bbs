<template>
    <div>
            <div class="receiver-name">
                {{oppositeUser.username}}
            </div>
            <div class="message-body" v-for="(item,key) in privateMessageList" :key="key">
                <div class="message-wrraper">
                    <div class="opposite" v-if="oppositeUser.userId==item.senderId">
                        <div>
                            <router-link target="_blank" :to="'/user/'+oppositeUser.userId">
                                <img :src="oppositeUser.avatar|addImagePrefix" style="width:45px; height:45px; border-radius:50%; margin-right:10px;">
                            </router-link>
                        </div>
                        <div class="content"><span>{{item.content}}</span></div>
                    </div>
                    <div class="login-user-site" v-else>
                        <router-link target="_blank" :to="'/user/'+$store.state.userId">
                                <img :src="$store.state.avatar|addImagePrefix" style="width:45px; height:45px; border-radius:50%; margin-right:10px;">
                        </router-link>
                        <div class="content"><span>{{item.content}}</span></div>
                    </div>
                    <div class="time"><span>{{item.sendingTime|changeTime}}</span></div>
                </div>
                  
            </div>
            <div class="input">
                    <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入内容"
                            v-model="content"
                            maxlength="300"
                            show-word-limit
                            >
                    </el-input>
                <button class="send-button" @click="savePrivateMessage">发送</button>
            </div>
    </div>
</template>
<script>
export default {
    name:'chatBox',
    props:{
        oppositeUser:{},
        privateMessageList:Array
    },
    data(){
        return{
            content:''
        }
    },
    methods:{
        savePrivateMessage(){
            this.$api.savePrivateMessage({
                senderId:this.$store.state.userId,
                receiverId:this.oppositeUser.userId,
                content:this.content
            }).then(()=>{
                this.$message({
                showClose: true,
                message: '发送成功',
                type: 'success'
                });
                this.$router.go(0)
            })
        }
    }
}
</script>
<style scoped>
    .receiver-name{
        text-align: center;
        font-size: 30px;
    }
    .opposite{
        display: flex;
        flex-direction: row;
    }
    .login-user-site{
       display: flex;
       flex-direction: row-reverse
    }
    .time{
        color: #8a9aa9;
        font-size: 10px;
        text-align: center;
    }
    .content{
        text-align: center;
    }
    .input{
        position: relative;
        padding: 20px;
    }
    .send-button{
        color: #fff;
        background-color: #0084ff;
        position: absolute;
        right:20px;
        bottom: 1px;
    }
</style>