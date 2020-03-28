const initialState = {
    isAuth: false,
    error: '',
    isFetching: false,
    token: '',
    refresh_token: '',
    user_name: '',
    user_img_url: ''
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
        case 'FETCH_REQUEST':
            return {
                ...state,
                isFetching: true,
                error: ''
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                user_name: action.payload.data.display_name,
                user_img_url: action.payload.data.images[0].url,
            }
        case 'FETCH_FAIL':
            return {
                ...state,
            }
        case 'REFRESH_REQUEST':
            return {
                ...state,
                isFetching: true,
                error: ''
            }
        case 'REFRESH_SUCCESS':
            return {
                ...state,
                token: action.payload.token,
                refresh_token: action.payload.refresh_token
            }
        case 'REFRESH_FAIL':
            return {
                ...state,
            }
        default:
            return state;
    }

}

export default reducer;