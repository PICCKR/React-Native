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
        width: screenSize.width,
        paddingVertical: verticalScale(16),
        marginBottom: verticalScale(16)
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
        justifyContent: 'center',
        alignItems: "center"
    },
    reviewSection: {
        // gap: verticalScale(8),
        marginTop: verticalScale(16)
    },
    tripDetails: {
        gap: verticalScale(10),
        marginVertical: verticalScale(10)
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
    paymentMethod: {
        marginBottom: verticalScale(70)
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
        // flexDirection:"row",
        // justifyContent:'space-between',
        padding: moderateScale(16),
        borderTopWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        width: '100%',
        marginBottom: verticalScale(50)
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