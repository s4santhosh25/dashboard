import ActionTypes from '../constants/actionTypes'

export function login() {
  return { type: ActionTypes.LOGIN, payload: "login" }
}

export function register() {
  return { type: ActionTypes.REGISTER, payload: "register" }
}

export function googleOauth(payload) {
  return { type: ActionTypes.SET_GOOGLE_OAUTH, payload }
}

export function api(action) {
  return { type: ActionTypes.API, payload: action.payload }
}