import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../utils/Styles/CommonStyles"
import { uiColours } from "../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    headerContainer: {
        paddingVertical: moderateScale(10),
        flexDirection: "row",
        width: screenSize.width,
        alignItems: "center",
        borderBottomWidth:moderateScale(1),
        justifyContent:"space-between",
    },
    leftView: {
        width: (screenSize.width - moderateScale(32)) / 3,
        paddingLeft:scale(10),
    },
    backButton: {
        height: moderateScale(30),
        width: moderateScale(30),
        justifyContent: "center",
        alignItems: "flex-start"
    },
    centerView: {
        minWidth: (screenSize.width - moderateScale(32)) / 3,
        alignItems: 'center',
    },
    righyView: {
        width: (screenSize.width - moderateScale(32)) / 3,
        alignItems: "flex-end",
        paddingRight:scale(16)
    },
    rightText: {

    }
})
export default styles