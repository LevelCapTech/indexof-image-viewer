<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <!-- ルートビューを表示 -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
nav {
  display: flex;
  gap: 15px;
  padding: 10px;
  background-color: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

nav a {
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  color: #333;
}

nav a.router-link-exact-active {
  background-color: #4caf50;
  color: white;
}
</style>
