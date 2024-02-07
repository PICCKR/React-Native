import { View, Text } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import styles from './Styles'
import WrapperContainer from '../WrapperContainer/WrapperContainer'

const FullScreenModal = ({
    setShowModal,
    isVisible,
    leftTitle,
    hasCloseIcon,
    buttonTitle,
    handleButtonPress,
    children,
    buttonActive,
    leftViewStyles,
    centerViewStyles,
    righyViewStyles

}) => {
    return (
        // <Modal
        //     isVisible={isVisible}
        //     style={{}}
        //     animationIn="fadeInUp"
        //     animationOut="fadeOut"
        //     onBackdropPress={() => {
        //         setShowModal(false)
        //     }}
        // >

        <WrapperContainer
            leftTitle={leftTitle}
            hasCloseIcon={hasCloseIcon}
            buttonTitle={buttonTitle}
            handleButtonPress={handleButtonPress}
            buttonActive={buttonActive}
            leftViewStyles={leftViewStyles}
            centerViewStyles={centerViewStyles}
            righyViewStyles={righyViewStyles}
            handlerRightViewPress={() => {
                setShowModal(false)
            }}
            containerStyle={{
                position: 'absolute'
            }}
        >
            {children}
        </WrapperContainer>

        // {children}
        // </Modal>
    )
}

export default FullScreenModal