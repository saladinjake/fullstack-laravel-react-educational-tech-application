import axios from 'axios';

// set base url for production or dev
let baseURL = process.env.API_URL2
  ? process.env.API_URL2
  : "https://somewhereinheroku.com/api/v1/";
let token;



/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: Axios configuration file
*@params:
*@Methods: get, post, put, patch, delete 
*@usage: axios.get(url); axios.put(url,data); axios.post(url,data)...
*/

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//create axios instance
const instance = axios.create({
  baseURL,
});


// intercept request before they are sent
instance.interceptors.request.use(
  function (config) {
    // check if token exists in the request header or set it if user is authenticated
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
