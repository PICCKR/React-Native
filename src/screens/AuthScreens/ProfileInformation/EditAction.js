import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Styles'
import { Images } from '../../../assets/images'
import { moderateScale, scale } from 'react-native-size-matters'
import { commonStyles } from '../../../utils/Styles/CommonStyles'

const EditAction = ({
    title,
    handlePress,
    addressVal,
    appStyles
}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            style={styles.deatilsEditbutton}
        >
            <Text style={appStyles.smallTextGray}>
                {title}
            </Text>
            <View style={{flexDirection:"row", alignItems:'center', gap:scale(10)}}>
                {addressVal && <Text>
                {addressVal}
                </Text>}
                <Images.rightArrow height={moderateScale(24)} />
            </View>

        </TouchableOpacity>
    )
}

export default EditAction