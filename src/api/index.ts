import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const resdata = response.data;
    if (resdata.code >= 0) {
        return resdata;
    } else {
        return Promise.reject(new Error(resdata.msg));
    }
  },
  error => {
    console.log('err' + error);
    return Promise.reject(error);
  }
);

export default service;