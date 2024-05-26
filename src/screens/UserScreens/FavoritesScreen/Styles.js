import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    card: {
        marginHorizontal: moderateScale(16),
        paddingVertical: verticalScale(16),
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: "space-between",
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY
    },
    content: {
        marginLeft: scale(8),
        flex: 1
    },
    heartIcon: {
        height: moderateScale(36),
        width: moderateScale(36),
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#FFF4F2",
        borderRadius: moderateScale(5),
        flex: 1
        // elevation:2
    }
})
export default styles