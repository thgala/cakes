import axios from 'axios';

const
  axiosInstance = axios.create({
    baseURL: APP_CONFIG.apiUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  });

window.axios = axiosInstance;

export default axiosInstance;