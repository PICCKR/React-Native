import store from "../store"

const { default: actionTypes } = require("./actionTypes")

const { dispatch } = store

export const isLoggedIn = async (data) => {
    dispatch({
        data: data,
        type: actionTypes.IS_LOGGED_IN
    })
}