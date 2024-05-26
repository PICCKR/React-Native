import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"

const styles = StyleSheet.create({
    CheckBox:{
        height:moderateScale(20),
        width:moderateScale(20),
        borderRadius:moderateScale(5),
        alignItems:"center",
        justifyContent:'center'
    }
})
export default styles