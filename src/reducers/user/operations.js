// import axios from 'axios';

// const auth = (code) => {
//     return dispatch => {
//         return axios.post('https://accounts.spotify.com/api/token', {
//             code: code,
//         }).then(response => {
//             localStorage.setItem('token', response.access_token);
//             dispatch({ type: 'user/AUTH' });
//             return true;
//         }).catch(() => false);
//     }
// }

// export { auth };