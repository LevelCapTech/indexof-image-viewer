<template>
  <div class="back-button-container">
    <button class="back-button" @mouseenter="isHovered = true" @mouseleave="isHovered = false" @click="goBack"
      :class="{ 'hovered': isHovered }">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const isHovered = ref(false);

    const goBack = () => {
      window.history.back();
    };

    return {
      isHovered,
      goBack
    };
  }
};
</script>

<style scoped>
.back-button-container {
  /* 上位要素の相対位置にする */
  position: relative;
  bottom: 94px;
  left: 24px;
  z-index: 1000;
}

.back-button {
  border-radius: 9999px;
  padding: 12px;
  background-color: #f0f0f0;
  transition: background-color 0.2s, transform 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0.3;
}

.back-button.hovered {
  background-color: #e0e0e0;
  transform: translateX(-2px);
  opacity: 0.7;
}
</style>
