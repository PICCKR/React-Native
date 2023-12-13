import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"

const styles = StyleSheet.create({
    input:{
         marginTop: verticalScale(16),
         marginBottom:verticalScale(8)
    },
   
    footer: {
        position:'absolute',
        bottom:verticalScale(16),
        alignSelf: 'center',
     }
})
export default styles