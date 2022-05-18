import axios from 'axios';
let baseURL = process.env.API_URL2
  ? process.env.API_URL2
  : "https://somewhereinheroku.com/api/v1/";
let token;

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  function (config) {
    token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
