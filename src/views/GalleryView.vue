<template>
    <swiper
      :slides-per-view="1.5"
      :space-between="10"
      :centered-slides="true"
      :navigation="true"
      :pagination="{ clickable: true }"
      :loop="true"
    >
      <swiper-slide v-for="(image, index) in images" :key="index">
        <img :src="image" @click="viewImage(index)" class="slide-image" />
      </swiper-slide>
    </swiper>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
//import 'swiper/css/navigation';
import 'swiper/css/pagination';

const router = useRouter();

const images = [
  'http://192.168.10.85/sd/img/103182_0/103182_0_0_10.png',
  'http://192.168.10.85/sd/img/103182_0/103182_0_0_11.png',
];

const viewImage = (index: number) => {
  router.push(`/image/${index}`);
};
</script>

<style scoped>
.slide-image {
  width: 100%;
  height: auto;
  cursor: pointer;
}
</style>
