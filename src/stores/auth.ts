// src/stores/auth.ts
import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const userId = ref('');
  const username = ref('');

  const login = (id: string, token: string, name: string) => {
    isLoggedIn.value = true;
    userId.value = id;
    username.value = name;
    localStorage.setItem('token', token);
    localStorage.setItem('username', name);
  };

  const logout = () => {
    isLoggedIn.value = false;
    userId.value = '';
    username.value = '';
    localStorage.removeItem('token');
    localStorage.removeItem('username');

  };

  onMounted(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token) {
      isLoggedIn.value = true;
      username.value = storedUsername || '';
    }
  });

  return { isLoggedIn, userId, username, login, logout };
});