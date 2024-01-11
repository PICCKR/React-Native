import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    card:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        padding:moderateScale(16)
    },
    unreadView:{
        minHeight:moderateScale(22),
        minWidth:moderateScale(22),
        maxHeight:moderateScale(40),
        maxWidth:moderateScale(40),
        backgroundColor:uiColours.PRIMARY,
        borderRadius:moderateScale(30),
        alignItems:'center',
        justifyContent:"center",
    }
})
export default styles