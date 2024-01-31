import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { AppContext } from '../../../context/AppContext'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import styles from './Styles'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { AuthRouteStrings, MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import { uiColours } from '../../../utils/Styles/uiColors'
import { confirmSignUp, getCurrentUser, resendSignUpCode, resetPassword, signIn } from '@aws-amplify/auth'
import Actions from '../../../redux/Actions'
import { showToast } from '../../../components/tostConfig/tostConfig'
import { tostMessagetypes } from '../../../utils/Constents/constentStrings'
import { getLocalData, setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'
import { showGeneralError } from '../../../helper/showGeneralError'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import { showErrorToast } from '../../../helper/showErrorToast'
import axios from 'axios'
import { endPoints } from '../../../configs/apiUrls'
import { decodeToken } from '../../../helper/decodeToken'

const OtpScreen = ({ route }) => {
  const data = route?.params?.data
  const from = route?.params?.from
  const phoneNumber = route?.params?.phoneNumber

  const { appStyles, isDark, setuserData, setIsLoggedIn, userData } = useContext(AppContext)


  const navigation = useNavigation()
  const [otp, setOTP] = useState('')
  const [buttonActive, setButtonActive] = useState(false)
  const [showError, setShowError] = useState(false)
  const [cogId, setCogId] = useState("")
  const [verifid, setVerified] = useState(false)

  const [addressData, setAddresData] = useState({
    title: "",
    coordinates: [],
    type: "",
    street_address: "",
    favorite: false,
    house_number: "",
    building_name: ""
  })


  const handleConfirm = async () => {
    if (from === MainRouteStrings.BECOME_PICKER) {
      navigation.navigate(MainRouteStrings.VEHICLE_VERIFICATION, {
        data: data
      })
    } else if (from === AuthRouteStrings.USER_SIGN_UP) {
      if (verifid === true) {
        signupUser(cogId, data)
      } else {
        handleSingUpverifyOtp()
      }

    } else if (from === AuthRouteStrings.LOGIN_SCREEN) {
      if (verifid === true) {
        const userdata = await getLocalData(storageKeys.userData)
        signupUser(cogId, userdata)
      } else {
        handleConfirmSignUpVerifyOtp()
      }
    } else if (from === AuthRouteStrings.FORGOT_PASSWORD) {
      navigation.navigate(AuthRouteStrings.CHANGE_PASSWORD, {
        data: {
          otp: otp,
          phoneNumber: phoneNumber
        }
      })
    } else if (from === MainRouteStrings.EDIT_PROFILE) {
      handleEditProfileVerifyOtp()
    }
  }

  const handleSingUpverifyOtp = async () => {
    setShowError(false)
    Actions.showLoader(true)
    try {
      const user = await confirmSignUp({
        username: `${data?.selectedCountry?.code?.replace(/[()]/g, '')}${data?.phoneNumber.replace(/\s+/g, '')}`,
        confirmationCode: otp,
      });
      if (user?.nextStep?.signUpStep === "DONE" || user?.nextStep?.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
        const user = await signIn(
          {
            username: `${data?.selectedCountry?.code?.replace(/[()]/g, '')}${data?.phoneNumber.replace(/\s+/g, '')}`,
            password: data?.password
          }
        );
        getCurrentUser().then(async (res) => {
          Actions.showLoader(false)
          signupUser(res?.userId, data)
          setCogId(res?.userId)
          setVerified(true)
          // setLocalData(storageKeys.userData, { ...data, userId: res?.userId })
        }).catch((error) => {
          Actions.showLoader(false)
          console.log("error while getting user", error);
        });
      }
    } catch (err) {
      // showGeneralError(isDark)
      console.log("error", err?.message);
      if (err?.message === "User cannot be confirmed. Current status is CONFIRMED") {
        signupUser(cogId, data)
      } else if (err?.message === "Attempt limit exceeded, please try after some time.") {
        showErrorToast(err?.message, isDark)
      } else {
        setShowError(true)
      }

    } finally {
      Actions.showLoader(false)
    }
  }

  const handleConfirmSignUpVerifyOtp = async () => {
    setShowError(false)
    Actions.showLoader(true)
    try {
      const user = await confirmSignUp({
        username: `${data?.selectedCountry?.code?.replace(/[()]/g, '')}${data?.phoneNumber.replace(/\s+/g, '')}`,
        confirmationCode: otp,
      });
      if (user?.nextStep?.signUpStep === "DONE" || user?.nextStep?.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
        const user = await signIn(
          {
            username: `${data?.selectedCountry?.code?.replace(/[()]/g, '')}${data?.phoneNumber.replace(/\s+/g, '')}`,
            password: data?.password
          }
        );
        getCurrentUser().then(async (res) => {
          Actions.showLoader(false)
          const userdata = await getLocalData(storageKeys.userData)
          signupUser(res?.userId, userdata)
          setCogId(res?.userId)
          setVerified(true)
          // setLocalData(storageKeys.userData, { ...data, userId: res?.userId })
        }).catch((error) => {
          Actions.showLoader(false)
          console.log("error while getting user", error);
        });
      }
    } catch (err) {
      // showGeneralError(isDark)
      console.log("error", err?.message);
      if (err?.message === "User cannot be confirmed. Current status is CONFIRMED") {
        const userdata = await getLocalData(storageKeys.userData)
        signupUser(cogId, userdata)
      } else if (err?.message === "Attempt limit exceeded, please try after some time.") {
        showErrorToast(err?.message, isDark)
      } else {
        setShowError(true)
      }

    } finally {
      Actions.showLoader(false)
    }
  }

  const handleEditProfileVerifyOtp = () => {
    // setuserData({ ...userData, ...data })
    // setLocalData(storageKeys.userData, { ...userData, ...data })
    // showSuccessToast("You have updated your profile", isDark)
    navigation.navigate(MainRouteStrings.USER_PROFILE_SCREEN)
  }

  const handleResendOtp = async () => {
    if (from === AuthRouteStrings.USER_SIGN_UP) {
      Actions.showLoader(true)
      resendSignUpCode({
        username: `${data?.selectedCountry?.code?.replace(/[()]/g, '')}${data?.phoneNumber.replace(/\s+/g, '')}`,
      }).then((res) => {
        showSuccessToast("Otp send successfully", isDark)
      }).catch((error) => {
        showErrorToast(error?.message, isDark)
      }).finally(() => {
        Actions.showLoader(false)
      })
    } else if (from === AuthRouteStrings.FORGOT_PASSWORD) {
      Actions.showLoader(true)
      try {
        await resetPassword({ username: `${data?.selectedCountry?.code?.replace(/[()]/g, '')}${data?.phoneNumber.replace(/\s+/g, '')}` }).then((res, result) => {
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
  }

  const signupUser = async (userId, data) => {
    // console.log("userId", userId, data);
    Actions.showLoader(true)
    try {
      var formData = new FormData();
      formData.append("firstName", data?.firstName);
      formData.append("lastName", data?.lastName);
      formData.append("picture", "");
      formData.append("email", data?.email);
      formData.append("addresses", JSON.stringify([]));
      formData.append("cognitoId", userId);
      formData.append("notificationToken", "");
      formData.append("phoneNumber", `${data?.selectedCountry?.code?.replace(/[()]/g, '')} ${data?.phoneNumber.replace(/\s+/g, '')}`);

      console.log(formData);
      // return
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const res = await axios.post(endPoints.CREATE_USER, formData, config)
      // const res = await apiPost(endPoints.CREATE_USER, createUserData)
      if (res?.status == 200) {
        const userInformaton = await decodeToken(res?.data?.data?.token)
        // after getting token store it in local storage and also set token in context
        await setLocalData(storageKeys.userData, { ...userInformaton, token: res?.data?.data?.token })
        await setuserData({ ...userInformaton, token: res?.data?.data?.token })
        navigation.navigate(AuthRouteStrings.PROFILE_INFORMATION)
      } else {
        showErrorToast(res?.data?.message, isDark)
      }
      Actions.showLoader(false)
      // console.log("res===>", res?.status, res?.data);
    } catch (error) {
      setCogId(userId)
      if (error?.response?.status < 500) {
        showErrorToast(error?.response?.data?.message, isDark)
      } else {
        showGeneralError(isDark)
      }
      Actions.showLoader(false)
      console.log("error when creating user", error?.response?.status, error?.response?.data);
    } finally {
      Actions.showLoader(false)
    }
  }


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
        {(from === AuthRouteStrings.FORGOT_PASSWORD || from === MainRouteStrings.EDIT_PROFILE) ? phoneNumber : `${data?.selectedCountry?.code} ${data?.phoneNumber}`}
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