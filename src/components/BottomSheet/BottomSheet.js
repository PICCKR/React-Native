import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import styles from './Styles'
import CustomButton from '../Button/CustomButton'
import { buttonTypes } from '../../utils/Constents/constentStrings'
import { commonStyles } from '../../utils/Styles/CommonStyles'
import { Images } from '../../assets/images'
import { moderateScale } from 'react-native-size-matters'

const BottomSheet = ({
    isVisible,
    children,
    onBackdropPress,
    title,
    hasCloseIcon,
    handleRightClick,
    modelStyles
}) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            style={{ margin: 0 }}
            animationIn="fadeInUp"
            animationOut="fadeOut"
        >
            <View style={[styles.modal, modelStyles]}>
                <View style={styles.header}>
                    <Text style={[commonStyles.mediumTextPrimaryBold, styles.titleText]}>
                        {title}
                    </Text>
                    <TouchableOpacity
                        onPress={handleRightClick}
                    >
                        {
                            hasCloseIcon ? <Images.close height={moderateScale(24)} width={moderateScale(24)} /> : <Text></Text>
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ padding: moderateScale(16)}}>
                    {children}
                </View>

            </View>
        </Modal>

    )
}

export default BottomSheet