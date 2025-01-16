<template>
    <button class="back-button" @mouseenter="isHovered = true" @mouseleave="isHovered = false" @click="goTrash"
      :class="{ 'hovered': isHovered }">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
          stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
const { deleteImage } = useProc();
// 例）propsの中身
// {pkey: 0, model_id: '147921_0', url: 'http://192.168.10.85/sd/img/147921_0/147921_0_88nude_0_0.png'}
const emit = defineEmits(['emit_delete']);
const isHovered = ref(false);
const goTrash = () => {
  // 結果がtrueの時のみemit('emit_delete', props.pkey);する
  deleteImage(props.model_id, props.url).then((result) => {
    if (result) {
      emit('emit_delete', props.pkey);
    } else {
      alert('画像削除に失敗しました');
    }
  });
};
</script>

<style scoped>
.back-button {
  border-radius: 9999px;
  padding: 12px;
  background-color: #757474da;
  transition: background-color 0.2s, transform 0.2s;
  box-shadow: 0 4px 6px rgb(133, 133, 133);
  opacity: 0.5;
  /* 不透明度を上げる */
}


.back-button.hovered {
  background-color: #757474da;
  transform: translateX(-2px);
  opacity: 0.7;
}
</style>
