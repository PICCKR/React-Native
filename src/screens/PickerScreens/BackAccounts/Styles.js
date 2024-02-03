import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({

    card: {
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(6),
        minHeight: verticalScale(45),
        flexDirection: 'row',
        alignItems: "flex-start",
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(8),
        justifyContent: 'space-between'
    },

    contentFlex: {
        flexDirection: 'row',
        // width: '80%',
        alignItems: "center"
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
    editIcon: {
        // alignSelf: "baseline"
    }
})
export default styles