<template>
  <div class="image-view">
    <BackButton />
    <ImageSwiper :images="images"/>
  </div>
</template>

<script setup lang="ts">
  //import { useRoute } from 'vue-router';
  import ImageSwiper from '../components/ImageSwiper.vue';
  import BackButton from '../components/BackButton.vue';

  //const route = useRoute();
  // const id = parseInt(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id);

  const images = [
    'http://192.168.10.85/sd/img/103182_0/103182_0_0_10.png',
    'http://192.168.10.85/sd/img/103182_0/103182_0_0_11.png'
  ];

  // idの範囲チェック
  // const currentIndex = id >= 0 && id < images.length ? id : 0;
</script>

<style scoped>

.image-view {
  /*
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  */
  min-height: 100vh;
}
/*
.image-slide {
   object-fit: cover; /* IE: not support */
   /*
   width: 100%;
   height: 100vh;
}
*/
</style>
