import { fork, all } from 'redux-saga/effects';
import * as formSagas from './formSaga';
import * as menuSagas from './menuSaga';

export default function* rootSagas() {
    yield all([
        ...Object.values(formSagas),
        ...Object.values(menuSagas)
    ].map(fork));
};