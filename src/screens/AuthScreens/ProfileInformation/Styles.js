import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    profileSection: {
        alignItems: "center",
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        width: screenSize.width,
        padding: moderateScale(16),
    },
    profileView: {
        height: moderateScale(100),
        width: moderateScale(100),
        borderRadius: moderateScale(50),
        backgroundColor: "#F0E796",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: verticalScale(10)
    },
    profileImg:{
        height: moderateScale(100),
        width: moderateScale(100),
        borderRadius: moderateScale(50),
    },
    cameraIconView: {
        height: moderateScale(28),
        width: moderateScale(28),
        borderRadius: moderateScale(14),
        backgroundColor: uiColours.BLACK_TEXT,
        position: 'absolute',
        bottom: 0,
        alignSelf: "flex-end",
        alignItems: "center",
        justifyContent: 'center'
    },
    contentView: {
        paddingHorizontal: moderateScale(16),
        marginTop: verticalScale(16)
    },
    deatilsEditbutton: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: verticalScale(16),
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        paddingVertical: verticalScale(8)
    },
    addressSheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    addresCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY
    },
    addresEditIcon: {
        height: moderateScale(24),
        width: moderateScale(24),
        alignItems: "center",
        justifyContent: 'center',
    },
    paymentExpairy: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(6)
    }
})
export default styles