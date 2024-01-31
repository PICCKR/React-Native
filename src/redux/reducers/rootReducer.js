import { combineReducers } from 'redux'
import showLoader from './showLoader'
import CurrentLocationReducer from "./CurrentLocationReducer"
import orderDeatilsReducer from "./orderDeatilsReducer"


const appReducer = combineReducers({
    showLoader,
    CurrentLocationReducer,
    orderDeatilsReducer

})

export default appReducer