// API URL configuration
const getApiUrl = () => {
  const envUrl = process.env.REACT_APP_API_URL?.trim();
  
  // If we have a valid environment variable, use it
  if (envUrl && envUrl.length > 0) {
    return envUrl;
  }
  
  // Default to production backend URL
  return 'https://ai-learning-backend-39cv.onrender.com';
};

export const API_URL = getApiUrl();

console.log('🔗 API URL:', API_URL);
