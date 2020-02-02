import { put, takeLatest } from 'redux-saga/effects'
import axios from '../utils/axios';
import { googleOauth } from '../actions/form';

function* fetchLoginUser(action) {
    console.log('formsaga', action)
    try {
        const data = yield axios.post('/login', action.payload)
        yield put({ type: "SET_LOGIN_USER", payload: data.data })
    } catch (e) {
        console.log('catch', e.message)
        yield put({ type: "USER_LOGIN_FETCH_FAILED", payload: "failed" });
    }
}

export function* loginUser() {
    yield takeLatest("LOGIN_USER", fetchLoginUser);
}

function* fetchRegisterUser(action) {
    try {
        const data = yield axios.post('/register', action.payload)
        yield put({ type: "SET_REGISTER_USER", payload: data.data })
    } catch (e) {
        console.log('catch', e.message)
        yield put({ type: "USER_REGISTER_FETCH_FAILED", payload: "failed" });

    }
}

export function* registerUser() {
    yield takeLatest("REGISTER_USER", fetchRegisterUser);
}

function* googleAPI(action) {
    try {
        let data = { token: action.payload };
        console.log('googleAPI', data)
        const result = yield axios.post('/oauth', data);
        yield put(googleOauth(action.payload))
        yield put({ type: "SET_LOGIN_USER", payload: result.data.data })
    } catch (e) {
        console.log('catch', e.message)
        yield put({ type: "USER_REGISTER_FETCH_FAILED", payload: "failed" });

    }
}

export function* googleAuth() {
    yield takeLatest("GET_GOOGLE_OAUTH", googleAPI);
}