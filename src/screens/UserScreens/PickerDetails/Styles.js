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
        paddingHorizontal: scale(16),
        paddingBottom: verticalScale(16)
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
    historyCard: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        paddingVertical: verticalScale(12)
    },
    details: {
        paddingVertical: verticalScale(10),
        gap: verticalScale(16)
    }
})
export default styles