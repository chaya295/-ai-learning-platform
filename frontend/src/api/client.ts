import axios from 'axios';

// For this project we hard-code the backend URL so that
// the frontend always calls the correct server in production.
const api = axios.create({
  baseURL: 'https://ai-learning-backend-707v.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

console.log('✅ Axios configured with baseURL:', api.defaults.baseURL);

// Add JWT token to requests
api.interceptors.request.use((config) => {
  console.log('📤 Request to:', (config.baseURL || '') + (config.url || ''));
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401/403 errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response from:', (response.config.baseURL || '') + (response.config.url || ''));
    return response;
  },
  (error) => {
    console.error('❌ Error from:', error.config?.url, error.response?.status, error.message);
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
