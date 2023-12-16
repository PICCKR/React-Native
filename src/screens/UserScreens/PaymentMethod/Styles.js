import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    walletCard:{
        borderBottomWidth:moderateScale(1),
        borderColor:uiColours.LIGHT_GRAY,
        padding:moderateScale(16),
        gap:verticalScale(10)
    },
    savedCrad:{
        padding:moderateScale(16),
        gap:verticalScale(10)
    }
})
export default styles