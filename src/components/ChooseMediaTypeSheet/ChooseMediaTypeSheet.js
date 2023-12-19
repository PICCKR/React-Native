import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import BottomSheet from '../BottomSheet/BottomSheet'
import styles from './Styles'
import { Images } from '../../assets/images'
import { moderateScale } from 'react-native-size-matters'

const ChooseMediaTypeSheet = ({
    isVisible,
    setShowMode,
    openCamara,
    chooseMedia
}) => {
    return (
        <BottomSheet
            isVisible={isVisible}
            hasCloseIcon
            title={"Choose media"}
            handleRightClick={() => {
                setShowMode(false)
            }}
            onBackdropPress={() => {
                setShowMode(false)
            }}
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity
                    style={styles.modalContainerItmes}
                    onPress={openCamara}
                >
                    <Images.camera height={moderateScale(30)} width={moderateScale(30)} />
                    <Text>camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.modalContainerItmes}
                    onPress={chooseMedia}
                >
                    <Image source={Images.gallary} style={{ height: moderateScale(30), width: moderateScale(30) }} />
                    <Text>gallary</Text>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    )
}

export default ChooseMediaTypeSheet