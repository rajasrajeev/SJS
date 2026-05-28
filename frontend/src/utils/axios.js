import axios from 'axios';
import history from './history';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  timeout: 30000,
  headers: {
    Authorization: localStorage.getItem('access_token')
      ? 'Bearer ' + localStorage.getItem('access_token')
      : null,
    accept: 'application/json',
    'ngrok-skip-browser-warning': '69420', // Remove for production
  },
});

// ✅ FIX: Lazy-load store inside interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const { default: store } = await import('../utils/store');
    const state = store.getState();
    const selectedMonth = state.month?.selectedMonth;
    if (selectedMonth) {
      config.params = config.params || {};
      config.params.month = selectedMonth;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const setNull = (inst) => {
  localStorage.clear();
  inst.defaults.headers['Authorization'] = null;
  history.replace('/');
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (typeof error.response === 'undefined') {
      console.log('Connection timeout or server not responding');
    }

    if (error.response?.status === 401) {
      setNull(axiosInstance);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
