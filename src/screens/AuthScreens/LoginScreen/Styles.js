import { StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters'

const styles = StyleSheet.create({

    formView: {
        marginTop: verticalScale(24),
        marginBottom:verticalScale(50)
    },


    forgotPassword: {
        alignSelf: "flex-end",
        paddingVertical: verticalScale(16),
    },

    footer: {
       position:'absolute',
       bottom:verticalScale(16),
       alignSelf: 'center',
    }



})

export default styles