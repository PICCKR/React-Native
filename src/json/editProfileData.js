const { RegEx } = require("../utils/Constents/regulerexpressions");

export const editProfileData = [
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
        title: 'Enter your email',
        placeHolder: "Input your email",
        type: "email",
        maxLenght: 100,
        isRequired: true,
        errorMsg: "Enter valid email id",
        validationString: RegEx.email__regEx,
        editable:false
    },

    {
        id: 4,
        title: 'Phone Number',
        placeHolder: "Input phone number",
        type: "phoneNumber",
        maxLenght: 100,
        isRequired: true,
        errorMsg: "Enter valid Phone Number",
        validationString: RegEx.only__number__regEx,
        editable:false
    },

]