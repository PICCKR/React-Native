import { Dimensions, StyleSheet } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { screenSize } from '../../../utils/Styles/CommonStyles'
import { uiColours } from '../../../utils/Styles/uiColors'


export const Styles = StyleSheet.create({
    tip: {
        height: 20,
        width: 20,
        backgroundColor: uiColours.RED,
        alignSelf: 'center',
        top: verticalScale(35),
        position: 'absolute'
    },
    marker: {
        width: scale(200),
        borderRadius: moderateScale(5),
        backgroundColor: uiColours.RED,
        paddingVertical: verticalScale(5),
        paddingHorizontal: 1,
    },
    markertext: {
        color: uiColours.WHITE_TEXT,
        fontSize: scale(10),
        textAlign: 'center'
    },
    Satllite: {
        position: 'absolute',
        height: verticalScale(40),
        width: scale(60),
        backgroundColor: '#ffffff',
        zIndex: 5,
        elevation: 7,
        borderRadius: 3,
        alignSelf: 'flex-start',
        left: scale(10),
        top: verticalScale(20),
        justifyContent: 'center',
        alignItems: 'center'
    },

    bottomView: {
        position: "absolute",
        alignSelf: "flex-start",
        backgroundColor: uiColours.WHITE_TEXT,
        width: screenSize.width,
        borderTopRightRadius: moderateScale(8),
        borderTopLeftRadius: moderateScale(8),
        bottom: 0
    },
    bottomViewContent: {
        padding: moderateScale(16),
        flexDirection: "row",
        alignItems: "center",
        gap: scale(10)
    },
    recipientDetails: {
        padding: moderateScale(16),
    },
    pickupButton: {
        marginTop: verticalScale(5),
        borderWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        borderRadius: moderateScale(5),
        height: verticalScale(45),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scale(16)
    }

})