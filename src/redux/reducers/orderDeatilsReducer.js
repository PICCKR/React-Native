import actionTypes from "../Actions/actionTypes"


let initialState = {
 orderDeatils: null
}

export default function (state = initialState, action) {
 switch (action.type) {
  case actionTypes.ORDER_DETAILS: {
   let data = action.payload
   return { ...state, orderDeatils: data }
  }
  default:
   return { ...state }
 }
}