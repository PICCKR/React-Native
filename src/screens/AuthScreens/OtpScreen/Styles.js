import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    underlineStyleBase: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius:moderateScale(6),
        borderWidth:moderateScale(1),
        borderColor:uiColours.LIGHT_GRAY,
        fontSize:scale(20),
        color:uiColours.BLACK_TEXT
    },

    borderStyleHighLighted: {
        borderColor: uiColours.PRIMARY,
    },

    otpStyles: {
        marginTop: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },

    resendOtpView:{
        flexDirection:'row',
        marginTop:verticalScale(20),
        alignSelf:'center',
        alignItems:"center"
    }


})
export default styles