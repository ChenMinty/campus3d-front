<template>
  <div class="auth-container">
    <h2>注册</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="id">学工号</label>
        <input
            type="text"
            id="id"
            v-model="registerForm.id"
            required
            placeholder="请输入学工号"
        />
      </div>
      <div class="form-group">
        <label for="username">用户名</label>
        <input
            type="text"
            id="username"
            v-model="registerForm.username"
            required
            placeholder="请输入用户名"
        />
      </div>
      <div class="form-group">
        <label for="email">邮箱</label>
        <input
            type="email"
            id="email"
            v-model="registerForm.email"
            required
            placeholder="请输入邮箱"
        />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input
            type="password"
            id="password"
            v-model="registerForm.password"
            required
            placeholder="请输入密码"
        />
      </div>
      <button type="submit" class="submit-btn">注册</button>
    </form>
    <p class="auth-switch">
      已有账号？
      <router-link to="/login">立即登录</router-link>
    </p>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()

const registerForm = ref({
  id: '',
  username: '',
  email: '',
  password: ''
})

const handleRegister = () => {
  // 这里应该替换为实际的注册API调用
  console.log('注册信息:', registerForm.value)
  // 模拟注册成功
  alert('注册成功!')
  router.push('/login')
}
</script>

<style scoped>
/* 样式与LoginView相同，可以提取到公共CSS文件中 */
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