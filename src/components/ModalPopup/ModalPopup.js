import { View, Text } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import styles from './Styles'
import CustomButton from '../Button/CustomButton'
import { buttonTypes } from '../../utils/Constents/constentStrings'
import { commonStyles } from '../../utils/Styles/CommonStyles'

const ModalPopup = ({
    isVisible,
    title,
    description,
    buttonTitle1,
    buttonTitle2,
    handleButton1,
    handleButton2,
    onBackdropPress
}) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
        >
            <View style={styles.modal}>
                
            </View>
        </Modal>

    )
}

export default ModalPopup