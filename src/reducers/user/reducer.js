const initialState = {
    isAuth: false,
    error: '',
    isFetching: false,
    code: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isFetching: true,
                error: ''
            }
        case 'AUTH_SUCCESS':
            return {
                ...state,
                isAuth: true,
                code: action.payload.code,
            }
        case 'AUTH_FAIL':
            return {
                ...state,
                isFetching: false,
                error: action.payload.message
            }

        default:
            return state;
    }

}

export default reducer;