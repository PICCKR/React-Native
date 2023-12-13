import { RegEx } from "../utils/Constents/regulerexpressions";

export const signUpFormData = [
    {
        id: 1,
        title: 'First name',
        placeHolder: "Input your first name",
        type: "firstName",
        maxLenght: 100,
        isRequired: true,
        errorMsg: "Enter valid first name",
        validationString: RegEx.name__regEx
    },
    {
        id: 2,
        title: 'Last name',
        placeHolder: "Input your last name",
        type: "lastName",
        maxLenght: 100,
        isRequired: true,
        errorMsg: "Enter valid last name",
        validationString: RegEx.name__regEx
    },

    {
        id: 3,
        title: 'Phone Number',
        placeHolder: "Input phone number",
        type: "phoneNumber",
        maxLenght: 100,
        isRequired: true,
        errorMsg: "Enter valid Phone Number",
        validationString: RegEx.only__number__regEx
    },

    {
        id: 4,
        title: 'Password',
        placeHolder: "Input your password",
        type: "password",
        maxLenght: 100,
        isRequired: true,
        errorMsg: "The minimum password length is 6 characters",
        validationString: RegEx.length6
    }
]