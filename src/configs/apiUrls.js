// export const BASE_URL = "http://10.20.137.15:8080/"  // office 
export const BASE_URL = "https://dev.picckr.live/api/"


export const endPoints = {
    GET_TOKEN: BASE_URL + "users/verifyToken",
    CREATE_USER: BASE_URL + "users",
    UPDATE_PROFILE: BASE_URL + "users",
    DELETE_USER: BASE_URL + "users/deleteUser",
    BECOME_PICKER: BASE_URL + "picckrDocuments",
    GET_ADDRESS: BASE_URL + "userAddress/user",
    ADD_ADDRESS: BASE_URL + "userAddress",
    GET_WALATE_BALANCE: BASE_URL + "wallet/balance",
    GET_VEHICLE_DATA: BASE_URL + "categories",
    VERIFY_KYC: BASE_URL + 'kyc/verify-account',
    UPDATE_TOP_UP: BASE_URL + "transactions/topup",
    GET_VEHICLES: BASE_URL + "vehicles/rider",
    EDIT_VEHICLE: BASE_URL + "vehicles",
    ADD_VEHICLE: BASE_URL + "vehicles",
    BANK_ACCOUNT: BASE_URL + "bankAccounts",
    WITHDRAWAL: BASE_URL + "withDrawal",
    PAKAGES: BASE_URL + "packages",
    GET_USER_BOOKINGS: BASE_URL + "bookings/getUserBookings",
    GET_PICKER_BOOKINGS: BASE_URL + "bookings/getPicckrBookings",
    FAVORIES: BASE_URL + "favoritePicckr",
    GET_PICKER_USER_ORDERS: BASE_URL + "bookings/getPastUserAndPicckrBooking",
    GET_LAST_FIVE_BOOKINGS: BASE_URL + "bookings/getLatestBookingsLocations",
    GET_CHAT_MSG: BASE_URL + "chat/roomchat",
    GET_CHAT_HSITORY: BASE_URL + "chat/getPicckrChatHistory",
    GET_RATINGS_RAVIEWS: BASE_URL + "ratings"
}