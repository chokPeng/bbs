<template>
<div style="height:100%">
    <router-view></router-view>
</div>
</template>
<script>
export default {
  name: 'app',
}
</script>
<style>
html{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.05);
}
body{
  margin:0px;
  height: 100%;
  /* text-align: center; */
}
a {
    text-decoration: none;
    color:#909090
}
/*正常的未被访问过的链接*/
a:link {
    text-decoration: none;
}
/*已经访问过的链接*/
a:visited {
    text-decoration: none;
}
/*鼠标划过(停留)的链接*/
a:hover {
    text-decoration: none;
}
/* 正在点击的链接*/
a:active {
    text-decoration: none;
}
ul{
  list-style: none;
}
</style>
