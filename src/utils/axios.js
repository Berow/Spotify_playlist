import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.spotify.com',
    headers: {
        Authorization: localStorage.getItem('token'),
    }
});

export default axiosInstance;