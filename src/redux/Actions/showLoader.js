import store from "../store"

const { default: actionTypes } = require("./actionTypes")

const { dispatch } = store

export const showLoader = async (data) => {
    dispatch({
        data: data,
        type: actionTypes.SHOW_LOADER
    })
}