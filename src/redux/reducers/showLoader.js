import actionTypes from "../Actions/actionTypes";

let initialState = {
    loader: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_LOADER:
            const newData = action.data
            return { ...state, loader: newData }
        default:
            return state
    }
}
