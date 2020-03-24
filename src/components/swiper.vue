<template>
  <div class="swiper-container">
    <swiper :options="swiperOption" ref="mySwiper">
     <!-- <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div> -->
      <!-- slides -->
        <swiper-slide v-for="(item,index) in imageList" :key="index" >
            <div class="ss">
                <div class="image">
                    <img :src="item|addImagePrefix" style="width:250px;height:250px"/>
                </div>
            </div>
        </swiper-slide>
      
      <!-- Optional controls -->
      <div class="swiper-pagination "  slot="pagination" v-if="imageList.length!=1"></div>
      <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper> 
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'  
export default {
  name: 'myswiper',
  components: {  
      swiper,  
      swiperSlide  
  },
  mounted(){
      //可以使用swiper这个对象去使用swiper官网中的那些方法  
    //  window.console.log('this is current swiper instance object', this.swiper);
      // this.swiper.slideTo(0, 0, false);
  },
  data () {
    return {
       swiperOption: {  
          notNextTick: true,
          //循环
          loop:true,
          //设定初始化时slide的索引
          initialSlide:0,
          //自动播放
          autoplay:false,
          // autoplay: {
          //     delay: 3000,
          //     stopOnLastSlide: false,
          //     disableOnInteraction: true,
          // },
          // 设置轮播
          effect : 'flip',
          //滑动速度
          speed:20,
          //滑动方向
          direction : 'horizontal',
          //小手掌抓取滑动
          // grabCursor : true,
          //滑动之后回调函数
          on: {
              slideChangeTransitionEnd: function(){
                // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
              },
          },
          //左右点击
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },
          //分页器设置         
          pagination: {
              el: '.swiper-pagination',
              clickable :true
          }
        },
        swiperSlides: [1, 2, 3, 4]
    }
  },
  computed: {  
      
    swiper() {  
      return this.$refs.mySwiper.swiper;  
    }  
  }, 
  props:{
    imageList:Array
  }, 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.swiper-slide{
  height:200px;
}
.ss{
    
    /* margin: auto; */
}
.image{
    width: 300px;
    height: 300px;
    margin: auto;
    padding-bottom: 20px;
}
</style>