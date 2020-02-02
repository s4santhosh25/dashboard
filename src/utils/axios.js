import axiosAPI from 'axios';
// import store from '../store';

var axios = axiosAPI.create({
    // baseURL: 'http://localhost:5000/',
    baseURL: 'https://server---api.herokuapp.com/',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
axios.interceptors.request.use((config) => {
    // Do something before request is sent
    // store.dispatch({ type: 'REGISTER', payload: "register" })
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
    // Do something with response data
    return response;
}, (error) => {
    // Do something with response error
    return Promise.reject(error);
});

export default axios;