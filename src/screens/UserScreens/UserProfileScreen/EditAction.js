import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import styles from './Styles'
import { Images } from '../../../assets/images'
import { moderateScale, scale } from 'react-native-size-matters'
import { AppContext } from '../../../context/AppContext'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import Switch from '../../../components/Switch/Switch'

const EditAction = ({
    title,
    handlePress,
    addressVal,
    appStyles,
    disabled,
    value,
    showSwitch,
    showSwitchValue,
    switchInitialValue,
    handleSwitchClicked,
    showArrow
}) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={styles.deatilsEditbutton}
            onPress={() => handlePress(title)}
        >
            <Text style={[appStyles.smallTextGray]}>
                {title}
            </Text>

            {value && <Text>
                {value}
            </Text>
            }
            {showSwitch &&
                <View style={commonStyles.flexRowAlnCtr}>
                    <Text style={appStyles.smallTextGray}>{showSwitchValue}</Text>
                    <Switch
                        initialValue={switchInitialValue}
                        handleSwitchClicked={(status) => {
                            handleSwitchClicked(status)
                        }}
                    />
                </View>}

            {showArrow &&
                <Images.rightArrow height={moderateScale(24)} />
            }

        </TouchableOpacity>
    )
}

export default EditAction