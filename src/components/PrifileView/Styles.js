import { StyleSheet } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { uiColours } from '../../utils/Styles/uiColors'

const Styles = StyleSheet.create({
    profileView: {
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: "center"
    },
    vehicle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: uiColours.PRIMARY_LIGHT,
        padding: moderateScale(5),
        borderRadius: moderateScale(15)
    },
    editIcon:{
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: uiColours.BLACK,
        padding: moderateScale(5),
        borderRadius: moderateScale(15)
    },
    profileSection: {
        alignItems: "center",
        paddingBottom: verticalScale(16),
    }
})

export default Styles