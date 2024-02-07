
import store from "../store";
import actionTypes from "./actionTypes";


const { dispatch } = store


export function vehicleData(data) {
 dispatch({
  type: actionTypes.VEHICLE_DATA,
  payload: data
 })
}