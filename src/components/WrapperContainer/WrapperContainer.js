import { View, Text, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useContext } from 'react'
import { uiColours } from '../../utils/Styles/uiColors'
import { AppContext } from '../../context/AppContext'
import Header from '../Header/Header'
import CustomButton from '../Button/CustomButton'
import { Styles } from './Styles'
import { verticalScale } from 'react-native-size-matters'

const WrapperContainer = ({
    StatusBarColor = uiColours.PRIMARY,
    barStyle = "dark-content",
    containerStyle = {},
    children,
    centerTitle,
    handlerRightViewPress,
    rightTitle,
    showBackButton,
    showFooterButton = true,
    buttonActive,
    buttonTitle,
    handleButtonPress,
    containerPadding,
    leftTitle,
    hasCloseIcon,
    leftViewStyles,
    centerViewStyles,
    righyViewStyles,
    handleBack = () => { }
}) => {
    const { appStyles, isDark } = useContext(AppContext)
    return (
        <View style={{ flex: 1, backgroundColor: uiColours.WHITE_TEXT, ...containerStyle }}>
            {/* <StatusBar backgroundColor={StatusBarColor} barStyle={barStyle} /> */}

            {/* <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "position"}
                keyboardVerticalOffset={Platform.OS === "ios" ? verticalScale(100) : 0}
            > */}
            <SafeAreaView style={[appStyles.container,]}>
                <Header
                    leftTitle={leftTitle}
                    centerTitle={centerTitle}
                    handlerRightViewPress={handlerRightViewPress}
                    rightTitle={rightTitle}
                    showBackButton={showBackButton}
                    hasCloseIcon={hasCloseIcon}
                    leftViewStyles={leftViewStyles}
                    centerViewStyles={centerViewStyles}
                    righyViewStyles={righyViewStyles}
                    handleBack={handleBack}
                    isDark={isDark}
                />


                <View style={[appStyles.containerPadding, {
                    paddingBottom: showFooterButton ? verticalScale(16) : 0,
                    paddingTop: verticalScale(16)
                }, containerPadding]}>
                    {children}
                </View>


                {showFooterButton && <View style={[Styles.footer,
                {
                    backgroundColor: isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT,
                    borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY,
                }
                ]}>
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
            </SafeAreaView>
            {/* </KeyboardAvoidingView> */}
        </View>

    )
}

export default WrapperContainer