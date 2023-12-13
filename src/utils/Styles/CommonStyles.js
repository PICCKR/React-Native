import { Dimensions, StyleSheet, Appearance } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { uiColours } from "./uiColors";



export const screenSize = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
}

export const commonStyles = {
    smallTextBlack: {
        color: uiColours.BLACK_TEXT,
        fontSize:scale(12),
    },

    smallTextWhite: {
        color: uiColours.WHITE_TEXT,
        fontSize:scale(12),
    },

    smallTextGray: {
        color: uiColours.GRAY_TEXT,
        fontSize:scale(12),
    },

    mediumTextBlack:{
        color: uiColours.BLACK_TEXT,
        fontSize:scale(14),
    },

    mediumTextWhite:{
        color: uiColours.WHITE_TEXT,
        fontSize:scale(14),
    },

    mediumTextPrimary:{
        color: uiColours.PRIMARY,
        fontSize:scale(14),
    },

    mediumTextBlackBold:{
        color: uiColours.BLACK_TEXT,
        fontSize:scale(14),
        fontWeight:"700"
    },

    mediumTextWhiteBold:{
        color: uiColours.WHITE_TEXT,
        fontSize:scale(14),
        fontWeight:"700"
    },

    mediumTextPrimaryBold:{
        color: uiColours.PRIMARY,
        fontSize:scale(14),
        fontWeight:"700"
    },

    largeTextBalck:{
        color: uiColours.BLACK_TEXT,
        fontSize:scale(16),
    },

    largeTextWhite:{
        color: uiColours.WHITE_TEXT,
        fontSize:scale(16),
    },

    largeTextBalckBold:{
        color: uiColours.BLACK_TEXT,
        fontSize:scale(16),
        fontWeight:"700"
    },

    largeTextWhiteBold:{
        color: uiColours.WHITE_TEXT,
        fontSize:scale(16),
        fontWeight:"700"
    },

    dropShadow: {
        shadowColor: uiColours.BLACK_TEXT,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        backgroundColor: uiColours.WHITE_TEXT,
        flex: 1,
        width: screenSize.width
    },
    containerPadding: {
        paddingHorizontal: scale(16),
        flex: 1,
    },
    icon: {
        height: moderateScale(24),
        width: moderateScale(24),
        justifyContent: 'center',
        alignItems: "center",
    },
    horizntalLine: {
        backgroundColor: uiColours.GRAY_TEXT,
        height: moderateScale(2),
        marginVertical: verticalScale(10)
    }
}