<template>
  <div class="myswiper" v-for="(image, index) in props.images" :key="index">
    <imageButtonBox @emit_delete="onDelete" :pkey="index" :model_id="props.model_id" :url="image" />
    <img :src="image" alt="Image" class="image-slide" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
//import { Swiper, SwiperSlide } from 'swiper/vue';
//import 'swiper/css';
//import 'swiper/css/navigation';
//import 'swiper/css/pagination';
import imageButtonBox from './imageButtonBox.vue';

const props = defineProps<{ model_id: string; images: string[] }>();

/*
const onSwiper = (swiper: any) => {
  //console.log('Swiper initialized', swiper);
};
*/

const onDelete = (pkey: number) => {
  // 親コンポーネントから渡された onDelete を呼び出す
  props.images.splice(pkey, 1); // 配列を操作
};

</script>

<style scoped>
.image-slide {
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

.myswiper {
  position: relative;
  object-fit: cover;
  width: 100%;
  height: 100vh;
}
</style>
