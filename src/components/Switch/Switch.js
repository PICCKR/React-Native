import { View, TouchableOpacity, LayoutAnimation } from 'react-native'
import React, { useState } from 'react'
import Styles from './Styles'
import { scale } from 'react-native-size-matters'
import { uiColours } from '../../utils/Styles/uiColors'
import { toggleAnimation } from '../../animations/toggleAnimation'

const Switch = ({
    handleSwitchClicked = () => { },
    swithchStyle,
    initialValue
}) => {
console.log("initial value", initialValue);
    const [active, setActive] = useState(initialValue)

    const handleSwitchange = (val) => {
        LayoutAnimation.configureNext(toggleAnimation)
        setActive(val)
        handleSwitchClicked(val)
    }

    return (
            <TouchableOpacity
                onPress={() => handleSwitchange(!active)}
                activeOpacity={0.9}
                style={[Styles.switch,{backgroundColor:active ? uiColours.PRIMARY : uiColours.GRAY_TEXT}, swithchStyle]}>
                <View style={{
                    ...Styles.switchOff,
                    marginLeft: active ? scale(23) : scale(2),
                    backgroundColor: uiColours.WHITE_TEXT
                }}>
                </View>
            </TouchableOpacity>
    )
}

export default Switch