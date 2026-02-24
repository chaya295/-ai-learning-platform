export const API_URL = 
  process.env.REACT_APP_API_URL || 
  (window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://ai-learning-backend-707v.onrender.com');
