
import store from "../store";
import actionTypes from "./actionTypes";


const { dispatch } = store


export function addressData(data) {
 dispatch({
  type: actionTypes.ADDRESS_DATA,
  payload: data
 })
}