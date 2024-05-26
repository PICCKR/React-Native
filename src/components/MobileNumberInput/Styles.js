import { Dimensions, StyleSheet } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { screenSize } from '../../utils/Styles/CommonStyles'
import { uiColours } from '../../utils/Styles/uiColors'


const Styles = StyleSheet.create({
    conatiner:{
        flexDirection:'row',
        alignItems:'center',
        height:verticalScale(50),
        borderWidth:moderateScale()
    },
    countryView:{
        width:screenSize.width / 3,
        borderRightWidth:moderateScale(1),
        height:'100%',
        alignItems:'center',
        flexDirection:"row",
        padding:moderateScale(10),
        justifyContent:"space-between"
    },
    listItems:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        
    },
    uncheck:{
        height: moderateScale(20),
        width: moderateScale(20),
        borderRadius: moderateScale(10),
        borderWidth: moderateScale(2),
        borderColor: uiColours.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    check: {
        height: moderateScale(10),
        width: moderateScale(10),
        borderRadius: moderateScale(5),
        backgroundColor: uiColours.PRIMARY
    },
    flagView:{
        borderWidth:moderateScale(1), 
        borderColor:uiColours.LIGHT_GRAY,
        height:moderateScale(20), 
        width:moderateScale(31),
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Styles