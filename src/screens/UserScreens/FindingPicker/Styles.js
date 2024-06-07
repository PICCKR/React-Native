import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    picckerCard: {
        padding: moderateScale(16),
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(8),
        marginBottom: verticalScale(16),
        width: screenSize.width - scale(16)
        // gap:verticalScale(16)
    },
    pickerProfile: {
        flexDirection: 'row',
        gap: scale(10),
    },
    pickerProfileView: {
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(20),
        backgroundColor: "#F0E796",
        alignItems: "center",
        justifyContent: 'center',
    },
    buttonsView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop: verticalScale(10)
    },
    header: {
        alignSelf: "flex-start",
        width: '100%',
        paddingBottom: verticalScale(16)
    }
})
export default styles