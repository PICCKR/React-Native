import actionTypes from "../Actions/actionTypes"


let initialState = {
  bankAccounts: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.BANCK_ACCOUNT: {
      let data = action.payload
      return { ...state, bankAccounts: data }
    }
    default:
      return { ...state }
  }
}