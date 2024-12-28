<template>
  <div class="home-view">
    <h1>メインメニュー</h1>
    <button @click="$router.push('/list')">ビューア起動</button>

    <p>Welcome to the Home page!</p>
    <!-- カウンター -->
    <p>Count: {{ count }}</p>
    <button @click="incrementCounter">Click Me!</button>

    <HelloWorld msg="Vite + Vue" />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
import { ref } from 'vue';

// リアクティブな変数
const count = ref(0);

// 関数
const incrementCounter = () => {
  count.value++;
};
</script>

<style scoped>
.home-view {
  text-align: center;
  padding: 20px;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #4caf50;
  color: white;
}
</style>
