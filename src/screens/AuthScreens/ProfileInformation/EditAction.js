import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Styles'
import { Images } from '../../../assets/images'
import { moderateScale, scale } from 'react-native-size-matters'
import { commonStyles } from '../../../utils/Styles/CommonStyles'

const EditAction = ({
    title,
    handlePress,
    val,
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
            <View style={{ flexDirection: "row", alignItems: 'center', gap: scale(10), }}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={
                    [appStyles.smallTextBlack, {
                        maxWidth: scale(200),
                    }]}>
                    {val}
                </Text>
                <Images.rightArrow height={moderateScale(24)} />
            </View>

        </TouchableOpacity>
    )
}

export default EditAction