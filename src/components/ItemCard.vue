<template>
  <a @click="viewImage(index)"><img src="http://192.168.10.85/sd/img/103182_0/103182_0_0_10a.png" /></a>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const index = 0;
// 画像表示イベント
const viewImage = (index: number) => {
  router.push(`/image/${index}`);
};
</script>

<style scoped>
img {
   object-fit: cover; /* IE: not support */
   width: 100%;
}
</style>
