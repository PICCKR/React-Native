import { View, Text, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState } from 'react'
import Modal from 'react-native-modal'
import styles from './Styles'
import CustomButton from '../Button/CustomButton'
import { buttonTypes } from '../../utils/Constents/constentStrings'
import { commonStyles, screenSize } from '../../utils/Styles/CommonStyles'
import { Images } from '../../assets/images'
import { moderateScale } from 'react-native-size-matters'
import { AppContext } from '../../context/AppContext'
import { uiColours } from '../../utils/Styles/uiColors'

const BottomSheet = ({
    isVisible,
    children,
    onBackdropPress = () => { },
    title,
    hasCloseIcon,
    handleRightClick,
    modelStyles,
    containerStyles,
    hasBackButton,
    handleBackClick,
    showFooterButton = false,
    buttonActive,
    buttonTitle,
    handleButtonPress,
    renderRightView = () => { },
    modelBgStyles,
    keyboardVerticalOffset = 100
}) => {
    const { appStyles, isDark } = useContext(AppContext)
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            style={[{ margin: 0, backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255,0.1)' }, modelBgStyles]}
            animationInTiming={500}
            animationOutTiming={500}
            animationIn="fadeInUp"
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <View style={[styles.modal, {
                    backgroundColor: isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT
                }, modelStyles]}>
                    <View style={[styles.header, {
                        borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                    }]}>
                        <View style={commonStyles.flexRowAlnCtr}>
                            {hasBackButton && <TouchableOpacity
                                onPress={handleBackClick}
                            >
                                <Images.backArrow height={moderateScale(24)} width={moderateScale(24)} />

                            </TouchableOpacity>}
                            <Text style={[appStyles.mediumTextPrimaryBold, styles.titleText]}>
                                {title}
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={handleRightClick}
                        >
                            {
                                hasCloseIcon ? <Images.close height={moderateScale(24)} width={moderateScale(24)} />
                                    : renderRightView()
                            }
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={[{ padding: moderateScale(16) }, containerStyles]}>
                        {children}
                    </ScrollView>

                    {showFooterButton && <View style={[styles.footer, {
                        borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                    }]}>
                        <CustomButton
                            disabled={!buttonActive}
                            buttonStyle={{
                                backgroundColor: buttonActive ? uiColours.PRIMARY :
                                    !buttonActive && isDark ? uiColours.GRAYED_BUTTON :
                                        uiColours.LIGHT_GRAY
                            }}
                            titleStyle={{
                                color: buttonActive ? uiColours.WHITE_TEXT : (!buttonActive && isDark) ? uiColours.GRAY_TEXT :
                                    uiColours.GRAY_TEXT
                            }}
                            title={buttonTitle}
                            NavigationHandle={handleButtonPress}
                        />
                    </View>}
                </View>
            </KeyboardAvoidingView>
        </Modal>

    )
}

export default BottomSheet