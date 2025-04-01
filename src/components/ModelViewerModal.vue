<template>
  <n-modal
      v-model:show="isVisible"
      preset="card"
      :title="title"
      :bordered="false"
      size="small"
      class="model-viewer-modal"
      @after-enter="initViewer"
      @after-leave="handleCleanup"
  >
    <div ref="container" id="viewer-container" class="viewer-container">
      <!-- Canvas 将在这里渲染 -->
    </div>

    <template #footer>
      <n-space justify="end">
        <n-button type="primary" @click="isVisible = false">关闭</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {NModal, NButton, NSpace} from 'naive-ui'
import {Viewer} from '@mkkellogg/gaussian-splats-3d'
import * as THREE from 'three'

const props = defineProps({
  modelPath: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: '3D模型预览'
  },
  autoShow: { // 是否加载后自动显示
    type: Boolean,
    default: true
  }
})

const isVisible = ref(false)
let viewer: Viewer | null = null

// 初始化查看器
const initViewer = async () => {
  // 清理旧实例
  if (viewer) {
    viewer.dispose()
  }

  const renderer = new THREE.WebGLRenderer({
    powerPreference: "high-performance",
    antialias: false,
    alpha: true
  });

  const container = document.getElementById('viewer-container');
  if (!container) {
    console.error('未找到容器元素');
    return;
  }
  const { width, height } = container.getBoundingClientRect();
  renderer.setSize(width, height);
  container?.appendChild(renderer.domElement);

  viewer = new Viewer({
    'renderer': renderer,
    'cameraUp': [0, -1, -0.6],
    'initialCameraPosition': [-1, -4, 6],
    'initialCameraLookAt': [0, 4, 0]
  })
  viewer.addSplatScene('/models/bonsai-7k-mini.splat', {
    'splatAlphaRemovalThreshold': 5,
    'showLoadingUI': true,
    'position': [0, 1, 0],
    'rotation': [0, 0, 0, 1],
    'scale': [1.5, 1.5, 1.5]
  })
      .then(() => {
        viewer.start();
      });
}

const handleCleanup = () => {
  viewer?.dispose();
}

// 暴露控制方法
defineExpose({
  open: () => {
    console.log('open')
    //   if (!viewer) initViewer()
    isVisible.value = true
  },
  close: () => {
    isVisible.value = false
  },
  getViewer: () => viewer
})

// 监听模型路径变化
watch(() => props.modelPath, (newPath) => {
  if (newPath) initViewer()
})
</script>

<style>
.model-viewer-modal {
  width: 70%;
  max-width: 1200px;
}

.viewer-container {
  width: 100%;
  height: 70vh;
  min-height: 500px;
  position: relative;
}

:deep(.splat-canvas) {
  position: absolute !important;
  width: 100% !important;
  height: 100% !important;
  left: 0 !important;
  top: 0 !important;
  background: #f0f0f0;
}
</style>