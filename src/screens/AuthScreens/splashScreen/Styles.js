import { Dimensions, StyleSheet } from 'react-native'
import { screenSize } from '../../../utils/Styles/CommonStyles'


export const Styles = StyleSheet.create({
    SplashScreenCantainer:{
        alignItems:"center",
        justifyContent:"center",
        height: screenSize.height,
        width:screenSize.width
    }
})