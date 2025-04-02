<template>
  <div class="auth-container">
    <h2>登录</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="id">学工号</label>
        <input
            type="text"
            id="id"
            v-model="loginForm.userId"
            required
            placeholder="请输入学工号"
        />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input
            type="password"
            id="password"
            v-model="loginForm.password"
            required
            placeholder="请输入密码"
        />
      </div>
      <button type="submit" class="submit-btn">登录</button>
    </form>
    <p class="auth-switch">
      还没有账号？
      <router-link to="/register">立即注册</router-link>
    </p>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { login } from '@/api/userAPI'
import { useMessage } from 'naive-ui'

const router = useRouter();
const authStore = useAuthStore();
const messager = useMessage();

const loginForm = ref({
  userId: '',
  password: ''
})
const errorMessage = ref('');

const handleLogin = async() => {
  console.log('登录信息:', loginForm.value)
  try{
    const response = await login(loginForm.value);
    const {userId, token, username} = response.data;
    authStore.login(userId, token, username);
    messager.success('登陆成功');
    router.push('/home');
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = '未知错误，请稍后重试';
    }
    messager.error(errorMessage.value);
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: #3aa876;
}

.auth-switch {
  text-align: center;
  margin-top: 1rem;
  color: #666;
}

.auth-switch a {
  color: #42b983;
  text-decoration: none;
}

.auth-switch a:hover {
  text-decoration: underline;
}
</style>