import axios from 'axios';
import queryString from 'query-string';
import auth from '../components/auth/auth';

// import { history } from '../helpers';

const userAuth = (code, state) => {
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
            axios.post('https://accounts.spotify.com/api/token', queryString.stringify({
                "grant_type": 'authorization_code',
                "code": code,
                "redirect_uri": 'http://localhost:9000/auth/'
            }),
                {
                    headers: {
                        "Authorization": "Basic " + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )
                .then(response => {
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('refresh_token', response.data.refresh_token);

                    dispatch({
                        type: 'AUTH_SUCCESS',
                        payload: {
                            token: response.data.access_token,
                            refresh_token: response.data.refresh_token
                        },
                    });
                })
                .catch(() => {
                    dispatch({
                        type: 'AUTH_FAIL',
                        error: true,
                        payload: new Error('Wrong code'),
                    })
                })
        }
    }
}

const fetchData = (token) => {
    return dispatch => {
        dispatch({
            type: 'FETCH_REQUEST',
        })
        axios.get('https://api.spotify.com/v1/me',
            {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            }
        ).then(response => {
            console.log(response);
            dispatch({
                type: 'FETCH_SUCCESS',
                payload: {
                    token: response.data.access_token,
                    refresh_token: response.data.refresh_token
                },
            });
        })
            .catch(() => {
                dispatch({
                    type: 'FETCH_FAIL',
                    error: true,
                    payload: new Error('Wrong code'),
                })
            })
    }
}

const refreshToken = (token) => {
    
    const client_id = 'ad8f1782d1874b0e9787a0cc7b7e68b1';
    const client_secret = '2d5872aea5994a1cb85a1aa517f3e6f5';

    return dispatch => {
        dispatch({
            type: 'REFRESH_REQUEST',
        })
        axios.post('https://accounts.spotify.com/api/token', queryString.stringify({
            "grant_type": 'refresh_token',
            "refresh_token": token,
        }),
            {
                headers: {
                    "Authorization": "Basic " + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
                }
            }
        )
            .then(response => {
                console.log(response);

                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);

                dispatch({
                    type: 'REFRESH_SUCCESS',
                    payload: response,
                });
            })
            .catch(() => {
                dispatch({
                    type: 'REFRESH_FAIL',
                    error: true,
                    payload: new Error('Wrong token'),
                })
            })
    }
}

export { userAuth, fetchData, refreshToken };