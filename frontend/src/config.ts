// Use environment variable or fallback to hardcoded URL
export const API_URL = process.env.REACT_APP_API_URL || 'https://ai-learning-backend-707v.onrender.com';

console.log('🔗 API URL:', API_URL);
console.log('🌍 Environment:', process.env.NODE_ENV);
console.log('📝 REACT_APP_API_URL:', process.env.REACT_APP_API_URL);