<template>
    <div class="editor">  
        <div class="editor-body">
            <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="content"
                    maxlength="300"
                    show-word-limit
                    >
            </el-input>
            <span class="topic" v-if="topic">{{topic}}</span>
        </div>
        <div class="editor-bottom">
            <div class="editor-item" @click="selectPicture">
                <img :src="pictureIcon" style="width:20px;height:20px">
                <span>图片</span>
            </div>
            <div class="editor-item" @click="getTopic">
                    <img :src="topicIcon" style="width:20px;height:20px">
                    <span>话题</span>
            </div>
            <div >
                <button @click="saveSquare" class="button">发表</button>
            </div>
            <input type="file" accept=".png,.jpg" @change="changeMultipleFiles"  ref="file" multiple="multiple" style="display:none">
        </div>
        <div class="topic-select" v-if="isShowTopicSelect">
            <el-select v-model="topic" clearable placeholder="请选择主题">
                <el-option
                v-for="(item,key) in topicOptions"
                :key="key"
                :value="item">
                </el-option>
            </el-select>
        </div>
        <ul class="image-list-contianer">
            <li v-for="(item,key) in fileList" v-bind:key="key" class="image-container">
                <img :src="item" class="image">
                <img :src="forkImg" class="forkImg" @click="deleteImage(key)">
            </li>
        </ul>
    </div>  
</template>
<script>
export default {
  name: 'editor',
  data() {
    return {
        file:[],
        fileList:[],
        isShow:false,
        content:'',
        forkImg:require('../assets/fork.png'),
        pictureIcon:require('../assets/picture.png'),
        topicIcon:require('../assets/topic.png'),
        topicOptions:[],
        topic:'',
        isShowTopicSelect:false
    }
  },
  methods:{
      showTopicSelect(){
          this.isShowTopicSelect=!this.isShowTopicSelect;
          window.console.log(this.isShowTopicSelect)
      },
       selectPicture(){
         this.$refs.file.click();
         window.console.log(this.$refs)
       },
       changeMultipleFiles(e) {
           window.console.log(e)
            this.file = [...e.target.files]
            window.console.log(this.file)
            for(let i=0,length=this.file.length;i<length;i++){
                this.fileList.push(this.getFileUrl(this.file[i]))
            }
            window.console.log(this.$refs.file.value)
            this.$refs.file.value = null;
        },
      saveSquare(){
          if(this.content==''){
                this.$message({
                showClose: true,
                message: '内容不能为空',
                type: 'error'
                });
                return ;
          }
           const uploadForm=new FormData();
          for(let i=0,length=this.file.length;i<length;i++){
                uploadForm.append('file',this.file[i])
          }
          uploadForm.append('content', this.content);
          uploadForm.append('posterId', this.$store.state.userId);
          uploadForm.append('topic',this.topic)
          this.$api.saveSquare(uploadForm).then((res)=>{
              this.$message({
                showClose: true,
                message: '发表成功',
                type: 'success'
              });
              this.$router.go(0)
              //this.$router.push('/Square')
              window.console.log(res.data)
          })
      },
      getFileUrl(file) {
            let url = null
            if (window.createObjectURL !== undefined) { // basic
                url = window.createObjectURL(file)
            } else if (window.URL !== undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file)
            } else if (window.webkitURL !== undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file)
            }
            return url
        },
      deleteImage(key){
          this.file.splice(key,1)
          this.fileList.splice(key,1)
      },
      getTopic(){
          if(this.isShowTopicSelect==false){
            this.$api.getTopic("square").then((res)=>{
                this.topicOptions=res.data.data
            })
          }
          this.showTopicSelect();
      }
  }
}
</script>
<style scoped>
    ul{
        list-style:none
    }

    .editor{
        padding: 0rem 2rem 0;
        margin-bottom: 8px;
        background-color: #ffff;
        padding-top: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
        border-radius: .2rem;
    }
    .editor-bottom{
        display: flex;
        flex-direction: row;
        padding: 5px;
        color: #027fff;
        position: relative;
    }
    .button{
        position: absolute;
        right: 20px;
        background-color: #027fff;
    }
    .editor-item{
        display: flex;
        flex-direction: row;
        cursor: pointer;
        padding-right: 6px;
    }
    .image-list-contianer{
        display: flex;
        flex-direction: row;
    }
    .topic{
        font-size: 13px;
        display: inline-block;
        line-height: 22px;
        height: 22px;
        padding: 0 12px;
        border: 1px solid #007fff;
        border-radius: 14px;
        text-align: center;
        color: #007fff;
        user-select: none;
    }
    .image-container{
        position: relative;
        
    }
    .image{
        width: 100px;
        height: 100px;
    }
    
    .forkImg{
        z-index:200;
        width: 15px;
        height: 15px;
        position:absolute;
        top: 0;
        right: 0;
        border-radius: 50%;
        border: 1px solid #c5c5c5;
        background: rgba(0,0,0,.4);
    }
</style>