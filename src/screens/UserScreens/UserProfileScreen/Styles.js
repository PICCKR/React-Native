import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    deatilsEditbutton: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: verticalScale(16),
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        paddingVertical: verticalScale(8)
    },

})
export default styles