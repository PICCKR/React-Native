import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../../../context/AppContext'
import InputText from '../../../components/InputText/InputText'
import { Images } from '../../../assets/images'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { showToast } from '../../../components/tostConfig/tostConfig'
import { tostMessagetypes } from '../../../utils/Constents/constentStrings'
import { AuthRouteStrings } from '../../../utils/Constents/RouteStrings'
import useBackButton from '../../../customHooks/useBackButton'
import { confirmResetPassword, resetPassword } from '@aws-amplify/auth'
import Actions from '../../../redux/Actions'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { uiColours } from '../../../utils/Styles/uiColors'
import styles from './Styles'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import { showErrorToast } from '../../../helper/showErrorToast'
import { RegEx } from '../../../utils/Constents/regulerexpressions'

const ChangePassword = ({ route }) => {
    const phoneNumber = route?.params?.phoneNumber
    const { appStyles, isDark } = useContext(AppContext)
    const navigation = useNavigation()
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [buttonActive, setButtonActive] = useState(false)
    const [otp, setOTP] = useState('')
    const [showError, setShowError] = useState({
        password: false,
        otp: false
    })



    const handleChangePassword = async () => {
        if (!RegEx.password.test(password)) {
            setShowError({
                ...showError,
                password: true
            })
        } else {
            setShowError({
                ...showError,
                password: false
            })
            Actions.showLoader(true)
            await confirmResetPassword({
                username: phoneNumber.replace(/\s+/g, ''),
                confirmationCode: otp,
                newPassword: password,
            }).then((res) => {
                Actions.showLoader(false)
                const toastMsgConfg = {
                    isDark: isDark,
                    msg: "You have successfully changed your password. Please log back into your account using the new password."
                }
                showToast(toastMsgConfg, tostMessagetypes.SUCCESS, isDark)
                // return
                navigation.navigate(AuthRouteStrings.LOGIN_SCREEN)

            }).catch((err) => {
                Actions.showLoader(false)
                const toastMsgConfg = {
                    isDark: isDark,
                    msg: err?.message
                }
                showToast(toastMsgConfg, tostMessagetypes.ERROR, isDark)
            })
            return
        }

    }

    const handleResendOtp = async () => {
        Actions.showLoader(true)
        try {
            await resetPassword({ username: phoneNumber.replace(/\s+/g, '') }).then((res, result) => {
                // console.log("username: phoneNumber.replace(/\s+/g, '')", phoneNumber.replace(/\s+/g, ''), res);
                showSuccessToast("Otp send successfully", isDark)
            }).catch((err) => {
                showErrorToast(err?.message, isDark)
            })

        } catch (err) {
            console.log(err);
            showErrorToast(err?.message, isDark)
        }
        finally {
            Actions.showLoader(false)
            // setLoading(false)
        }
    }

    useEffect(() => {
        if (password !== "" && otp.length >= 6) {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }
    }, [password, otp])

    return (
        <WrapperContainer
            centerTitle={"Change Password"}
            showBackButton
            buttonActive={buttonActive}
            buttonTitle="Change Password"
            handleBack={() => {
                navigation.navigate(AuthRouteStrings.FORGOT_PASSWORD);
            }}
            handleButtonPress={handleChangePassword}
        >
            <ScrollView
                style={{ marginBottom: verticalScale(50) }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={[appStyles.smallTextGray, { marginTop: verticalScale(5) }]}>
                    The OTP code will be sent to the phone number
                </Text>
                <Text style={appStyles.smallTextGray}>
                    {phoneNumber}
                </Text>
                <Text style={[appStyles.smallTextBlack, { marginTop: verticalScale(20) }]}>OTP</Text>
                <OTPInputView
                    onCodeFilled={(code) => {
                        setShowError({
                            ...showError,
                            otp: false
                        })
                        setOTP(code)
                    }}
                    selectionColor={uiColours.LIGHT_GRAY}
                    autoFocusOnLoad={false}
                    pinCount={6}
                    codeInputFieldStyle={[styles.underlineStyleBase, {
                        color: isDark ? uiColours.WHITE_TEXT : uiColours.BLACK_TEXT,
                        borderColor: showError.otp ? uiColours.RED : uiColours.LIGHT_GRAY,
                    }]}
                    codeInputHighlightStyle={[styles.borderStyleHighLighted, {
                        borderColor: showError.otp ? uiColours.RED : uiColours.LIGHT_GRAY,
                    }]}
                    style={[styles.otpStyles]}
                    secureTextEntry
                />

                {
                    showError.otp &&
                    <Text style={[appStyles.smallTextBlack, { color: uiColours.RED, marginTop: verticalScale(5) }]}>
                        The OTP code you entered is invalid. Please enter the correct OTP code.
                    </Text>
                }


                <InputText
                    hasTitle
                    inputTitle="New Password"
                    value={password}
                    onPressIn={() => {
                        setShowError({
                            ...showError,
                            password: false
                        })
                    }}
                    ShowError={showError.password}
                    ErrorMsg={"Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long."}
                    placeholder={"Input your new password"}
                    inputContainer={{
                        marginTop: verticalScale(30)
                    }}
                    secureTextEntry={!showPassword}
                    showRenderRightView={
                        true
                    }
                    renderRightView={() => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setShowPassword(!showPassword)
                                }}
                            >
                                {showPassword ? <Images.eyeOpen height={moderateScale(25)} width={moderateScale(25)} /> :
                                    <Images.eyeClose height={moderateScale(25)} width={moderateScale(25)} />
                                }
                            </TouchableOpacity>
                        )
                    }}
                    handleChange={(e) => {
                        setPassword(e)
                    }}
                />

                <Text style={appStyles.smallTextGray}>
                    If you have successfully created a new password, you can sign in to your account with the newly created password.
                </Text>

                <View style={styles.resendOtpView}>
                    <Text style={appStyles.smallTextBlack}>
                        Didn’t receive code?
                    </Text>
                    <TouchableOpacity
                        onPress={handleResendOtp}
                        style={{ padding: moderateScale(5) }}
                    >
                        <Text style={appStyles.smallTextPrimaryBold}>
                            Resend
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </WrapperContainer>
    )
}

export default ChangePassword