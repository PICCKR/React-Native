import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"


const styles = StyleSheet.create({
    pickerProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(20),
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        paddingHorizontal: scale(16),
        paddingVertical:verticalScale(10)
    },
    pickerProfileView: {
        height: moderateScale(50),
        width: moderateScale(50),
        borderRadius: moderateScale(25),
        backgroundColor: "#F0E796",
        alignItems: "center",
        justifyContent: 'center',
    },
    pickerVehicle: {
        backgroundColor: uiColours.GOLDEN_LIGHT,
        padding: moderateScale(5),
        borderRadius: moderateScale(20),
        position: 'absolute',
        left: scale(40),
        top: verticalScale(50)
    },
    sentMessageCard: {
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(8),
        borderRadius: moderateScale(8),
        maxWidth: "90%",
        backgroundColor: uiColours.LIGHT_GRAY,
        alignSelf: "flex-end",
        alignItems: 'flex-end'
    },
    reviedMessageCard: {
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(8),
        borderRadius: moderateScale(8),
        borderWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        maxWidth: "90%",
        alignSelf: "flex-start",
        alignItems: 'flex-start'
    },
    inputContainer: {
        padding: moderateScale(16),
        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: screenSize.width,
        gap:scale(10),
        borderTopWidth:moderateScale(1),
        borderColor:uiColours.LIGHT_GRAY,
    },
    input: {
      borderWidth:moderateScale(1),
      borderColor:uiColours.LIGHT_GRAY,
      borderRadius:moderateScale(8),
      paddingLeft:scale(10),
      minHeight:moderateScale(42)
    },
    sendButton: {
        height: moderateScale(42),
        width: moderateScale(42),
        borderRadius: moderateScale(6),
        backgroundColor: uiColours.LIGHT_GRAY,
        alignItems: 'center',
        justifyContent: "center",
    },
    fullScreenImageContainer:{
        width:screenSize.width,
        height:screenSize.width,
    },
    closeIcon:{
        height: moderateScale(30),
        width: moderateScale(30),
        borderRadius: moderateScale(6),
        borderWidth:moderateScale(1),
        borderColor:uiColours.PRIMARY,
        justifyContent:"center",
        position:"absolute",
        alignItems:"center",
        top:verticalScale(20),
        alignSelf:'flex-end',
        right:scale(16),    
    },
    selectedImageView:{
        height:verticalScale(80),
        borderWidth:moderateScale(1),
        borderColor:uiColours.LIGHT_GRAY,
        borderRadius:moderateScale(8),
        width:'100%',
        marginBottom:verticalScale(5),
        padding:moderateScale(8),
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"flex-start"
    }
})
export default styles