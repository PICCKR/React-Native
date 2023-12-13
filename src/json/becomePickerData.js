const { RegEx } = require("../utils/Constents/regulerexpressions");

export const becomePickerData = [
    {
        id: 1,
        title: 'Name',
        placeHolder: "Input your name",
        type: "name",
        maxLenght: 100,
        isRequired: true,
        errorMsg: "Enter valid first name",
        validationString: RegEx.name__regEx
    },
    {
        id: 2,
        title: 'Enter your email',
        placeHolder: "Input your email",
        type: "email",
        maxLenght: 100,
        isRequired: true,
        errorMsg: "Enter valid email id",
        validationString: RegEx.email__regEx
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

]