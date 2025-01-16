<template>
  <div class="back-button-container">
    <TrashButton @emit_delete="onDelete" :pkey="props.pkey" :model_id="props.model_id" :url="props.url" />
    <ThumbButton :pkey="props.pkey" :model_id="props.model_id" :url="props.url" />
  </div>
</template>

<style scoped>
.back-button-container {
  position: absolute;
  bottom: 24px;
  left: 24px;
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
import TrashButton from './TrashButton.vue';
import ThumbButton from './ThumbButton.vue';
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
// 例）propsの中身
// {pkey: 0, model_id: '147921_0', url: 'http://192.168.10.85/sd/img/147921_0/147921_0_88nude_0_0.png'}
const emit = defineEmits(['emit_delete']);
const isHovered = ref(false);
const onDelete = (pkey: number) => {
  emit('emit_delete', props.pkey);
};

</script>
