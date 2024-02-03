
import store from "../store";
import actionTypes from "./actionTypes";


const { dispatch } = store


export function currentLoaction(data) {
    dispatch({
        type: actionTypes.CURRENTLOCATION,
        payload: data
    })
}