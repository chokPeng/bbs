<template>
 <div class="edit_container">
  <quill-editor 
   v-model="content"
   :options="editorOption"
   @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
   @change="onEditorChange($event)">
  </quill-editor>
 </div>
</template>
<script>
export default {
    name: 'richText',
    data(){
        return {
            content: '',
            editorOption: {},
        }
    },
    mounted(){
        //this.getRichText()
    },
    methods: {
        onEditorReady() {},
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        getRichText(){
            this.$http.get('http://localhost:8090/richText',{
                params:{
                    id:23
                }
            }
            ).then((res)=>{
                window.console.log(res)
                this.ss=res.data.data
            })
        },
        saveHtml(){
          
        }
    }
}
</script>
 
<style>
#app {
 font-family: 'Avenir', Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 text-align: center;
 color: #2c3e50;
 margin-top: 60px;
}
</style>