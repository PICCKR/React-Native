import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Styles'
import { Images } from '../../assets/images'
import { uiColours } from '../../utils/Styles/uiColors'
import { moderateScale } from 'react-native-size-matters'

const CheckBox = ({
    selected = false,
    handleCheck
}) => {
    return (
        <TouchableOpacity
            onPress={handleCheck}
            style={[styles.CheckBox,
            {
                backgroundColor: selected ? uiColours.PRIMARY : null,
                borderWidth: selected ? 0 : moderateScale(2)
            }
            ]}>
            {selected && <Images.check />}
        </TouchableOpacity>
    )
}

export default CheckBox