import actionTypes from "../Actions/actionTypes"


let initialState = {
  vehicleData: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.VEHICLE_DATA: {
      let data = action.payload
      return { ...state, vehicleData: data }
    }
    default:
      return { ...state }
  }
}