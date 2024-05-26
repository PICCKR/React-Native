import actionTypes from "../Actions/actionTypes"


let initialState = {
    currentLocation: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.CURRENTLOCATION: {
            let data = action.payload
            return { ...state, currentLocation: data }
        }
        default:
            return { ...state }
    }
}