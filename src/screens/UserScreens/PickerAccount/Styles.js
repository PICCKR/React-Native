import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"

const styles = StyleSheet.create({
    paymentExpairy: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(6),
        marginBottom:verticalScale(10)
    }
})
export default styles