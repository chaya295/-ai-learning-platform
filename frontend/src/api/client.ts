import axios from 'axios';

// Hard-coded backend URL so all API calls always go to the server.
const BACKEND_URL = 'https://ai-learning-backend-707v.onrender.com';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authApi = {
  login: (phone: string, password: string) =>
    axios.post(`${BACKEND_URL}/auth/login`, { phone, password }),
};

export const usersApi = {
  create: (data: { name: string; phone: string; password: string }) =>
    axios.post(`${BACKEND_URL}/users`, data, { headers: getAuthHeaders() }),
  getAll: (params?: { search?: string; sortBy?: string }) =>
    axios.get(`${BACKEND_URL}/users`, { params, headers: getAuthHeaders() }),
  getOne: (id: number) =>
    axios.get(`${BACKEND_URL}/users/${id}`, { headers: getAuthHeaders() }),
};

export const categoriesApi = {
  getAll: () =>
    axios.get(`${BACKEND_URL}/categories`, { headers: getAuthHeaders() }),
  seed: () =>
    axios.post(`${BACKEND_URL}/categories/seed`, {}, { headers: getAuthHeaders() }),
};

export const promptsApi = {
  create: (data: { userId: number; categoryId: number; subCategoryId: number; prompt: string }) =>
    axios.post(`${BACKEND_URL}/prompts`, data, { headers: getAuthHeaders() }),
  getAll: () =>
    axios.get(`${BACKEND_URL}/prompts`, { headers: getAuthHeaders() }),
  getByUser: (userId: number) =>
    axios.get(`${BACKEND_URL}/prompts/user/${userId}`, { headers: getAuthHeaders() }),
};

export default axios;
