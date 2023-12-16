import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    card:{
        padding:moderateScale(16),
        borderWidth:moderateScale(1),
        borderColor:uiColours.LIGHT_GRAY,
        borderRadius:moderateScale(8),
        marginTop:verticalScale(16)
    },
    profileSection:{
        flexDirection:'row',
        alignItems:"center",
        gap:scale(8),
        borderBottomWidth:moderateScale(1),
        borderColor:uiColours.LIGHT_GRAY
    }
})
export default styles