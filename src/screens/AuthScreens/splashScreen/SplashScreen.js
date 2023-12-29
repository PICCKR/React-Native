import { View, Text, Image, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import { Styles } from './Styles'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { AppContext } from '../../../context/AppContext'
import { verticalScale } from 'react-native-size-matters'
import { screenSize } from '../../../utils/Styles/CommonStyles'

const SplashScreen = () => {
    const { appStyles } = useContext(AppContext)


    return (
        <View style={Styles.SplashScreenCantainer}>
            <ImageBackground
                style={{ flex: 1, width: "100%", height: "100%" }}
                source={require("../../../assets/images/splashScreenGif.gif")}
            >
                <Text style={[appStyles.smallTextWhite,{
                    alignSelf:"center",
                    marginTop:screenSize.height - verticalScale(100)
                }]}>Version 1.0.0</Text>
            </ImageBackground>


        </View >
    )
}

export default SplashScreen