
import store from "../store";
import actionTypes from "./actionTypes";


const { dispatch } = store


export function userData(data) {
 dispatch({
  type: actionTypes.USER_DATA,
  payload: data
 })
}