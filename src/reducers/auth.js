import ActionTypes from '../constants/actionTypes';

let initialState = { status: false, googleOauth: null };

const auth = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_LOGIN_USER:
            sessionStorage.setItem('token_', action.payload.token)
            return { ...state, status: "success", data: action.payload }
        case ActionTypes.SET_REGISTER_USER:
            return { ...state, register: action.payload }
        case ActionTypes.SET_GOOGLE_OAUTH:
            return { ...state, googleOauth: action.payload }
        case ActionTypes.USER_FETCH_FAILED:
            return { ...state, status: action.payload, data: null }
        case ActionTypes.USER_REGISTER_FETCH_FAILED:
            return { ...state, register: action.payload }
        default:
            return state;
    }
}

export default auth;