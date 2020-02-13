<template>
<div>
    <div class="editor">
        <div class="editor-body">
            <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="content" >
            </el-input>
        </div>
        <div class="editor-bottom">
            <button @click="selectPicture">图片</button>
            <input type="file" id="uploadImg" @change="uploadImg" multiple="multiple" style="display:none">
        </div>
    </div>
    <ul class="image-list-contianer">
        <li v-for="(item,key) in src" v-bind:key="key" class="image-container">
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
        src:[],
        isShow:false,
        content:'',
        forkImg:'http://localhost:8090/image/fork.png',
    }
  },
  methods:{
      selectPicture(){
        document.getElementById('uploadImg').click();
      },
      uploadImg(e) {
        let _this = this;
            let files = e.target.files;
            if (!e || !window.FileReader) return; // 看支持不支持FileReader
            for(let i=0,length=files.length;i<length;i++){
                let reader = new FileReader();
                reader.readAsDataURL(files[i]); // 这里是最关键的一步，转换就在这里
                reader.onloadend = function () {
                    _this.src.push(reader.result)
                    window.console.log(reader.result)
                }
            }
      },
      deleteImage(key){
          window.console.log(key)
          this.src.splice(key,1)
      }
  }
}
</script>
<style scoped>
    ul{
        list-style:none
    }
    .editor{
        padding: 2rem 2rem 0;
    }
    .image-list-contianer{
        display: flex;
        flex-direction: row;
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
    }
</style>