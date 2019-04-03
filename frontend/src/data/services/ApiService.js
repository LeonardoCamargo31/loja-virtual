const axios = require('axios');
const url = 'http://localhost:3001/';

export const ApiService = {
    get(endpoint) {
        return fetch(`${url}${endpoint}`)
            .then(response => response.json());
    },
    post(endpoint, data) {
        return axios.post(`${url}${endpoint}`, data)
            .then(response => response.data)
            .catch(error => error.response.data);
    },
    put(endpoint, data) {
        return fetch(`${url}${endpoint}?id=${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
            .then(response => response.json());
    },
    delete(endpoint, id) {
        return fetch(`${url}${endpoint}?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json());
    }
}