import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const usersApi = {
  create: (data: { name: string; phone: string }) => api.post('/users', data),
  getAll: () => api.get('/users'),
  getOne: (id: number) => api.get(`/users/${id}`),
};

export const categoriesApi = {
  getAll: () => api.get('/categories'),
  seed: () => api.post('/categories/seed'),
};

export const promptsApi = {
  create: (data: { userId: number; categoryId: number; subCategoryId: number; prompt: string }) =>
    api.post('/prompts', data),
  getByUser: (userId: number) => api.get(`/prompts/user/${userId}`),
};

export default api;
