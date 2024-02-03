import { View, Text } from 'react-native'
import React from 'react'
import Styles from './Styles'
import { moderateScale } from 'react-native-size-matters'
import { Images } from '../../assets/images'

const VehicleIconView = ({
    iconContainer,
    size = moderateScale(72)
}) => {
    return (
        <View style={[Styles.iconContainer, {
            height: moderateScale(size),
            width: moderateScale(size),
            borderRadius: moderateScale(size) / 2,
        }, iconContainer]}>
            <Images.scooter />
        </View>
    )
}

export default VehicleIconView