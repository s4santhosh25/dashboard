import ActionTypes from '../constants/actionTypes';

let initialState = { open: false };

const menu = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.OPEN_MENU:
            return { ...state, open: !state.open }
        default:
            return state;
    }
}

export default menu;