import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"

const styles = StyleSheet.create({
    modal:{
        backgroundColor:"#fff",
        paddingVertical:verticalScale(20),
        paddingHorizontal:scale(20),
        borderRadius:moderateScale(6),
        alignItems:"center",
        gap:verticalScale(20)
    },
    buttonView:{
        justifyContent:'space-around',
        flexDirection:"row",
        width:'100%'
    }
})
export default styles