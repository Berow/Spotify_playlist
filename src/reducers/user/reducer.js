const initialState = {
    isAuth: false,
    error: '',
    isFetching: false,
    token: '',
    refresh_token: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_REQUEST':
            return {
                ...state,
                isFetching: true,
                error: ''
            }
        case 'AUTH_SUCCESS':
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                refresh_token: action.payload.refresh_token
            }
        case 'AUTH_FAIL':
            return {
                ...state,
                isFetching: false,
                error: action.payload.message
            }
        case 'FETCH_SUCCESS':
            return {
                ...state
            }
        case 'FETCH_FAIL':
            return {
                ...state
            }
        default:
            return state;
    }

}

export default reducer;