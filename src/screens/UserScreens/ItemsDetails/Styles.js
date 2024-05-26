import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    vehicleTypeList: {
        gap: verticalScale(15),
        marginTop: verticalScale(8),
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        paddingBottom: verticalScale(26)
    },
    container: {
        // paddingTop: verticalScale(10),
    },
    vehicleTypeIcon: {
        backgroundColor: uiColours.CREAM,
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioButton: {
        height: moderateScale(22),
        width: moderateScale(22),
        borderRadius: moderateScale(15),
        borderWidth: moderateScale(2),
        alignItems: "center",
        justifyContent: 'center'
    },
    redioActive: {
        height: moderateScale(13),
        width: moderateScale(13),
        borderRadius: moderateScale(10),
        backgroundColor: uiColours.PRIMARY
    },
    paymentMethodButton: {
        marginTop: verticalScale(5),
        borderWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        borderRadius: moderateScale(5),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(16)
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: scale(16),
        position: 'absolute',
        bottom: 0,
        padding: moderateScale(16),
        width: screenSize.width,
        borderTopWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
    },
    packageType: {
        paddingVertical: verticalScale(16),
        borderBottomWidth: moderateScale(1),

    },
    packageTypeCard:{
        padding:moderateScale(5),
        borderWidth:moderateScale(1),
        flexDirection:"row",
        alignItems:"center",
        gap:scale(5),
        borderRadius:moderateScale(6),
        borderColor:uiColours.LIGHT_GRAY
    },
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
        marginVertical: verticalScale(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    resendOtpView:{
        flexDirection:'row',
        alignSelf:'center',
        alignItems:"center"
    }

})
export default styles