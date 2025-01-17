<template>
  <div class="back-button-container">
    <FavoriteButton :model_id="props.model_id" />
    <BackButton />
  </div>
</template>

<style scoped>
.back-button-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  height: 120px;
  width: 60px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useProc } from '../composables/useProc';
import BackButton from './BackButton.vue';
import FavoriteButton from './FavoriteButton.vue';
const props = defineProps({
  model_id: {
    type: String,
    required: true,
  },
});
const isHovered = ref(false);

</script>
