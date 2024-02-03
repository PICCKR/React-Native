import actionTypes from "../Actions/actionTypes"


let initialState = {
  bookingData: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.BOOKING_DATA_PICKER: {
      let data = action.payload
      return { ...state, bookingData: data }
    }
    default:
      return { ...state }
  }
}