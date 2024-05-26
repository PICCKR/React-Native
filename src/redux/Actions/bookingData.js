
import store from "../store";
import actionTypes from "./actionTypes";


const { dispatch } = store


export function bookingData(data) {
 dispatch({
  type: actionTypes.BOOKING_DATA,
  payload: data
 })
}