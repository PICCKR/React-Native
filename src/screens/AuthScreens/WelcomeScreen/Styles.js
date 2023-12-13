import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    contentView:{

    },
    titelText:{
        fontSize:scale(20)

    },
    descriptionText:{
        marginTop:verticalScale(8)
    },
    Image:{
        marginTop:verticalScale(60),
        alignSelf:"center"
    },
  
    buttonView:{
        position:'absolute',
        bottom:verticalScale(20),
        alignSelf:"center",
        gap:verticalScale(20)
    },
    buttonStyle:{
        marginBottom:16
    },
})
export default styles