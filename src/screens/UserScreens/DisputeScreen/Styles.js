import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    pickerVehicle: {
        backgroundColor: uiColours.PRIMARY_LIGHT,
        padding: moderateScale(5),
        height:moderateScale(70),
        width:moderateScale(70),
        borderRadius: moderateScale(35),
        alignItems:"center",
        justifyContent:'center'
    },
    warkingIconView:{
        backgroundColor: uiColours.LIGHT_RED,
        padding: moderateScale(5),
        height:moderateScale(28),
        width:moderateScale(28),
        borderRadius: moderateScale(35),
        alignItems:"center",
        justifyContent:'center',
        position:'absolute',
        bottom:0,
        left:scale(45)
    }
})
export default styles