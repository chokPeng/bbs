<template>
<div>
    <!-- <ul v-for="item in followers" v-bind:key="item.userId">
        <li><authorInfoBox :author="item"></authorInfoBox></li>
    </ul>
    <soan>follower</soan> -->
    <h1>hello,this is follower</h1>
</div>
</template>
<script>
//import AuthorInfoBox from '../components/userInfo/authorInfoBox'
// export default {
//     name:'follower',
//     data(){
//         return{
//             followers:[],
//         }
//     },
//     mounted(){
//         this.getFollowers()
//     },
//     methods:{
//         getFollowers(){
//             this.$api.getFollowers(123456).then((res)=>{
//                 window.console.log(res.data)
//                 this.followers=res.data.data
//             })
//         }
//     },
//     components:{
//         'authorInfoBox':AuthorInfoBox
//     }
// }
</script>