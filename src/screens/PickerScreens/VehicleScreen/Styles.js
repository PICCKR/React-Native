import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({

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
    },

    VehicleTypeView: {
        height: moderateScale((screenSize.width - scale(92)) / 4),
        width: moderateScale((screenSize.width - scale(92)) / 4),
        borderRadius: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: uiColours.PRIMARY,
        borderRadius: moderateScale(6)
    },
    VehicleType: {
        paddingVertical: verticalScale(10),
        alignItems: 'center',
        gap: verticalScale(5),
        justifyContent: 'center'
    },
    vehicleTypeIcon: {
        backgroundColor: uiColours.CREAM,
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
})
export default styles