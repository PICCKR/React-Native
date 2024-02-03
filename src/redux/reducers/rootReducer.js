import { combineReducers } from 'redux'
import showLoader from './showLoader'
import CurrentLocationReducer from "./CurrentLocationReducer"
import orderDeatilsReducer from "./orderDeatilsReducer"
import isLoggedInReducer from "./isLoggedInReducer"
import userDataReducer from "./userDataReducer"
import bookingDataReducer from "./bookingDataReducer"
import bookingDataPickkerReducer from "./bookingDataPickkerReducer"


const appReducer = combineReducers({
    showLoader,
    CurrentLocationReducer,
    orderDeatilsReducer,
    isLoggedInReducer,
    userDataReducer,
    bookingDataReducer,
    bookingDataPickkerReducer

})

export default appReducer