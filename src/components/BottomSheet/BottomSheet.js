import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Modal from 'react-native-modal'
import styles from './Styles'
import CustomButton from '../Button/CustomButton'
import { buttonTypes } from '../../utils/Constents/constentStrings'
import { commonStyles } from '../../utils/Styles/CommonStyles'
import { Images } from '../../assets/images'
import { moderateScale } from 'react-native-size-matters'
import { AppContext } from '../../context/AppContext'
import { uiColours } from '../../utils/Styles/uiColors'

const BottomSheet = ({
    isVisible,
    children,
    onBackdropPress = () => {},
    title,
    hasCloseIcon,
    handleRightClick,
    modelStyles,
    containerStyles,
    hasBackButton,
    handleBackClick,
    showFooterButton = false,
    buttonActive,
    isDark,
    buttonTitle,
    handleButtonPress
}) => {
    const { appStyles } = useContext(AppContext)
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
                            hasCloseIcon ? <Images.close height={moderateScale(24)} width={moderateScale(24)} /> : <Text></Text>
                        }
                    </TouchableOpacity>
                </View>
                <View style={[{ padding: moderateScale(16) }, containerStyles]}>
                    {children}
                </View>

                {showFooterButton && <View style={styles.footer}>
                    <CustomButton
                        disabled={!buttonActive}
                        buttonStyle={{
                            backgroundColor: buttonActive ? uiColours.PRIMARY :
                                !buttonActive && isDark ? uiColours.GRAYED_BUTTON :
                                    uiColours.LIGHT_GRAY
                        }}
                        titleStyle={{
                            color: buttonActive ? uiColours.WHITE_TEXT : !buttonActive && isDark ? uiColours.GRAYED_BUTTON :
                                uiColours.GRAY_TEXT
                        }}
                        title={buttonTitle}
                        NavigationHandle={handleButtonPress}
                    />
                </View>}
            </View>
        </Modal>

    )
}

export default BottomSheet