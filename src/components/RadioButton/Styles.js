import { StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { uiColours } from '../../utils/Styles/uiColors'

const Styles = StyleSheet.create({
    uncheck: {
        height: moderateScale(20),
        width: moderateScale(20),
        borderRadius: moderateScale(10),
        borderWidth: moderateScale(2),
        borderColor: uiColours.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    check: {
        height: moderateScale(10),
        width: moderateScale(10),
        borderRadius: moderateScale(5),
        backgroundColor: uiColours.PRIMARY
    }
})

export default Styles