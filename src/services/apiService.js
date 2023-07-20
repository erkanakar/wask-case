import axios from 'axios';

const baseURL = 'https://api.wask.co/';
const apiService = axios.create({
    baseURL,
    timeout: 10000,
});

function addHeaders(headers) {
    if (headers) {
        Object.keys(headers).forEach((key) => {
            apiService.defaults.headers.common[key] = headers[key];
        });
    }
}

function get(url, params = {}, headers = {}) {
    addHeaders(headers);

    return apiService.get(url, { params });
}

function post(url, data = {}, headers = {}) {
    addHeaders(headers);

    return apiService.post(url, data);
}

export { get, post };
