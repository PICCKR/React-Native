import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { uiColours } from "../../utils/Styles/uiColors"

const Styles = StyleSheet.create({

    switch: {
        width: scale(40),
        height: verticalScale(20),
        borderRadius: moderateScale(30),
        // elevation: 7,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: uiColours.GRAY_TEXT
    },
    switchOff: {
        width: moderateScale(15),
        height: moderateScale(15),
        borderRadius: moderateScale(9),
        backgroundColor: uiColours.bottomTabBackground,
        // elevation: 4
    },
    switchOn: {
        width: moderateScale(22),
        height: moderateScale(22),
        borderRadius: moderateScale(45),
        backgroundColor: uiColours.bottomTabBackground,
        marginLeft: scale(18)
        // elevation: 4
    }

})
export default Styles