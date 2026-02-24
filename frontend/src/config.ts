const isDevelopment = window.location.hostname === 'localhost';
const productionUrl = 'https://ai-learning-backend-707v.onrender.com';
const developmentUrl = 'http://localhost:3000';

export const API_URL = isDevelopment ? developmentUrl : productionUrl;

console.log('🌐 Environment:', isDevelopment ? 'Development' : 'Production');
console.log('🔗 API URL:', API_URL);