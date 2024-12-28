<template>
  <div id="grid_wrapper" v-if="isImageSwiperLoaded">
    <div v-for="(item, index) in dirs" :key="index" class="grid_item">
      <ItemCard :image_url="item.image_url" :model_id="item.model_id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemCard from '../components/ItemCard.vue';
import { useFileList } from '../composables/useFileList';
import { ref, onMounted } from 'vue';

// useFileListからimagesとfetchFileListを取得
const { dirs, fetchDirList } = useFileList();

// ImageSwiperのロード状態を管理するフラグ
const isImageSwiperLoaded = ref(false);

// 画像一覧
// const images = [
//   'http://192.168.10.85/sd/img/103182_0/103182_0_0_10.png',
//   'http://192.168.10.85/sd/img/103182_0/103182_0_0_11.png',
// ];


// マウント時にファイルリストを取得し、ImageSwiperをロード
onMounted(async () => {
  await fetchDirList('/sd/img/');
  isImageSwiperLoaded.value = true;
});

</script>

<style scoped>
/* グリッドの親コンテナ */
#grid_wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 横2列 */
  gap: 0px;

  /* 縦スクロール可能 */
  height: 100vh;
  overflow-y: scroll;

  /* スクロールスナップ設定 */
  scroll-snap-type: y mandatory;
}

/* グリッドアイテム設定 */
.grid_item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  background-color: #f0f0f0;
  border: 0px solid #000;

  /* 高さ固定 */
  height: 400px;

  /* スクロールスナップポイント */
  scroll-snap-align: start;
}
</style>
