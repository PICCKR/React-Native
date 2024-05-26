import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    bottomSheetContainer: {
        width: "100%"
    },
    sheetHeader: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        padding: moderateScale(16),
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        gap: scale(10)
    },
    pickerSection: {
        padding: moderateScale(16),
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
    },
    pickerProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(20),
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        paddingBottom: verticalScale(16)
    },
    pickerProfileView: {
        height: moderateScale(50),
        width: moderateScale(50),
        borderRadius: moderateScale(25),
        backgroundColor: "#F0E796",
        alignItems: "center",
        justifyContent: 'center',
    },
    pickerVehicle: {
        backgroundColor: uiColours.GOLDEN_LIGHT,
        padding: moderateScale(5),
        borderRadius: moderateScale(20),
        position: 'absolute',
        left: scale(32),
    },
    sendMsg: {
        flexDirection: "row",
        width: '100%',
        alignItems: 'center',
        gap: scale(10),
        marginTop: verticalScale(10),
        justifyContent: 'space-between'
    },
    msgInput: {
        flex: 1,
        backgroundColor: uiColours.LIGHT_GRAY,
        paddingLeft: scale(10),
        borderRadius: moderateScale(8),
        height: moderateScale(36),
        justifyContent: 'center',
    },
    heartIcon: {
        height: moderateScale(36),
        width: moderateScale(36),
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#FFF4F2",
        borderRadius: moderateScale(5),
        // elevation:2
    },
    timeView: {
        padding: moderateScale(5),
        justifyContent: "center",
        alignContent: "center",
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(6),
        borderColor: uiColours.BLUE,
        backgroundColor: uiColours.LIGHT_BLUE,
    },
    pinCodeView: {
        padding: moderateScale(16),
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
    },
    pinCodeInnerView: {
        padding: moderateScale(16),
        borderWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        borderRadius: moderateScale(6)
    },
    pinCard: {
        height: moderateScale(45),
        width: moderateScale(45),
        backgroundColor: uiColours.LIGHT_BLUE,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(4)
    },
    tripDetails: {
        padding: moderateScale(16),
        gap: verticalScale(20)
    },
    iconCircle: {
        backgroundColor: uiColours.PRIMARY_LIGHT,
        height: moderateScale(70),
        width: moderateScale(70),
        borderRadius: moderateScale(35),
        alignItems: "center",
        justifyContent: "center"
    }

})

export default styles