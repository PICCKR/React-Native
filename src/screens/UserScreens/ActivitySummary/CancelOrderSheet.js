import { View, Text } from 'react-native'
import React from 'react'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import SheetFooter from '../../../components/SheetFooter/SheetFooter'
import { Images } from '../../../assets/images'
import styles from '../DisputeScreen/Styles'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { uiColours } from '../../../utils/Styles/uiColors'

const CancelOrderSheet = ({
    isVisible,
    setShowSheet,
    handleCancelOrder,
    appStyles
}) => {

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
            <View style={{alignItems:'center', gap:verticalScale(6), paddingBottom:verticalScale(16)}}>
                <View>
                    <View style={styles.pickerVehicle}>
                        <Images.car height={moderateScale(50)} width={moderateScale(50)} />
                    </View>
                    <View style={styles.warkingIconView}>
                        <Images.warning height={moderateScale(15)} width={moderateScale(15)} />
                    </View>
                </View>

                <Text style={appStyles.smallTextPrimaryBold}>
                    Are you sure you want to cancel this order?
                </Text>
                <Text style={[appStyles.smallTextPrimary,{color:uiColours.RED}]}>
                You will be charged $5 if you cancel your order
                </Text>
            </View>

            <SheetFooter
                buttonActive={true}
                buttonTitle="Cancel order"
                handleButtonPress={handleCancelOrder}
            />
        </BottomSheet>
    )
}

export default CancelOrderSheet