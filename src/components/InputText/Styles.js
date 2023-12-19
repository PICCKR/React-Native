import { Platform, StyleSheet } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { screenSize } from '../../utils/Styles/CommonStyles'
import { uiColours } from '../../utils/Styles/uiColors'

export const styles = StyleSheet.create({
    inputContainer: {
        width:screenSize.width - scale(32)
    },
    textBox: {
        width:'100%',
        height:Platform.OS === 'android' ? "100%" : verticalScale(35)
    },
    inputBox:{
        flexDirection: "row",
        borderRadius: moderateScale(5),
        alignItems:"center",
        borderWidth:moderateScale(1),
        borderRadius:moderateScale(6),
        paddingLeft:scale(10),
        marginTop: Platform.OS === 'android' ? verticalScale(4) : verticalScale(0)
    },
    errorText: {
        fontSize: scale(12),
        color: uiColours.RED,
        zIndex: 10
    },
    star: {
        color: uiColours.RED,
        fontSize: scale(18),
        bottom: 5
    },
    inputTitle: {
        flexDirection: 'row',
    },
    rightViewStyles:{
        position:"absolute",
        height:'100%',
        width:'10%',
        right:0,
        alignItems:"center",
        justifyContent:'center'
    }
})
