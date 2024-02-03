
import store from "../store";
import actionTypes from "./actionTypes";


const { dispatch } = store


export function orderDeatils(data) {
 dispatch({
  type: actionTypes.ORDER_DETAILS,
  payload: data
 })
}