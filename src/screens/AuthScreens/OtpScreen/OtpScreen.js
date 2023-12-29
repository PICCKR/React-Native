import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { AppContext } from '../../../context/AppContext'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import styles from './Styles'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { AuthRouteStrings, MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import { uiColours } from '../../../utils/Styles/uiColors'
import { confirmSignUp, resendSignUpCode, signIn } from '@aws-amplify/auth'
import Actions from '../../../redux/Actions'
import { showToast } from '../../../components/tostConfig/tostConfig'
import { tostMessagetypes } from '../../../utils/Constents/constentStrings'
import { getLocalData, setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'

const OtpScreen = ({ route }) => {
  const data = route?.params?.data
  const from = route?.params?.from
  const phoneNumber = route?.params?.phoneNumber

  console.log("data", data);

  const { appStyles, isDark, setuserData, setIsLoggedIn } = useContext(AppContext)

  const navigation = useNavigation()
  const [otp, setOTP] = useState('')
  const [buttonActive, setButtonActive] = useState(false)
  const [showError, setShowError] = useState(false)


  const handleConfirm = async () => {
    if (from === MainRouteStrings.BECOME_PICKER) {
      navigation.navigate(MainRouteStrings.VEHICLE_VERIFICATION, {
        data: data
      })
    } else if (from === AuthRouteStrings.USER_SIGN_UP) {
      Actions.showLoader(true)
      try {
        const user = await confirmSignUp({
          username: `${data?.selectedCountry?.code?.replace(/[()]/g, '')}${data?.phoneNumber.replace(/\s+/g, '')}`,
          confirmationCode: otp,
        });
        console.log("user ======>", user);
        if (user?.nextStep?.signUpStep === "DONE") {
          navigation.navigate(AuthRouteStrings.PROFILE_INFORMATION, {
            data: data
          })
        }
      } catch (err) {
        console.log("error", err?.message);
        setShowError(true)
      } finally {
        Actions.showLoader(false)

      }
    } else if (from === AuthRouteStrings.LOGIN_SCREEN) {
      Actions.showLoader(true)
      confirmSignUp({
        username: `${data?.selectedCountry?.code?.replace(/[()]/g, '')}${data?.phoneNumber.replace(/\s+/g, '')}`,
        confirmationCode: otp,
      }).then(async (user) => {
        Actions.showLoader(false)
        if (user?.nextStep?.signUpStep === "DONE") {
          const UserData = await getLocalData(storageKeys.userData)
          const data = {
            ...UserData,
            id: 1,
            type: "user"
          }
          setLocalData(storageKeys.userData, data)
          setuserData(data)
          setIsLoggedIn(true)
        }
      }).catch(() => {
        Actions.showLoader(false)
        console.log("error", err?.message);
      })
    } else if (from === AuthRouteStrings.FORGOT_PASSWORD) {
      navigation.navigate(AuthRouteStrings.CHANGE_PASSWORD, {
        data: {
          otp: otp,
          phoneNumber: phoneNumber
        }
      })
    }
  }

  const handleResendOtp = () => {
    Actions.showLoader(true)
    resendSignUpCode({
      username: `${data?.selectedCountry?.code?.replace(/[()]/g, '')}${data?.phoneNumber.replace(/\s+/g, '')}`,
    }).then((res) => {
      const toastMsgConfg = {
        isDark: isDark,
        msg: "Otp send successfully"
      }
      showToast(toastMsgConfg, tostMessagetypes.SUCCESS, isDark)
      // console.log("resned otp res", res);
    }).catch((error) => {
      const toastMsgConfg = {
        isDark: isDark,
        msg: error?.message
      }
      showToast(toastMsgConfg, tostMessagetypes.ERROR, isDark)
      console.log("error in sending otp", error);
    }).finally(()=>{
      Actions.showLoader(false)
    })
  }

  // 563520

  useEffect(() => {
    if (
      otp.length == 6
    ) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [otp]);

  return (
    <WrapperContainer
      centerTitle={"Verification"}
      showBackButton
      buttonTitle="Confirm"
      handleBack={() => {
        navigation.goBack()
      }}
      handleButtonPress={handleConfirm}
      buttonActive={buttonActive}
    >
      <Text style={[appStyles.mediumTextPrimaryBold]}>
        OTP Verification
      </Text>
      <Text style={[appStyles.smallTextGray, { marginTop: verticalScale(5) }]}>
        The OTP code will be sent to the phone number
      </Text>
      <Text style={appStyles.smallTextGray}>
        {from === AuthRouteStrings.FORGOT_PASSWORD ? phoneNumber : `${data?.selectedCountry?.code} ${data?.phoneNumber}`}
      </Text>

      <OTPInputView
        onCodeFilled={(code) => {
          setShowError(false)
          setOTP(code)
        }}
        selectionColor={uiColours.LIGHT_GRAY}
        autoFocusOnLoad={false}
        pinCount={6}
        codeInputFieldStyle={[styles.underlineStyleBase, {
          color: isDark ? uiColours.WHITE_TEXT : uiColours.BLACK_TEXT,
          borderColor: showError ? uiColours.RED : uiColours.LIGHT_GRAY,
        }]}
        codeInputHighlightStyle={[styles.borderStyleHighLighted, {
          borderColor: showError ? uiColours.RED : uiColours.LIGHT_GRAY,
        }]}
        style={[styles.otpStyles]}
        secureTextEntry
      />

      {
        showError &&
        <Text style={[appStyles.smallTextBlack, { color: uiColours.RED, marginTop: verticalScale(5) }]}>
          The OTP code you entered is invalid. Please enter the correct OTP code.
        </Text>
      }

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



    </WrapperContainer>
  )
}

export default OtpScreen