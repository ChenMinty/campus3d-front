<script setup lang="ts">
import { ref } from 'vue'
import { NButton } from 'naive-ui'
import ModelViewerModal from '@/components/ModelViewerModal.vue'

const currentModel = ref('/models/bonsai-7k-mini.splat')
const viewerRef = ref(null)

const showModel = () => {
  viewerRef.value?.open()
}
</script>

<template>
  <main>
    <div>
    <n-button @click="showModel">3D Model Demo</n-button>
    
    <ModelViewerModal
      ref="viewerRef"
      :model-path="currentModel"
      title="3D模型预览"
    />
  </div>
  </main>
</template>
