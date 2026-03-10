describe('config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should use production URL in production', () => {
    process.env.NODE_ENV = 'production';
    const { API_URL } = require('./config');
    expect(API_URL).toBe('https://ai-learning-backend-707v.onrender.com');
  });

  it('should use environment variable in development', () => {
    process.env.NODE_ENV = 'development';
    process.env.REACT_APP_API_URL = 'https://api.example.com';
    const { API_URL } = require('./config');
    expect(API_URL).toBe('https://api.example.com');
  });

  it('should fallback to localhost when env var not set', () => {
    process.env.NODE_ENV = 'development';
    delete process.env.REACT_APP_API_URL;
    const { API_URL } = require('./config');
    expect(API_URL).toBe('http://localhost:3000');
  });
});

export {};
