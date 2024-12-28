<template>
  <div id="grid_wrapper">
    <div v-for="(item, index) in 20" :key="index" class="grid_item">
      <ItemCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemCard from '../components/ItemCard.vue';

// 画像一覧
const images = [
  'http://192.168.10.85/sd/img/103182_0/103182_0_0_10.png',
  'http://192.168.10.85/sd/img/103182_0/103182_0_0_11.png',
];

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
