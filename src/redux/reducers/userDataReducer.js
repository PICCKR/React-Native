import actionTypes from "../Actions/actionTypes"


let initialState = {
  userData: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_DATA: {
      let data = action.payload
      return { ...state, userData: data }
    }
    default:
      return { ...state }
  }
}