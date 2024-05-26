import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { uiColours } from '../../../utils/Styles/uiColors'
import styles from './Styles'
import { moderateScale } from 'react-native-size-matters'
import { Images } from '../../../assets/images'

const FullScreenImagePopUp = ({
    isVisible,
    image,
    setShowSheet
}) => {
    return (
        <Modal
            isVisible={isVisible}
            style={{ margin: 0, backgroundColor: uiColours.BLACK }}
            animationInTiming={500}
            animationOutTiming={500}
            animationIn="fadeInUp"
        >
            <View style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
                <TouchableOpacity
                    style={styles.closeIcon}
                    onPress={()=>{
                        setShowSheet(false)
                    }}
                >
                    <Images.close />
                </TouchableOpacity>
                <View style={[styles.fullScreenImageContainer]}>
                    <Image
                        source={{ uri: image }}
                        style={{ height: "100%", width: "100%" }}
                        resizeMode="cover"
                    />
                </View>
            </View>

        </Modal>
    )
}

export default FullScreenImagePopUp