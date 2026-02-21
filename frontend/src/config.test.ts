describe('config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should use environment variable when set', () => {
    process.env.REACT_APP_API_URL = 'https://api.example.com';
    const { API_URL } = require('./config');
    expect(API_URL).toBe('https://api.example.com');
  });

  it('should fallback to localhost when env var not set', () => {
    delete process.env.REACT_APP_API_URL;
    const { API_URL } = require('./config');
    expect(API_URL).toBe('http://localhost:3000');
  });
});

export {};
