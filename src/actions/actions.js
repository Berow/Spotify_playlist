import axios from 'axios';

// import { history } from '../helpers';

export const userAuth = (authString) => {

    return dispatch => {
        dispatch({
            type: 'LOGIN_REQUEST',
        })

        axios.get(authString, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response.code);
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.code,
                });
            })
            .catch(() => {
                dispatch({
                    type: 'LOGIN_FAIL',
                    error: true,
                    payload: new Error('Ошибка авторизации'),
                })
            })
    }
}