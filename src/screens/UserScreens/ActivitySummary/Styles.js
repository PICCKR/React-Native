import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    ActivitySummaryConatiner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        paddingHorizontal: scale(16),
        paddingBottom: verticalScale(16)
    },
    label: {
        borderRadius: moderateScale(4),
        justifyContent: 'center',
        alignItems: "center",
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(4)
    },
    vehicle: {
        backgroundColor: uiColours.PRIMARY_LIGHT,
        padding: moderateScale(5),
        borderRadius: moderateScale(20)
    },
    profileSection: {
        alignItems: "center",
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        width: screenSize.width,
        padding: moderateScale(16)
    },
    profileView: {
        height: moderateScale(80),
        width: moderateScale(80),
        borderRadius: moderateScale(40),
        backgroundColor: "#F0E796",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: verticalScale(10)
    },
    reviewCard: {
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(8),
        borderRadius: moderateScale(8),
        borderWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        justifyContent: 'center',
        alignItems: "center"
    },
    reviewSection: {
        padding: moderateScale(16),
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        gap: verticalScale(8)
    },
    tripDetails: {
        padding: moderateScale(16),
        gap: verticalScale(20)
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
        backgroundColor: uiColours.PRIMARY_LIGHT,
        padding: moderateScale(5),
        borderRadius: moderateScale(20),
        position: 'absolute',
        left: scale(32),
    },
    onGoingContentSection: {
        padding: moderateScale(16),
        borderWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        borderRadius: moderateScale(8),
    },

    pinCard: {
        height: moderateScale(45),
        width: moderateScale(45),
        backgroundColor: uiColours.LIGHT_BLUE,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(4)
    },
    sendMsg: {
        flexDirection: "row",
        width: '100%',
        alignItems: 'center',
        gap: scale(10),
        marginTop: verticalScale(10),
    },
    msgInput: {
        flex: 1,
        paddingLeft: scale(10),
        borderRadius: moderateScale(10),
        height: moderateScale(36),
        justifyContent: "center"
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
    onGoingFooter: {
        // flexDirection: "row",
        // justifyContent: 'space-between',
        padding: moderateScale(16),
        borderTopWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        width: '100%',
        alignItems: 'center'
    },
    pickerVehicleInSheet: {
        backgroundColor: uiColours.PRIMARY_LIGHT,
        padding: moderateScale(5),
        height: moderateScale(70),
        width: moderateScale(70),
        borderRadius: moderateScale(35),
        alignItems: "center",
        justifyContent: 'center'
    },
    warningIconView: {
        backgroundColor: uiColours.LIGHT_RED,
        padding: moderateScale(5),
        height: moderateScale(28),
        width: moderateScale(28),
        borderRadius: moderateScale(35),
        alignItems: "center",
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: scale(45)
    }
})
export default styles