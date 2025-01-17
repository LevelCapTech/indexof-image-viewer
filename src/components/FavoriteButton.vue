<template>
    <button class="back-button" @mouseenter="isHovered = true" @mouseleave="isHovered = false" @click="goFavorite"
      :class="{ 'hovered': isHovered }">
      <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
        <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
    </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProc } from '../composables/useProc';
const props = defineProps({
  model_id: {
    type: String,
    required: true,
  },
});
const { thumbImage } = useProc();
const router = useRouter(); // vue-router をインポートして使用
// 例）propsの中身
// {pkey: 0, model_id: '147921_0', url: 'http://192.168.10.85/sd/img/147921_0/147921_0_88nude_0_0.png'}
const isHovered = ref(false);
const goFavorite = () => {
  console.log('goFavorite');
  router.push({
    name: 'editor_favorite', // 遷移先の名前付きルートを指定
    query: { model_id: props.model_id }, // クエリパラメータに model_id を渡す
  });
};
</script>
<style scoped>
.back-button {
  border-radius: 9999px;
  padding: 12px;
  background-color: #edf0365d;
  transition: background-color 0.2s, transform 0.2s;
  box-shadow: 0 4px 6px rgb(133, 133, 133);
  opacity: 0.4;
  /* 不透明度を上げる */
}

.back-button.hovered {
  background-color: #edf0365d;
  transform: translateX(-2px);
  opacity: 0.7;
}
</style>
