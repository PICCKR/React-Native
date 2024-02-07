import actionTypes from "../Actions/actionTypes"


let initialState = {
  addressData: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADDRESS_DATA: {
      let data = action.payload
      return { ...state, addressData: data }
    }
    default:
      return { ...state }
  }
}