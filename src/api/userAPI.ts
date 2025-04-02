import service from './index';

// 登录请求
export const login = (data: { userId: string; password: string }) => {
  return service.post('/auth/login', data);
};

// 注册请求
export const register = (data: { id: string; username: string; email: string; password: string }) => {
  return service.post('/auth/register', data);
};

// Jwt测试请求
export const test = () => {
  return service.get('/auth/test');
}