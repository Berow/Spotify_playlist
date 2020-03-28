import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://accounts.spotify.com/api/token',
    timeout: 1000,
    headers: { 'application/x-www-form-urlencoded': 'Authorization' }
});

export default axiosInstance;