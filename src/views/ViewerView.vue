<template>
  <div class="image-view">
    <BackButton />
    <ImageSwiper v-if="isImageSwiperLoaded" :images="files" :model_id="model_id"/>
  </div>
</template>

<script setup lang="ts">
  import ImageSwiper from '../components/ImageSwiper.vue';
  import BackButton from '../components/BackButton.vue';
//  import FavButton from '../components/FavButton.vue';
  import { useFileList } from '../composables/useFileList';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  // useFileListからimagesとfetchFileListを取得
  const { files, fetchFileList } = useFileList();
  // ImageSwiperのロード状態を管理するフラグ
  const isImageSwiperLoaded = ref(false);
  
  const route = useRoute();
  const model_id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

  // const images2 = [
  //   'http://192.168.10.85/sd/img/103182_0/103182_0_0_10.png',
  //   'http://192.168.10.85/sd/img/103182_0/103182_0_0_11.png'
  // ];

  // マウント時にファイルリストを取得し、ImageSwiperをロード
  onMounted(async () => {
    await fetchFileList('/sd/img/' + model_id + '/');
    isImageSwiperLoaded.value = true;
  });

  // idの範囲チェック
  // const currentIndex = id >= 0 && id < images.length ? id : 0;
</script>

<style scoped>

.image-view {
  min-height: 100vh;
}
</style>
