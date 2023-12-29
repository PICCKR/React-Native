import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, BackHandler, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from './Styles'
import { AppContext } from '../../../context/AppContext'
import Header from '../../../components/Header/Header'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import InputText from '../../../components/InputText/InputText'
import MobileNumberInput from '../../../components/MobileNumberInput/MobileNumberInput'
import CustomButton from '../../../components/Button/CustomButton'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { RegEx } from '../../../utils/Constents/regulerexpressions'
import { uiColours } from '../../../utils/Styles/uiColors'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AuthRouteStrings } from '../../../utils/Constents/RouteStrings'
import { getLocalData, setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'
import Form from '../../../components/Form/Form'
import { loginFormData } from '../../../json/loginFormData'
import useBackButton from '../../../customHooks/useBackButton'
import { Images } from '../../../assets/images'
import { showToast } from '../../../components/tostConfig/tostConfig'
import { tostMessagetypes } from '../../../utils/Constents/constentStrings'
import { resendSignUpCode, signIn, signOut } from '@aws-amplify/auth'
import Actions from '../../../redux/Actions'

const LoginScreen = () => {
  const { appStyles, isDark, setuserData, userData, setIsLoggedIn } = useContext(AppContext)
  const navigation = useNavigation()
  const [loginData, setLoginData] = useState({
    selectedCountry: {},
    phoneNumber: "",
    password: ""
  })

  const [buttonActive, setButtonActive] = useState(false)
  const [ShowError, setShowError] = useState({})
  const [errorMsg, setErrorMsg] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    Actions.showLoader(true)
    try {
      const user = await signIn(
        {
          username: `${loginData?.selectedCountry?.code?.replace(/[()]/g, '')}${loginData?.phoneNumber.replace(/\s+/g, '')}`,
          password: loginData?.password
        }
      );
      if (user?.nextStep?.signInStep === "CONFIRM_SIGN_UP") {
        resendSignUpCode({
          username: `${loginData?.selectedCountry?.code?.replace(/[()]/g, '')}${loginData?.phoneNumber.replace(/\s+/g, '')}`,
        }).then((res) => {
          navigation.navigate(AuthRouteStrings.OTP_SCREEN, {
            from: AuthRouteStrings.LOGIN_SCREEN,
            data: loginData,
            user: user
          })
          // console.log("resned otp res", res);
        }).catch((error) => {
          console.log("error in sending otp", error);
        })
      } else if(user?.nextStep?.signInStep === "DONE") {
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
      console.log("user====>", user?.nextStep?.signInStep);
    } catch (error) {
      console.log("Error During SignIn", error);
      const toastMsgConfg = {
        isDark: isDark,
        msg: error?.message
      }
      showToast(toastMsgConfg, tostMessagetypes.ERROR, isDark)

    } finally {
      Actions.showLoader(false)
      // setLoading(false);
    }
  }

  useEffect(() => {
    if (
      loginData?.password !== '' &&
      loginData?.mobileNumber !== ""
    ) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [loginData]);

  useBackButton(() => {


    navigation.navigate(AuthRouteStrings.WELCOME_SCREEN)
    return true
  });

  return (
    <WrapperContainer
      centerTitle={"Login"}
      showBackButton
      buttonTitle="Sign in"
      handleButtonPress={handleLogin}
      buttonActive={buttonActive}
      handleBack={() => {
        navigation.navigate(AuthRouteStrings.WELCOME_SCREEN)
      }}
    >
      <Text style={[appStyles.mediumTextPrimaryBold]}>
        One more step and you can enjoy the features
      </Text>

      <ScrollView style={styles.formView}>

        <MobileNumberInput
          handleChange={(number, selectedCountry) => {
            setLoginData({
              ...loginData,
              phoneNumber: number
            })
          }}
          handleBlur={() => {
            if (loginData.phoneNumber === "") {
              setShowError({
                ...ShowError,
                phoneNumber: true
              })
              setErrorMsg("Enter phone number")
            } else {
              setShowError({
                ...ShowError,
                phoneNumber: false
              })
            }
          }}
          ErrorMsg={errorMsg}
          ShowError={ShowError?.phoneNumber}
          onPressIn={() => {
            setShowError({
              ...ShowError,
              phoneNumber: false
            })
          }}
          setFormData={setLoginData}
        />

        <InputText
          hasTitle
          inputTitle="Password"
          placeholder={"Input your password"}
          inputContainer={{ marginTop: verticalScale(16) }}
          handleChange={(e) => {
            setLoginData({
              ...loginData,
              password: e
            })
          }}
          OnBlur={() => {
            if (loginData.password === "") {
              setShowError({
                ...ShowError,
                password: true
              })
              setErrorMsg("Enter password")
            } else {
              setShowError({
                ...ShowError,
                password: false
              })
            }
          }}
          secureTextEntry={!showPassword}
          showRenderRightView={true}
          renderRightView={() => {
            return (
              <TouchableOpacity
                style={{ paddingRight: scale(10) }}
                onPress={() => {
                  setShowPassword(!showPassword)
                }}
              >
                {!showPassword ? <Images.eyeOpen height={moderateScale(25)} width={moderateScale(25)} /> :
                  <Images.eyeClose height={moderateScale(25)} width={moderateScale(25)} />
                }
              </TouchableOpacity>
            )
          }}
          ErrorMsg={errorMsg}
          ShowError={ShowError?.password}
          onPressIn={() => {
            setShowError({
              ...ShowError,
              password: false
            })
          }}
        />

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => {
            navigation.navigate(AuthRouteStrings.FORGOT_PASSWORD)
          }}
        >
          <Text style={appStyles.smallTextPrimary}>
            Forgot Password
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </WrapperContainer>
  )
}

export default LoginScreen