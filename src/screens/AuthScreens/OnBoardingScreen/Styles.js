import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    skipButton: {
        alignSelf: "flex-end",
        padding: moderateScale(16)
    },
    line: {
        height:verticalScale(2),
        backgroundColor:uiColours.PRIMARY,
    },
    contentView:{
        padding: moderateScale(16)
    },
    titelText:{
        lineHeight:48,
        maxWidth:'90%'
    },
    descriptionText:{
        marginTop:verticalScale(8)
    },
    Image:{
        height:moderateScale(200),
        width:moderateScale(200),
        marginTop:verticalScale(60),
        alignSelf:"center"
    },
    buttonStyle:{
        marginBottom:16
    }

})
export default styles