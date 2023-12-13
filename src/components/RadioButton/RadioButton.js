import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native'
import React, { useState } from 'react'
import Styles from './Styles'
import { scale } from 'react-native-size-matters'
import { toggleAnimation } from '../../animations/toggleAnimation'

const RadioButton = ({
    title,
    containerStyle,
    handleChecked = () => { }
}) => {
    const [checked, setChecked] = useState(false)

    const handleCheck = async (check) => {
        setChecked(check)
        handleChecked(check)
    }

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
                LayoutAnimation.configureNext(toggleAnimation)
                handleCheck(!checked)
            }}
            style={{ ...containerStyle, flexDirection: 'row', alignItems: 'center', }}
        >
            <View style={Styles.uncheck}>
                {checked && <View style={Styles.check}>

                </View>}
            </View>
            <Text style={[{ marginLeft: scale(10) }]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default RadioButton