import { useColorScheme, Appearance, StyleSheet } from "react-native";
import React, { useEffect, useState, } from "react";
import { getLocalData } from "../helper/AsyncStorage";
import { storageKeys } from "../helper/AsyncStorage/storageKeys";
import { screenSize } from "../utils/Styles/CommonStyles";
import { scale, verticalScale } from "react-native-size-matters";
import { uiColours } from "../utils/Styles/uiColors";
import { useNavigation } from "@react-navigation/native";



export const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const getUserData = async () => {
        // to get user data
        const UserData = await getLocalData(storageKeys.userData)

        // to get new user status
        const newUser = await getLocalData(storageKeys.isNew)

        // check if user is new to the application
        // if we get undefined data the he is new user so set it to true else false
        if (newUser === undefined || newUser === null) {
            setisNew(true)
        } else {
            setisNew(false)
        }

        // if user data exist then set login to true to that user can directly
        // navigate to home screen
        if (UserData) {
            setuserData(UserData)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    // storing the color mode of the mobile 
    const isDark = useColorScheme() === "dark"

    // state variables
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setuserData] = useState(null)
    const [isNew, setisNew] = useState(null)

    // commanly used appliaction styles
    const appStyles = {

        smallTextBlack: {
            color: isDark ? uiColours?.WHITE_TEXT : uiColours?.BLACK_TEXT,
            fontSize: scale(12),
            fontFamily: "Poppins-Regular"
        },
        smallTextBlackBold: {
            color: isDark ? uiColours?.WHITE_TEXT : uiColours?.BLACK_TEXT,
            fontSize: scale(12),
            fontFamily: "Poppins-Bold"
        },

        smallTextWhite: {
            color: uiColours?.WHITE_TEXT,
            fontSize: scale(12),
            fontFamily: "Poppins-Regular"
        },
        smallTextPrimary: {
            color: uiColours?.PRIMARY,
            fontSize: scale(12),
            fontFamily: "Poppins-Regular"
        },
        smallTextPrimaryBold: {
            color: uiColours?.PRIMARY,
            fontSize: scale(12),
            fontFamily: "Poppins-Bold"
        },

        smallTextGray: {
            color: uiColours?.GRAY_TEXT,
            fontSize: scale(12),
            fontFamily: "Poppins-Regular",
            lineHeight: 18
        },

        mediumTextBlack: {
            color: uiColours?.BLACK_TEXT,
            fontSize: scale(14),
            fontFamily: "Poppins-Regular"
        },

        mediumTextWhite: {
            color: uiColours?.WHITE_TEXT,
            fontSize: scale(14),
            fontFamily: "Poppins-Regular"
        },

        mediumTextPrimary: {
            color: uiColours?.PRIMARY,
            fontSize: scale(14),
            fontFamily: "Poppins-Regular"
        },

        mediumTextBlackBold: {
            color: uiColours?.BLACK_TEXT,
            fontSize: scale(14),
            fontFamily: "Poppins-Bold"
        },

        mediumTextBlackGray: {
            color: uiColours?.GRAY_TEXT,
            fontSize: scale(14),
            fontFamily: "Poppins-Regular"
        },

        mediumTextWhiteBold: {
            color: uiColours?.WHITE_TEXT,
            fontSize: scale(14),
            fontFamily: "Poppins-Bold"
        },

        mediumTextPrimaryBold: {
            color: uiColours?.PRIMARY,
            fontSize: scale(14),
            fontFamily: "Poppins-Bold"
        },

        largeTextBalck: {
            color: uiColours?.BLACK_TEXT,
            fontSize: scale(16),
            fontFamily: "Poppins-Regular"
        },

        largeTextWhite: {
            color: uiColours?.WHITE_TEXT,
            fontSize: scale(16),
            fontFamily: "Poppins-Regular"
        },

        largeTextBalckBold: {
            color: uiColours?.BLACK_TEXT,
            fontSize: scale(16),
            fontFamily: "Poppins-Bold"
        },

        largeTextWhiteBold: {
            color: uiColours?.WHITE_TEXT,
            fontSize: scale(16),
            fontFamily: "Poppins-Bold"
        },

        extraLargeTexPrimary: {
            color: uiColours?.PRIMARY,
            fontSize: scale(32),
            fontFamily: "Poppins-Bold"
        },
        extraLargeTexWhite: {
            color: uiColours?.WHITE_TEXT,
            fontSize: scale(32),
            fontFamily: "Poppins-Bold"
        },
        extraLargeTexGray: {
            color: uiColours?.GRAY_TEXT,
            fontSize: scale(32),
            fontFamily: "Poppins-Bold"
        },

        container: {
            backgroundColor: isDark ? uiColours?.DARK_BG : uiColours.WHITE_TEXT,
            flex: 1,
            width: screenSize.width,
        },
        containerPadding: {
            backgroundColor: isDark ? uiColours?.DARK_BG : uiColours.WHITE_TEXT,
            paddingHorizontal: scale(16),
            paddingVertical: verticalScale(16),
            flex: 1,
        },
    }

    return (
        <AppContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                appStyles,
                setisNew,
                isNew,
                userData,
                setuserData,
                isDark
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
