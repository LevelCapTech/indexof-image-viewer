<template>
  <a @click="viewImage(model_id)"><img :src="image_url" /></a>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

defineProps<{
  image_url: string;
  model_id: string;
}>();

// 画像表示イベント
const viewImage = (model_id: string) => {
  router.push(`/txt2img/${model_id}`);
};
</script>

<style scoped>
img {
   object-fit: cover; /* IE: not support */
   width: 100%;
}
</style>
