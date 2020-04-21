import axios from 'axios';
import { AsyncStorage } from 'react-native';

const api = axios.create({
baseURL: 'https://apinodejsestoqueapp.herokuapp.com/'
});



export default api;