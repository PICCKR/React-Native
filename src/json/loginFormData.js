import { RegEx } from "../utils/Constents/regulerexpressions";

export const loginFormData = [
    {
        id: 1,
        title: 'Phone Number',
        placeHolder: "Input phone number",
        type: "phoneNumber",
        maxLenght: 100,
        isRequired: true,
        errorMsg: "Enter valid Phone Number",
        validationString: RegEx.notEmpty
    },
    {
        id: 2,
        title: 'Enter your password',
        placeHolder: "Input your password",
        type: "password",
        maxLenght: 100,
        isRequired: true,
        errorMsg: "",
        validationString: RegEx.notEmpty
    }
]