<template>

  <swiper
    :slides-per-view="1"
    :navigation="true"
    :pagination="{ clickable: true }"
    :keyboard="true"
    :loop="true"
    @swiper="onSwiper"
  >
    <swiper-slide v-for="(image, index) in images" :key="index">
      <img :src="image" alt="Image" class="image-slide"/>
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
//import 'swiper/css/navigation';　// 邪魔だからコメントアウト
import 'swiper/css/pagination';

defineProps<{ images: string[] }>();
const onSwiper = (swiper: any) => {
  console.log('Swiper initialized', swiper);
};
</script>

<style scoped>
/*
.image-slide {
  width: 100%;
  height: auto;
}
  */

.swiper,
.swiper-container,
.swiper-slide {
   height: 100vh;
}
img.image-slide {
   object-fit: cover; /* IE: not support */
   width: 100%;
   height: 100vh;
}
</style>
