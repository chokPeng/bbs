<template>
<div class="container">
    <navigationHeader></navigationHeader>
    <div class="editor-main">
        <div class="editor-container">
            <el-input v-model="title" placeholder="请输入标题"></el-input>
            <el-select v-model="topic" placeholder="请选择主题">
                        <el-option
                            v-for="item in topicOptions"
                            :key="item"
                            :value="item">
                        </el-option>
            </el-select>
            <div class="editor">
                <quill-editor 
                v-model="content"
                :options="editorOption">
                </quill-editor>
            </div>
            <button class="button" @click="savePost">提交</button>
        </div>
    </div>
</div>
</template>
<script>
import NavigationHeader from '../components/navigationHeader'
export default {
    name: 'richText',
    data(){
        return {
            postId:Int16Array,
            topicOptions: [],
            topic: '',
            title:'',
            content: '',
            editorOption: {
                modules: {
                toolbar: [
                [{ 'size': ['small', false, 'large'] }],
                ['bold', 'italic'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image']
                ],
                history: {
                delay: 1000,
                maxStack: 50,
                userOnly: false
                },
                imageDrop: true,
                imageResize: {
                displayStyles: {
                    backgroundColor: 'black',
                    border: 'none',
                    color: 'white'
                },
                modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                }
            }
        }
        }
    },
    components:{
        'navigationHeader':NavigationHeader
    },
    mounted(){
        this.getPostTopic()
    },
    methods: {
        getPostTopic(){
            this.$api.getPostTopic().then((res)=>{
                window.console.log(res.data)
                this.topicOptions=res.data.data
            })
        },
        savePost(){
          this.$api.savePost({
              posterId:this.$store.state.userId,
              title:this.title,
              topic:this.topic,
              content:this.content
          }).then((res)=>{
              window.console.log(res.data)
              this.$message({
                showClose: true,
                message: '发表帖子成功',
                type: 'success'
              });
             var postId=res.data.data
              this.$router.push({name:'post',params:{id:postId}})
          }).catch((res)=>{
              window.console.log(res)
              this.$message({
              showClose: true,
              message: '发表失败',
              type: 'error'
        });
          })
        }
    }
}
</script>
<style scoped>
    .container{
        height: 100%;
    }
    .editor-main{
        height: 100%;
        background-color: #ffff;
        margin:auto;
        width: 960px;
    }
    .editor-container{
        display: flex;
        flex-direction: column;
        background-color: #ffff;
        padding: 0px 5rem  0px 5rem;
        margin:auto;
    }
    .el-input{
        width: 300px;
    }
    .el-select{
        width: 300px;
    }
    .button{
        width: 50px;
        height:30px;
        margin: auto;
    }
</style>