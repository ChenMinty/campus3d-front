<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { test } from '@/api/userAPI';
import { NButton } from 'naive-ui';
const msg = ref('未通过验证');

const handleClick = async() => {
    try{
        const response = await test();
        msg.value = response.data;
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
  <main>
    <div>
        <n-button @click="handleClick">
            {{ msg }}
        </n-button>
    </div>
  </main>
</template>
