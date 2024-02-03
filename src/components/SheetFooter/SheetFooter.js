import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { Styles } from './Styles'
import CustomButton from '../Button/CustomButton'
import { uiColours } from '../../utils/Styles/uiColors'
import { AppContext } from '../../context/AppContext'

const SheetFooter = ({
    buttonActive,
    buttonTitle,
    handleButtonPress,
    footer
}) => {
    const { appStyles, isDark } = useContext(AppContext)
    return (
        <View style={[Styles.footer, footer,{
            borderColor:isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
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
        </View>
    )
}

export default SheetFooter