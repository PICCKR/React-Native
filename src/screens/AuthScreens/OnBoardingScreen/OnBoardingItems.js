import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './Styles'
import { screenSize } from '../../../utils/Styles/CommonStyles'

const OnBoardingItems = ({ item, index, appStyles }) => {
    const ImageUrl = item?.img

    return (
        <View style={{width:screenSize.width}}>
            <View style={styles.contentView}>
                <Text style={[appStyles.extraLargeTexPrimary, styles.titelText]}>
                    {item.title}
                </Text>
                <Text style={[appStyles.mediumTextBlackGray,styles.descriptionText]}>
                    {item.description}
                </Text>
            </View>

            <Image
                style={styles.Image}
                source={ImageUrl}
            />
        </View>
    )
}

export default OnBoardingItems