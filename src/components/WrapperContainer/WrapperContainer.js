import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import { uiColours } from '../../utils/Styles/uiColors'
import { AppContext } from '../../context/AppContext'
import Header from '../Header/Header'
import CustomButton from '../Button/CustomButton'
import { Styles } from './Styles'

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
    righyViewStyles
}) => {
    const { appStyles, isDark } = useContext(AppContext)
    return (
        <View style={{ flex: 1, backgroundColor: uiColours.WHITE_TEXT, ...containerStyle }}>
            <StatusBar backgroundColor={StatusBarColor} barStyle={barStyle} />
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
                />


                <View style={[appStyles.containerPadding, containerPadding]}>
                    {children}
                </View>


                {showFooterButton && <View style={Styles.footer}>
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
            </SafeAreaView>
        </View>

    )
}

export default WrapperContainer