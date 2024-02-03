import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    selectMap: {
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(8),
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(6),
        borderColor: uiColours.LIGHT_GRAY,
        marginTop: verticalScale(10),
        flexDirection: "row",
        alignSelf: "flex-start",
        alignItems: "center",
        gap: scale(10),
    },
})
export default styles