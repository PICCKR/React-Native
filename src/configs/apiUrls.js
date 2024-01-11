// export const BASE_URL = "http://10.20.137.15:8080/"  // office 
export const BASE_URL = "https://dev.picckr.live/api/"


export const endPoints = {
    GET_TOKEN: BASE_URL + "users/verifyToken",
    CREATE_USER: BASE_URL + "users",
    UPDATE_PROFILE: BASE_URL + "users",
    BECOME_PICKER: BASE_URL + "riderDocuments",
    GET_ADDRESS: BASE_URL + "userAddress/user",
    ADD_ADDRESS : BASE_URL + "userAddress",
    GET_WALATE_BALANCE: BASE_URL + "wallet/balance",
    GET_VEHICLE_DATA: BASE_URL + "categories",
    VERIFY_KYC: BASE_URL + 'kyc/verify-account'
}