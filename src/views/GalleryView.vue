<template>
  <div id="grid_wrapper" v-if="isImageSwiperLoaded">
    <div v-for="(item, index) in dirs" :key="index" :id="'model-' + item.model_id" class="grid_item">
      <ItemCard :image_url="item.image_url" :model_id="item.model_id" @emit_click="onClickCard" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemCard from '../components/ItemCard.vue';
import { useFileList } from '../composables/useFileList';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();

// useFileListからimagesとfetchFileListを取得
const { dirs, fetchDirList2 } = useFileList();

// ImageSwiperのロード状態を管理するフラグ
const isImageSwiperLoaded = ref(false);

const onClickCard = (model_id: string) => {
  // console.log('model_id:', model_id);
  // sessionStorageにモデルIDを保存
  sessionStorage.setItem('model_id', model_id);
  router.push(`/txt2img/${model_id}`);
};
const route = useRoute();
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

// 画像一覧
// const images = [
//   'http://192.168.10.85/sd/img/103182_0/103182_0_0_10.png',
//   'http://192.168.10.85/sd/img/103182_0/103182_0_0_11.png',
// ];

// マウント時にファイルリストを取得し、ImageSwiperをロード
onMounted(async () => {
  await fetchDirList2(parseInt(id));
  isImageSwiperLoaded.value = true;
  
  // モデルIDがある場合、スクロール位置を調整
  setTimeout(() => {
    const model_id = sessionStorage.getItem('model_id');
    if (model_id) {
      const target = document.getElementById('model-' + model_id);
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }
  }, 0);
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
