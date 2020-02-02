import { takeLatest } from 'redux-saga/effects'
import { menu } from "../actions/menu";
import ActionTypes from '../constants/actionTypes'

function* openMenu() {
    yield menu();
}

export function* Menu() {
    yield takeLatest(ActionTypes.OPEN_MENU, openMenu);
}