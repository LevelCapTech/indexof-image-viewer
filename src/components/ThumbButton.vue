<template>
    <button class="back-button" @mouseenter="isHovered = true" @mouseleave="isHovered = false" @click="goThumbnail"
      :class="{ 'hovered': isHovered }">
      <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 15L16 10L5 21"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
    </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProc } from '../composables/useProc';
const props = defineProps({
  pkey: {
    type: Number,
    required: true,
  },
  model_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
const { thumbImage } = useProc();
// 例）propsの中身
// {pkey: 0, model_id: '147921_0', url: 'http://192.168.10.85/sd/img/147921_0/147921_0_88nude_0_0.png'}
const isHovered = ref(false);
const goThumbnail = () => {
  // 結果がtrueの時のみemit('emit_delete', props.pkey);する
  thumbImage(props.model_id, props.url).then((result) => {
    if (!result) {
      alert('サムネイル設定に失敗しました');
    }
  });
};
</script>
<style scoped>
.back-button {
  border-radius: 9999px;
  padding: 12px;
  background-color: #3652f05d;
  transition: background-color 0.2s, transform 0.2s;
  box-shadow: 0 4px 6px rgb(133, 133, 133);
  opacity: 0.4;
  /* 不透明度を上げる */
}

.back-button.hovered {
  background-color: #3652f05d;
  transform: translateX(-2px);
  opacity: 0.7;
}
</style>
