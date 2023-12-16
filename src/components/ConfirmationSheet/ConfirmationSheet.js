import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import BottomSheet from '../BottomSheet/BottomSheet'
import SheetFooter from '../SheetFooter/SheetFooter'
import { Images } from '../../assets/images'
import styles from './Styles'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { uiColours } from '../../utils/Styles/uiColors'
import { AppContext } from '../../context/AppContext'

const ConfirmationSheet = ({
    isVisible,
    setShowSheet,
    handleButtonClick = () => {},
    renderIcon = () => { },
    title,
    discription,
    buttonTitle
}) => {
    const { appStyles } = useContext(AppContext)

    return (
        <BottomSheet
            isVisible={isVisible}
            hasCloseIcon
            title="Confirmation"
            onBackdropPress={() => {
                setShowSheet(false)
            }}
            handleRightClick={() => {
                setShowSheet(false)
            }}
        >
            <View style={{ alignItems: 'center', gap: verticalScale(6), paddingBottom: verticalScale(16) }}>
                <View>
                    <View style={styles.iconView}>
                        {renderIcon()}
                    </View>
                    <View style={styles.warningIconView}>
                        <Images.warning height={moderateScale(15)} width={moderateScale(15)} />
                    </View>
                </View>

                <Text style={appStyles.smallTextPrimaryBold}>
                    {title}
                </Text>
                {discription && <Text style={[appStyles.smallTextPrimary, { color: uiColours.RED }]}>
                    {discription}
                </Text>}
            </View>

            <SheetFooter
                buttonActive={true}
                buttonTitle={buttonTitle}
                handleButtonPress={handleButtonClick}
            />
        </BottomSheet>
    )
}

export default ConfirmationSheet