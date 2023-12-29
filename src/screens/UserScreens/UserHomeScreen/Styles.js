import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    homeScreenContainer: {
        paddingHorizontal: scale(16),
        marginTop:verticalScale(16)
    },
    profileView: {
        height: moderateScale(50),
        width: moderateScale(50),
        borderRadius: moderateScale(25),
        borderWidth: moderateScale(1),
        borderColor: uiColours.PRIMARY,
        backgroundColor: uiColours.WHITE_TEXT,
        alignItems: "center",
        justifyContent: 'center',
    },
    headerContainer: {
        padding: moderateScale(16),
        backgroundColor: uiColours.PRIMARY
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: "center",
        gap: scale(10)
    },
    walletView: {
        paddingHorizontal: scale(16),
        paddingVertical:verticalScale(10),
        backgroundColor: uiColours.WHITE_TEXT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        borderRadius: moderateScale(8),
        marginTop: verticalScale(16)
    },
    recentDestinationView: {
        gap: verticalScale(10),
        marginTop: verticalScale(16)
    },
    becomePickerView: {
        height:"100%",
        width: "100%",
        borderRadius: moderateScale(8)
    },
    VehicleType: {
        paddingVertical: verticalScale(10),
        alignItems: 'center',
        gap: verticalScale(5)
    },
    vehicleTypeIcon: {
        backgroundColor: uiColours.CREAM,
        height: moderateScale(70),
        width: moderateScale(70),
        borderRadius: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center'
    },
    vehicleTypeList: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    whyPickerItemList: {
        gap:scale(16),
        marginVertical:verticalScale(16)
    },
    whyPickerItem: {
        flexDirection: 'row',
        alignItems: "center",
        gap:scale(16)
    },
    savedCardView:{
        flexDirection:'row',
        alignItems:'center',
        gap:scale(10),
        borderBottomWidth:moderateScale(1),
        borderColor:uiColours.LIGHT_GRAY,
        paddingVertical:verticalScale(12),
        justifyContent:'space-between'
    },
    cardClickCircle:{
        height:moderateScale(20),
        width:moderateScale(20),
        borderRadius:moderateScale(10),
        borderWidth:moderateScale(2),
        borderColor:uiColours.PRIMARY
    },
    priceCard:{
        width:(screenSize.width-scale(64)) / 3,
        height:(screenSize.width - scale(64)) / 3,
        borderWidth:moderateScale(1),
        borderColor:uiColours.LIGHT_GRAY,
        borderRadius:moderateScale(8),
        alignItems:'center',
        justifyContent:"center",
        marginBottom:verticalScale(16)
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