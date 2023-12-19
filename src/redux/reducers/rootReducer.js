import { combineReducers } from 'redux'
import showLoader from './showLoader'
import CurrentLocationReducer from "./CurrentLocationReducer"


const appReducer = combineReducers({
    showLoader,
    CurrentLocationReducer,
})

export default appReducer