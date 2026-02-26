import api from './client';
import MockAdapter from 'axios-mock-adapter';
import { authApi, usersApi, categoriesApi, promptsApi } from './client';

const mock = new MockAdapter(api);

describe('API Client', () => {
  beforeEach(() => {
    mock.reset();
    localStorage.clear();
  });

  describe('authApi', () => {
    it('should login successfully', async () => {
      const mockResponse = { token: 'test-token', user: { id: 1 } };
      mock.onPost('https://ai-learning-backend-707v.onrender.com/auth/login').reply(200, mockResponse);

      const response = await authApi.login('1234567890', 'password');
      expect(response.data).toEqual(mockResponse);
    });
  });

  describe('usersApi', () => {
    it('should create user', async () => {
      const userData = { name: 'Test', phone: '1234567890', password: 'pass' };
      mock.onPost('https://ai-learning-backend-707v.onrender.com/users').reply(201, { id: 1, ...userData });

      const response = await usersApi.create(userData);
      expect(response.status).toBe(201);
    });

    it('should get all users', async () => {
      mock.onGet('https://ai-learning-backend-707v.onrender.com/users').reply(200, []);
      const response = await usersApi.getAll();
      expect(response.data).toEqual([]);
    });
  });

  describe('categoriesApi', () => {
    it('should get all categories', async () => {
      mock.onGet('https://ai-learning-backend-707v.onrender.com/categories').reply(200, []);
      const response = await categoriesApi.getAll();
      expect(response.data).toEqual([]);
    });
  });

  describe('promptsApi', () => {
    it('should create prompt', async () => {
      const promptData = { userId: 1, categoryId: 1, subCategoryId: 1, prompt: 'test' };
      mock.onPost('https://ai-learning-backend-707v.onrender.com/prompts').reply(201, { id: 1, ...promptData });

      const response = await promptsApi.create(promptData);
      expect(response.status).toBe(201);
    });
  });
});
