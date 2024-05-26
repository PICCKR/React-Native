import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    activityScreenContainer: {
        width: '100%'
    },
    tabContainer: {
        paddingTop: verticalScale(16),
        width: screenSize.width - 20
        // borderColor: uiColours.LIGHT_GRAY,
    },
    tabContainerItem: {
        alignItems: "center",
        justifyContent: "center",
        width: '50%',
        borderBottomWidth: moderateScale(1),
        paddingBottom: verticalScale(16)
    },
    label: {
        borderRadius: moderateScale(4),
        justifyContent: 'center',
        alignItems: "center",
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(4)
    },
    bubble: {
        height: moderateScale(20),
        width: moderateScale(20),
        borderRadius: moderateScale(10),
        backgroundColor: uiColours.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(5)
    }
})
export default styles