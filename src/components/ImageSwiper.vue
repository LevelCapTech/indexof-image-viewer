<template>
  <div class="myswiper" v-for="(image, index) in images" :key="index">
        <img :src="image" alt="Image" class="image-slide"/>
  </div>
</template>

<script setup lang="ts">
//import { Swiper, SwiperSlide } from 'swiper/vue';
//import 'swiper/css';
//import 'swiper/css/navigation';
//import 'swiper/css/pagination';

defineProps<{ images: string[] }>();
/*
const onSwiper = (swiper: any) => {
  //console.log('Swiper initialized', swiper);
};
*/
</script>

<style scoped>
.image-slide{
  /*object-fit: cover;*/
  width: 100%;
}
/*
.swiper,
.swiper-container,
.swiper-slide {
   height: 100vh;
}
   
img.image-slide {
   object-fit: cover;
   width: 100%;
   height: 100vh;
}
*/

.myswiper{
  object-fit: cover;
   width: 100%;
   height: 100vh;
}

</style>
