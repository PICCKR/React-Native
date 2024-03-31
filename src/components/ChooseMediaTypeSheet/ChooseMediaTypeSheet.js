import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import BottomSheet from '../BottomSheet/BottomSheet'
import styles from './Styles'
import { Images } from '../../assets/images'
import { moderateScale, verticalScale } from 'react-native-size-matters'

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
            title={"Upload Options"}
            handleRightClick={() => {
                setShowMode(false)
            }}
            onBackdropPress={() => {
                setShowMode(false)
            }}
        >
            <View style={styles.modalContainer}>
                <View style={{ alignItems: "center", gap: verticalScale(5) }}>
                    <TouchableOpacity
                        style={styles.modalContainerItmes}
                        onPress={openCamara}
                    >
                        <Images.camera height={moderateScale(24)} width={moderateScale(24)} />

                    </TouchableOpacity>
                    <Text>Camera</Text>
                </View>

                <View style={{ alignItems: "center", gap: verticalScale(5) }}>
                    <TouchableOpacity
                        style={styles.modalContainerItmes}
                        onPress={chooseMedia}
                    >
                        <Image source={Images.gallary} style={{ height: moderateScale(24), width: moderateScale(24) }} />
                    </TouchableOpacity>
                    <Text>Gallery</Text>
                </View>
            </View>
        </BottomSheet>
    )
}

export default ChooseMediaTypeSheet