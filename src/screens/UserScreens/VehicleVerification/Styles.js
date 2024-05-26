import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"

const styles = StyleSheet.create({
    termsView: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(10),
        marginVertical: verticalScale(16),
    },
    linkTextView: {
        paddingVertical: verticalScale(6),
        paddingRight: scale(10)
    },
})
export default styles