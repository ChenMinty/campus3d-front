<template>
  <div style="height: 100%; width: 100%; position: relative">
    <n-message-provider>
    <n-layout position="absolute">
      <n-layout-header style="height: 64px;" bordered>
        <div class="header-content">
          <div class="logo">
            <img src="@/assets/logo.svg" alt="Logo" height="40px"/>
            <span class="logo-text">Campus 3D</span>
          </div>
          <n-menu
              mode="horizontal"
              :options="menuOptions"
              :value="activeKey"
              @update:value="handleMenuSelect"
          />
          <n-dropdown trigger="click" :options="options" @select="handleSelect">
            <n-button strong secondary type="info">
              {{ authStore.isLoggedIn ? authStore.username : '未登录' }}
            </n-button>
          </n-dropdown>
        </div>
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px">
        <!-- <n-layout-sider bordered content-style="padding: 24px;">
          SiderHere
        </n-layout-sider> -->
        <n-layout content-style="padding: 24px;">
          <router-view/>
        </n-layout>
      </n-layout>
    </n-layout>
  </n-message-provider>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {NLayout, NLayoutHeader, NLayoutContent, NMenu, NMessageProvider, NDropdown, NButton} from 'naive-ui'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore();
const options = [
  {
    label: '退出登陆',
    key: 'logout'
  }
]

// 菜单选项
const menuOptions = [
  {
    label: '首页',
    key: '/home'
  },
  {
    label: '注册',
    key: '/register'
  },
  {
    label: '登陆',
    key: '/login'
  },
  {
    label: '测试',
    key: '/test'
  }
]

// 当前激活的菜单项
const activeKey = computed(() => route.path)

// 菜单选择处理
const handleMenuSelect = (key) => {
  router.push(key)
}

const handleSelect = (key) => {
  if(key === 'logout') {
    authStore.logout();
  }
}
</script>

<style scoped>
.header-content {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  margin-right: 40px;
}

.logo img {
  margin-right: 10px;
}

.logo-text {
  font-size: 24px;
  white-space: nowrap;
  font-weight: bold;
}

.n-layout-header {
  padding: 0 20px;
  height: 60px;
}

.n-layout-content {
  padding: 20px;
  min-height: calc(100vh - 60px);
  width: 100%;
}
</style>