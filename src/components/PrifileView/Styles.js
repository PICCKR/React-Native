import { StyleSheet } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { uiColours } from '../../utils/Styles/uiColors'

const Styles = StyleSheet.create({
    profileView: {
        backgroundColor: "#F0E796",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: verticalScale(10),
        alignSelf:"center"
    },
    vehicle:{
        position:"absolute",
        bottom:0,
        right:0,
        backgroundColor:uiColours.PRIMARY_LIGHT,
        padding:moderateScale(5),
        borderRadius:moderateScale(15)

    }
})

export default Styles