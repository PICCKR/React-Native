import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"


const styles = StyleSheet.create({
    homeScreenContainer: {
        paddingHorizontal: scale(16),
        marginTop: verticalScale(16)
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
        paddingVertical: verticalScale(10),
        backgroundColor: uiColours.WHITE_TEXT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        borderRadius: moderateScale(8),
        marginTop: verticalScale(16)
    },
    inputContainer: {
        borderWidth: moderateScale(1),
        padding: moderateScale(8),
        borderRadius: moderateScale(8),
    },
    inputView: {
        flexDirection: 'row',
        alignItems: "center",
        gap: scale(10)
    },
    locationView: {
        width: "90%",
        borderColor: uiColours.LIGHT_GRAY,
        paddingVertical: verticalScale(10)
    },
    tripCard: {
        padding: moderateScale(16),
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(8),
        gap: verticalScale(20)
    },
    completeProfile: {
        height: verticalScale(115),
        width: screenSize.width - scale(32),
        alignSelf:'center',
        marginVertical:verticalScale(24),
        alignItems:'center',
        justifyContent:"center"
    },
    destinationHistoryCard:{
        padding:moderateScale(16),
        borderWidth:moderateScale(1),
        borderRadius:moderateScale(8),
        marginBottom:verticalScale(16),
        flexDirection:"row",
        alignItems:"center",
        gap:scale(8)

    },
    vehicleTypeIcon: {
        backgroundColor: uiColours.CREAM,
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    msgInput:{
        paddingHorizontal:scale(12),
        paddingVertical:verticalScale(8),
        backgroundColor:uiColours.LIGHT_GRAY,
        borderRadius:moderateScale(8)
    },
    completeImage:{
        width:screenSize.width - scale(32),
        alignSelf:"center",
        height:verticalScale(100),
        marginTop:verticalScale(16)
    }
})
export default styles