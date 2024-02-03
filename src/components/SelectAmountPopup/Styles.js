import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../utils/Styles/CommonStyles"
import { uiColours } from "../../utils/Styles/uiColors"


const styles = StyleSheet.create({
    priceCard: {
        width: (screenSize.width - scale(64)) / 3,
        height: (screenSize.width - scale(64)) / 3,
        borderWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        borderRadius: moderateScale(8),
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: verticalScale(16)
    },
    priceList: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
        marginTop: verticalScale(16)
    },


})
export default styles