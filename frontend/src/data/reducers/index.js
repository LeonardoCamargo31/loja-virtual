import { combineReducers } from 'redux'

import LoginReducer from './LoginReducer'

//juntamos todos os reducers
export default combineReducers({
    auth: LoginReducer
})