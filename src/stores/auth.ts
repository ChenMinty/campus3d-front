// src/stores/auth.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const userId = ref('');
  const username = ref('');

  const login = (id: string, name: string) => {
    isLoggedIn.value = true;
    userId.value = id;
    username.value = name;
  };

  const logout = () => {
    isLoggedIn.value = false;
    userId.value = '';
    username.value = '';
  };

  return { isLoggedIn, userId, username, login, logout };
});