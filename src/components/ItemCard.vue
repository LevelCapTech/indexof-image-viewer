<template>
  <a @click="handleClick(model_id)"><img :src="image_url" ref="gridWrapper" /></a>
</template>

<script setup lang="ts">
// import { ref } from 'vue';

defineProps<{
  image_url: string;
  model_id: string;
}>();
const emit = defineEmits(['emit_click']);

// const gridWrapper = ref<HTMLElement | null>(null); // 親コンテナの参照

const handleClick = (model_id: string) => {
  // if (gridWrapper.value) {
  //   const wrapperRect = gridWrapper.value.getBoundingClientRect();
  //   console.log('Wrapper位置:', wrapperRect); // 親コンテナの位置情報
  // }
  emit('emit_click', model_id);
};

</script>

<style scoped>
img {
   object-fit: cover; /* IE: not support */
   width: 100%;
}
</style>
