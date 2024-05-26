import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import SheetFooter from '../../../components/SheetFooter/SheetFooter'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import styles from './Styles'
import { uiColours } from '../../../utils/Styles/uiColors'
import { AppContext } from '../../../context/AppContext'
import { useSelector } from 'react-redux'

const OtpPopUp = ({
    isVisible,
    setShowSheet,
    handleVerifyOtp,
    appStyles,
    isDark
}) => {
    const { } = useContext(AppContext)
    const userData = useSelector((state) => state?.userDataReducer?.userData)
    const [buttonActive, setButtonActive] = useState(false)
    const [otp, setOTP] = useState('')

    useEffect(() => {
        if (otp.length == 5) {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }
    }, [otp])

    return (
        <BottomSheet
            isVisible={isVisible}
            hasCloseIcon
            title="Verification"
            onBackdropPress={() => {
                setShowSheet(false)
            }}
            handleRightClick={() => {
                setShowSheet(false)
            }}
        >
            <ScrollView style={{}}>

                <Text style={[appStyles.mediumTextPrimaryBold]}>
                    OTP Verification
                </Text>
                <Text style={[appStyles.smallTextGray, { marginTop: verticalScale(5) }]}>
                    The OTP code will be sent to the phone number
                </Text>
                <Text style={appStyles.smallTextGray}>
                    {userData?.phoneNumber}
                </Text>

                <OTPInputView
                    onCodeFilled={(code) => {
                        setOTP(code)
                    }}
                    autoFocusOnLoad={false}
                    selectionColor={uiColours.LIGHT_GRAY}
                    pinCount={5}
                    codeInputFieldStyle={[styles.underlineStyleBase, {
                        color: isDark ? uiColours.WHITE_TEXT : uiColours.BLACK_TEXT
                    }]}
                    codeInputHighlightStyle={styles.borderStyleHighLighted}
                    style={[styles.otpStyles]}
                    secureTextEntry
                />

                <View style={styles.resendOtpView}>
                    <Text style={appStyles.smallTextBlack}>
                        Didn’t receive code?
                    </Text>
                    <TouchableOpacity
                        style={{ padding: moderateScale(5) }}
                    >
                        <Text style={appStyles.smallTextPrimaryBold}>
                            Resend
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <SheetFooter
                buttonActive={buttonActive}
                buttonTitle="Confirm"
                handleButtonPress={handleVerifyOtp}
            />
        </BottomSheet>
    )
}

export default OtpPopUp