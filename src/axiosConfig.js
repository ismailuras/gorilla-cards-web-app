import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.request.use(
  function (config) {
    config.headers.authorization = "Bearer " + localStorage.getItem("token");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const status = error.response.status;
    if (status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);
export default axios;
