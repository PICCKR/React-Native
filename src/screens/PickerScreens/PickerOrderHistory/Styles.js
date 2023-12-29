import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"


const styles = StyleSheet.create({
    profileView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal:scale(16),
        paddingBottom:verticalScale(16)
    },
    vehicleTypeIcon: {
        backgroundColor: uiColours.CREAM,
        height: moderateScale(48),
        width: moderateScale(48),
        borderRadius: moderateScale(25),
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionView:{
        padding: moderateScale(16),
    },
    tripDetails: {
        gap: verticalScale(20)
    },
    reviewCard:{
        paddingHorizontal:scale(12),
        paddingVertical:verticalScale(8),
        borderRadius:moderateScale(5),
        backgroundColor:uiColours.LIGHT_GRAY
    }
})
export default styles