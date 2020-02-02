import ActionTypes from '../constants/actionTypes';

let initialState = { type: 'login', data: null };

const form = (state = { ...initialState }, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return { ...state, type: action.payload }
        case ActionTypes.REGISTER:
            return { ...state, type: action.payload }
        case ActionTypes.API:
            return { ...state, data: action.payload }
        default:
            return state;
    }
}

export default form;