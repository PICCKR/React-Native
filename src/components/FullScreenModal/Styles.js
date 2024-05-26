import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../utils/Styles/CommonStyles"
import { uiColours } from "../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    modal:{
        backgroundColor:"#fff",
        borderTopLeftRadius:moderateScale(16),
        borderTopRightRadius:moderateScale(16),
        position:'absolute',
        bottom:0,
        width:screenSize.width
    },
   
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        borderBottomWidth:moderateScale(1),
        padding:moderateScale(16),
        borderColor:uiColours.LIGHT_GRAY
    },
})
export default styles