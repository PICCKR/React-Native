import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import BottomSheet from '../BottomSheet/BottomSheet'
import SheetFooter from '../SheetFooter/SheetFooter'
import { Images } from '../../assets/images'
import styles from './Styles'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { uiColours } from '../../utils/Styles/uiColors'
import { AppContext } from '../../context/AppContext'
import CustomButton from '../Button/CustomButton'
import { buttonTypes } from '../../utils/Constents/constentStrings'

const ConfirmationSheet = ({
    isVisible,
    setShowSheet,
    handleButton2Click = () => { },
    handleButton1Click = () => { },
    renderIcon = () => { },
    title,
    discription,
    button1Title = "button1Title",
    button2Title = "button2Title",
    headerTitle
}) => {
    const { appStyles } = useContext(AppContext)

    return (
        <BottomSheet
            isVisible={isVisible}
            hasCloseIcon
            title={headerTitle}
            onBackdropPress={() => {
                setShowSheet(false)
            }}
            handleRightClick={() => {
                setShowSheet(false)
            }}
        >
            <View style={{ alignItems: 'center', gap: verticalScale(10), paddingBottom: verticalScale(16) }}>
                <View>
                    {renderIcon()}
                </View>

                <Text style={[appStyles.mediumTextPrimaryBold, { color: uiColours.RED, textAlign: 'center' }]}>
                    {title}
                </Text>
                {discription && <Text style={[appStyles.smallTextGray, { textAlign: 'center' }]}>
                    {discription}
                </Text>}
            </View>
            <View style={styles.footer}>

                <CustomButton
                    hasOutLine
                    hasBackground={false}
                    title={button1Title}
                    buttonType={buttonTypes.MEDIUM}
                    NavigationHandle={handleButton1Click}
                />
                <CustomButton
                    title={button2Title}
                    buttonType={buttonTypes.MEDIUM}
                    NavigationHandle={handleButton2Click}
                />
            </View>

        </BottomSheet>
    )
}

export default ConfirmationSheet