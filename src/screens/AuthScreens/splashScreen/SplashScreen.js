import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { Styles } from './Styles'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { AppContext } from '../../../context/AppContext'

const SplashScreen = () => {
    const { appStyles } = useContext(AppContext)

    return (
        <View style={Styles.SplashScreenCantainer}>
            <Animated.View entering={FadeInUp.delay(200).duration(600).springify()}>
                <Text style={[appStyles.largeTextBalckBold]}>Saving your money</Text>
            </Animated.View>
        </View>
    )
}

export default SplashScreen