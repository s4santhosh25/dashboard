import { combineReducers } from 'redux'
import auth from './auth';
import form from './form';
import menu from "./menu";

const rootReducer = combineReducers({
  auth,
  form,
  menu
})

export default rootReducer
