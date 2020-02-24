<template>
  <div class="home">
     <h3>多文件上传</h3>
    <div>
      <input type="file" accept=".png,.jpg" multiple @change="changeMultipleFiles" ref="files"/>
      <span v-if="files.length">{{files.length}}个文件</span>
      <button @click="uploadMultipleFiles">上传</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      file: {},
      files: [],
      name: ''
    }
  },
  methods: {
    changeMultipleFiles(e) {
      this.files = [...e.target.files]
      this.$refs.files.value = null;
    },
    uploadMultipleFiles() {
      if (!this.files.length) {
        alert('请选择文件');
        return;
      }
      const fd = new FormData();
      for(let i=0; i < this.files.length; i++) {
        fd.append('files', this.files[i])
      }
      fd.append('name', '123456')
      axios.post('/repair/file/uploadMutipleFiles', fd, {
        headers: {
          'content-type': 'application/form-data'
        }
      }).then(res => {
        window.console.log(res.data)
      })
    }
  }
}
</script>
