import { Dimensions, StyleSheet } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { uiColours } from '../../../utils/Styles/uiColors'


export const Styles = StyleSheet.create({
    formView: {
       
    },
    termsView: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(10),
        marginTop: verticalScale(10)
    },
    linkTextView: {
        paddingVertical: verticalScale(6),
        paddingRight: scale(10)
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        paddingVertical:verticalScale(16),
        borderTopWidth:moderateScale(1),
        borderColor:uiColours.LIGHT_GRAY
    }
})