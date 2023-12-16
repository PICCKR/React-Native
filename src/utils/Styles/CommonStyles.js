import { Dimensions, StyleSheet, Appearance } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { uiColours } from "./uiColors";



export const screenSize = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
}

export const commonStyles = {

    flexRowAlnCtrJutySpaceBetween:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    flexRowAlnCtr:{
        flexDirection: 'row',
        alignItems: 'center',
        gap:scale(10)
    },
    bottomBorder:{
        borderBottomWidth:moderateScale(1),
        borderColor:uiColours.LIGHT_GRAY,
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