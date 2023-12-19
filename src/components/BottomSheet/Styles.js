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
    buttonView:{
        justifyContent:'space-around',
        flexDirection:"row",
        width:'100%'
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        borderBottomWidth:moderateScale(1),
        padding:moderateScale(16),
        borderColor:uiColours.LIGHT_GRAY
    },
    footer: {
        alignSelf: 'center',
        paddingVertical:verticalScale(16),
        borderTopWidth:moderateScale(1),
        borderColor:uiColours.LIGHT_GRAY,
        width:screenSize.width
    }
})
export default styles