import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({

    addressSheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    addresCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY
    },
    addresEditIcon: {
        height: moderateScale(24),
        width: moderateScale(24),
        alignItems: "center",
        justifyContent: 'center',
    },
    setAddress: {
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(6),
        borderColor: uiColours.LIGHT_GRAY,
        minHeight: verticalScale(45),
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: scale(10),
        gap: scale(10),
        paddingVertical: verticalScale(8)

    }
})
export default styles