import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    activityScreenContainer: {
        width: '100%'
    },
    tabContainerItem: {
        alignItems: "center",
        justifyContent: "center",
        width: '33.33%',
        borderBottomWidth: moderateScale(1),
        paddingBottom: verticalScale(16)
    },
    label: {
        borderRadius: moderateScale(4),
        justifyContent: 'center',
        alignItems: "center",
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(4)
    },
    bubble: {
        height: moderateScale(20),
        width: moderateScale(20),
        borderRadius: moderateScale(10),
        backgroundColor: uiColours.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(5)
    },
    tripCard: {
        padding: moderateScale(16),
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(8),
        gap: verticalScale(20),
        marginTop: verticalScale(15)
    },
    deleteButton: {
        height: verticalScale(40),
        width: moderateScale(40),
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    bigPercent: {
        height: verticalScale(36),
        alignItems: "center",
        justifyContent: "center",
        borderWidth: moderateScale(1),
        flex: 1,
        borderRadius: moderateScale(6)
    },
    waitingButton: {
        width: "100%",
        height: verticalScale(40),
        borderRadius: moderateScale(6),
        justifyContent: "center",
        alignItems: "center"
    }
})
export default styles