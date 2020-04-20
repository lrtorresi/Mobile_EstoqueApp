import axios from 'axios';

const api = axios.create({
baseURL: 'https://apinodejsestoqueapp.herokuapp.com/'
});

export default api;