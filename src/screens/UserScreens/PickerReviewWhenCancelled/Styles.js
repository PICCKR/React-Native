import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    TopSection: {
        paddingHorizontal: scale(16),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        paddingBottom: verticalScale(16)
    },
    label: {
        borderRadius: moderateScale(4),
        justifyContent: 'center',
        alignItems: "center",
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(4),
        backgroundColor: uiColours.LIGHT_RED

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
    reviewCard: {
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(8),
        borderRadius: moderateScale(8),
        borderWidth: moderateScale(1),
        backgroundColor: "#F2F4F8",
        justifyContent: 'center',
        alignItems: "center"
    },
    reviewSection: {
        padding: moderateScale(16),
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        gap: verticalScale(8)
    },


})
export default styles