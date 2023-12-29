import { StyleSheet } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { uiColours } from '../../utils/Styles/uiColors';


const styles = StyleSheet.create({
    iconView: {
        backgroundColor: uiColours.PRIMARY_LIGHT,
        padding: moderateScale(5),
        borderRadius: moderateScale(40),
        height:moderateScale(70),
        width:moderateScale(70),
        justifyContent:'center',
        alignItems:'center'
 
    },
    warningIconView:{
        backgroundColor: uiColours.LIGHT_RED,
        padding: moderateScale(5),
        borderRadius: moderateScale(35),
        alignItems:"center",
        justifyContent:'center',
        position:'absolute',
        bottom:0,
        left:scale(45)
    },
    footer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    }
});


export default styles;