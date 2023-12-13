import { RegEx } from "../utils/Constents/regulerexpressions";

export const validateData = (value, type) => {
    console.log("RegEx.password.test(value)", RegEx.password.test(value), value, value?.length);
    switch (type) {
        case "email":
            if (RegEx.email__regEx.test(value)) {
                return true
            } else {
                return false
            }
        case "name":
            if (RegEx.name__regEx.test(value)) {
                return true
            } else {
                return false
            }
        case "password":
            if (RegEx.password.test(value) && value?.length >= 8) {
                return true
            } else {
                return false
            }
        default:
            return true
    }
}