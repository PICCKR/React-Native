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
        paddingBottom: verticalScale(16),
    },
    profileView: {
        height: moderateScale(100),
        width: moderateScale(100),
        borderRadius: moderateScale(50),
        backgroundColor: "#F0E796",
        alignItems: "center",
        justifyContent: 'center',
    },

    termsView: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(10),
        marginVertical: verticalScale(16),
    },
    linkTextView: {
        paddingVertical: verticalScale(6),
        paddingRight: scale(10)
    },

})
export default styles