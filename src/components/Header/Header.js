import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import styles from './Styles'
import { Images } from '../../assets/images'
import { AppContext } from '../../context/AppContext'
import { commonStyles } from '../../utils/Styles/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import { moderateScale } from 'react-native-size-matters'
import { uiColours } from '../../utils/Styles/uiColors'

const Header = ({
    showBackButton,
    centerTitle,
    rightTitle,
    handlerRightViewPress,
    leftTitle,
    hasCloseIcon,
    leftViewStyles,
    centerViewStyles,
    righyViewStyles,
    headerContainer,
    handleBack
}) => {
    const { appStyles, isDark } = useContext(AppContext)
    const navigation = useNavigation()
    return (
        <View style={[styles.headerContainer, {
            borderColor:isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY 
        }, headerContainer]}>
            <View style={[styles.leftView, leftViewStyles]}>
                {
                    showBackButton ? <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBack}
                    >
                        {isDark ? <Images.backArrowWhite />
                            :
                            <Images.backArrow />}
                    </TouchableOpacity> :
                        <Text style={isDark ? appStyles.mediumTextWhiteBold : appStyles.mediumTextPrimaryBold}>
                            {leftTitle}
                        </Text>
                }

            </View>

            <View style={[styles.centerView, centerViewStyles]}>
                <Text style={[isDark ? appStyles.mediumTextWhite : appStyles.mediumTextBlack, styles.centerText]}>
                    {centerTitle}
                </Text>
            </View>
            <View style={[styles.righyView, righyViewStyles]}>
                <TouchableOpacity
                    style={{ padding: moderateScale(3) }}
                    onPress={handlerRightViewPress}
                >
                    {rightTitle && <Text style={[appStyles.mediumTextPrimary, styles.rightText]}>
                        {rightTitle}
                    </Text>}
                    {hasCloseIcon && <Images.close />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header