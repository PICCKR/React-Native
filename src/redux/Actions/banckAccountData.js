
import store from "../store";
import actionTypes from "./actionTypes";


const { dispatch } = store


export function banckAccountData(data) {
 dispatch({
  type: actionTypes.BANCK_ACCOUNT,
  payload: data
 })
}