import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
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
    whyNeed:{
        flexDirection:'row',
        alignItems:"center",
        gap:scale(5),
        paddingVertical:verticalScale(5)
    }
})
export default styles