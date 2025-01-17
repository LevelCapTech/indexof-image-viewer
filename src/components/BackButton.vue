<template>
    <button
      class="back-button"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      @click="goBack"
      :class="{ 'hovered': isHovered }"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 4L7 12L15 20"
          stroke="#333333"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
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
