const { configureStore } = require("@reduxjs/toolkit");
const { default: appReducer } = require("./reducers/rootReducer");


const store = configureStore({
    reducer: appReducer
})

export default store