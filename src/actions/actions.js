import axios from 'axios';
// import axiosInstance from '../utils'

// import { history } from '../helpers';

export const userAuth = (code, state) => {
    const client_id = 'ad8f1782d1874b0e9787a0cc7b7e68b1';
    const client_secret = '2d5872aea5994a1cb85a1aa517f3e6f5';

    return dispatch => {
        dispatch({
            type: 'AUTH_REQUEST',
        })

        if (state != 'zh88psiu6') {
            dispatch({
                type: 'AUTH_FAIL',
                error: true,
                payload: new Error('State mismatch'),
            })
        }
        else {
            axios({
                method: 'POST',
                url: 'https://accounts.spotify.com/api/token',
                data: {
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: 'http://localhost:9000',
                },
                dataType: 'json',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + `${client_id}:${client_secret}`.toString('base64')
                }
            })
                .then(response => {
                    console.log(response);
                    dispatch({
                        type: 'AUTH_SUCCESS',
                        payload: response.code,
                    });
                })
                .catch(() => {
                    dispatch({
                        type: 'AUTH_FAIL',
                        error: true,
                        payload: new Error('Ошибка авторизации'),
                    })
                })
        }
    }
}