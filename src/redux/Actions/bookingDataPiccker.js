
import store from "../store";
import actionTypes from "./actionTypes";


const { dispatch } = store


export function bookingDataPiccker(data) {
 dispatch({
  type: actionTypes.BOOKING_DATA_PICKER,
  payload: data
 })
}