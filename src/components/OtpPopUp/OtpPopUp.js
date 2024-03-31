import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import styles from './Styles'
import BottomSheet from '../BottomSheet/BottomSheet'
import SheetFooter from '../SheetFooter/SheetFooter'
import { AppContext } from '../../context/AppContext'
import { uiColours } from '../../utils/Styles/uiColors'
import { screenSize } from '../../utils/Styles/CommonStyles'

const OtpPopUp = ({
    isVisible,
    setShowSheet,
    handleVerifyOtp,
    showResendOtp,
    headerTitle,
    title,
    subTitle,
    showOtpErr,
    setShowOtpErr
}) => {
    const { appStyles } = useContext(AppContext)
    const [buttonActive, setButtonActive] = useState(false)
    const [otp, setOTP] = useState('')

    useEffect(() => {
        if (otp.length === 6) {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }
    }, [otp])

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
            modelStyles={{
                position: Platform.OS === "android" ? 'absolute' : "relative",
                marginTop: Platform.OS === "android" ? 0 : "100%",
                paddingBottom: Platform.OS === "android" ? 0 : verticalScale(10),
                // paddingBottom: 100
                // height: verticalScale(350)
            }}
        >

            {/* <ScrollView style={{}}> */}
            <Text style={[appStyles.mediumTextPrimaryBold, { marginTop: Platform.OS === "ios" ? verticalScale(20) : 0 }]}>
                {title}
            </Text>
            <Text style={[appStyles.smallTextGray, { marginVertical: Platform.OS === "ios" ? verticalScale(15) : verticalScale(5) }]}>
                {subTitle}
            </Text>
            <OTPInputView
                onCodeFilled={(code) => {

                }}
                onCodeChanged={(code) => {
                    setOTP(code)
                    if (showOtpErr) {
                        setShowOtpErr(false)
                    }
                }}
                autoFocusOnLoad={false}
                pinCount={6}
                codeInputFieldStyle={[styles.underlineStyleBase, {
                    borderColor: showOtpErr ? uiColours.RED : uiColours.LIGHT_GRAY,
                }]}
                codeInputHighlightStyle={styles.borderStyleHighLighted}
                style={[styles.otpStyles]}
            // secureTextEntry
            />
            {
                showOtpErr && <Text style={[appStyles.smallTextGray, { color: uiColours.RED }]}>
                    The Pin Code you entered is invalid. Please enter the correct Pin Code.
                </Text>
            }

            {showResendOtp && <View style={styles.resendOtpView}>
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
            </View>}

            <SheetFooter
                buttonActive={buttonActive}
                buttonTitle="Confirm"
                handleButtonPress={() => handleVerifyOtp(otp)}
                footer={{ marginTop: Platform.OS === "ios" ? verticalScale(50) : 0 }}
            />
            {/* </KeyboardAvoidingView> */}
            {/* </ScrollView> */}


        </BottomSheet >
    )
}

export default OtpPopUp