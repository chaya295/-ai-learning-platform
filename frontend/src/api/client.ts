import axios from 'axios';
import { API_URL } from '../config';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('⚙️ Axios baseURL:', api.defaults.baseURL);

// Add JWT token to requests
api.interceptors.request.use((config) => {
  console.log('📤 Request:', config.method?.toUpperCase(), config.url, 'baseURL:', config.baseURL);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401/403 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (phone: string, password: string) => api.post('/auth/login', { phone, password }),
};

export const usersApi = {
  create: (data: { name: string; phone: string; password: string }) => api.post('/users', data),
  getAll: (params?: { search?: string; sortBy?: string }) => api.get('/users', { params }),
  getOne: (id: number) => api.get(`/users/${id}`),
};

export const categoriesApi = {
  getAll: () => api.get('/categories'),
  seed: () => api.post('/categories/seed'),
};

export const promptsApi = {
  create: (data: { userId: number; categoryId: number; subCategoryId: number; prompt: string }) =>
    api.post('/prompts', data),
  getAll: () => api.get('/prompts'),
  getByUser: (userId: number) => api.get(`/prompts/user/${userId}`),
};

export default api;
