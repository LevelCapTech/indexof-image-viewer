<template>
  <div class="home-view">
    <h1>メインメニュー</h1>
    <button @click="$router.push('/txt2img')">ビューア起動</button>

    <hr />
    <button @click="handleClick()">初回バッチ起動</button>
    <hr />

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
import { useProc } from '../composables/useProc';

const { fetchProc1List } = useProc();

// リアクティブな変数
const count = ref(0);

// 関数
const incrementCounter = () => {
  count.value++;
};

const handleClick = () => {
  fetchProc1List();
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
