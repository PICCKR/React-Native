import actionTypes from "../Actions/actionTypes";

let initialState = {
    isLoggedIn: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.IS_LOGGED_IN:
            const newData = action.data
            return { ...state, isLoggedIn: newData }
        default:
            return state
    }
}
