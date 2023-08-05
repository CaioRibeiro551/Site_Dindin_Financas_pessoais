import axios from 'axios';
const url = ' https://desafio-backend-03-dindin.pedagogico.cubos.academy/';


function api() {
    return axios.create({ baseURL: url, timeout: 10000, headers: { 'Content-Type': 'application/json' } });
}

export default api;