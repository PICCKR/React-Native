import { View, Text } from 'react-native'
import React from 'react'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import { verticalScale } from 'react-native-size-matters'

const WhyBvnSheet = ({
    isVisible,
    setShowSheet,
    appStyles
}) => {
    return (
        <BottomSheet
            isVisible={isVisible}
            hasCloseIcon
            title="Information"
            onBackdropPress={() => {
                setShowSheet(false)
            }}
            handleRightClick={() => {
                setShowSheet(false)
            }}
        >
            <Text style={appStyles.smallTextPrimary}>
                We use BVN to verify the following
            </Text>
            <Text style={appStyles.smallTextPrimary}>
                1. Name
            </Text>
            <Text style={appStyles.smallTextPrimary}>
                2. Email Address
            </Text>
            <Text style={appStyles.smallTextPrimary}>
                3. Phone Number
            </Text>
            <Text style={[appStyles.smallTextGray, {marginTop:verticalScale(10)}]}>
            Confirming your BVN helps us to ensure security and verify your identity.
            </Text>
        </BottomSheet>
    )
}

export default WhyBvnSheet