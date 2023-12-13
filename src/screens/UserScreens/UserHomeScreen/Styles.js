import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { screenSize } from "../../../utils/Styles/CommonStyles"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    homeScreenContainer: {
        paddingHorizontal: scale(16)
    },
    profileView: {
        height: moderateScale(50),
        width: moderateScale(50),
        borderRadius: moderateScale(25),
        borderWidth: moderateScale(1),
        borderColor: uiColours.PRIMARY,
        backgroundColor: uiColours.WHITE_TEXT,
        alignItems: "center",
        justifyContent: 'center',
    },
    headerContainer: {
        padding: moderateScale(16),
        backgroundColor: uiColours.PRIMARY
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: "center",
        gap: scale(10)
    },
    walletView: {
        padding: moderateScale(16),
        backgroundColor: uiColours.WHITE_TEXT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        borderRadius: moderateScale(8),
        marginTop: verticalScale(16)
    },
    recentDestinationView: {
        gap: verticalScale(10),
        marginTop: verticalScale(16)
    },
    becomePickerView: {
        height: verticalScale(110),
        width: screenSize.width - scale(32),
        borderRadius: moderateScale(8)
    },
    VehicleType: {
        paddingVertical: verticalScale(10),
        alignItems: 'center',
        gap: verticalScale(5)
    },
    vehicleTypeIcon: {
        backgroundColor: uiColours.CREAM,
        height: moderateScale(70),
        width: moderateScale(70),
        borderRadius: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center'
    },
    vehicleTypeList: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    whyPickerItemList: {
        gap:scale(16),
        marginVertical:verticalScale(16)
    },
    whyPickerItem: {
        flexDirection: 'row',
        alignItems: "center",
        gap:scale(16)
    }
})
export default styles