import { Dimensions, StyleSheet } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { screenSize } from '../../utils/Styles/CommonStyles'
import { uiColours } from '../../utils/Styles/uiColors'


export const Styles = StyleSheet.create({
    footer: {
        alignSelf: 'center',
        paddingTop:verticalScale(16),
        borderTopWidth:moderateScale(1),
        borderColor:uiColours.LIGHT_GRAY,
        width:screenSize.width,
    }
})