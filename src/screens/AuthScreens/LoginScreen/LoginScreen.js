import { Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from './Styles'
import { AppContext, useSocket } from '../../../context/AppContext'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import InputText from '../../../components/InputText/InputText'
import MobileNumberInput from '../../../components/MobileNumberInput/MobileNumberInput'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { AuthRouteStrings } from '../../../utils/Constents/RouteStrings'
import { getLocalData, setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'
import useBackButton from '../../../customHooks/useBackButton'
import { Images } from '../../../assets/images'
import { deleteUser, fetchAuthSession, resendSignUpCode, signIn, signOut } from '@aws-amplify/auth'
import Actions from '../../../redux/Actions'
import { endPoints } from '../../../configs/apiUrls'
import axios from 'axios'
import { showGeneralError } from '../../../helper/showGeneralError'
import { showErrorToast } from '../../../helper/showErrorToast'
import { decodeToken } from '../../../helper/decodeToken'

const LoginScreen = () => {
  const { appStyles, isDark, setuserData, userData, setIsLoggedIn, fromGuestUserScreen, setFromGuestUserScreen } = useContext(AppContext)
  const navigation = useNavigation()

  const { Socket } = useSocket()

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
      // method to signIn pass phone number and password
      const user = await signIn(
        {
          username: `${loginData?.selectedCountry?.code?.replace(/[()]/g, '')}${loginData?.phoneNumber.replace(/\s+/g, '')}`,
          password: loginData?.password
        }
      );
      // deleteUser()
      // return
      // if user is created but not verify the otp 
      if (user?.nextStep?.signInStep === "CONFIRM_SIGN_UP") {
        handleConfirmSignup()
      }
      // if user verified
      else if (user?.nextStep?.signInStep === "DONE") {
        const UserData = await getLocalData(storageKeys.userData)
        // after signin get access token from aur backend
        handleGetAccesToken(UserData)
      } else {
        Actions.showLoader(false)
      }
    } catch (error) {
      if (error?.toString() === "UserAlreadyAuthenticatedException: There is already a signed in user.") {
        await signOut().then((res) => {
          handleLogin()
        })
      }
      else {
        Actions.showLoader(false)
        showErrorToast(error?.message, isDark)
      }
    }
  }

  const handleConfirmSignup = async () => {
    // call resend otp method 
    resendSignUpCode({
      username: `${loginData?.selectedCountry?.code?.replace(/[()]/g, '')}${loginData?.phoneNumber.replace(/\s+/g, '')}`,
    }).then((res) => {
      Actions.showLoader(false)
      // after sending the otp take user to otp screen with data
      navigation.navigate(AuthRouteStrings.OTP_SCREEN, {
        from: AuthRouteStrings.LOGIN_SCREEN,
        data: loginData,
      })
    }).catch((error) => {
      showGeneralError(isDark)
      Actions.showLoader(false)
      console.log("error in sending otp", error);
    })
  }


  const handleGetAccesToken = async (UserData) => {
    try {
      // get idToken from cognito
      const { idToken } = (await fetchAuthSession()).tokens ?? {};
      // console.log("idToken.toString()", idToken.toString());
      // pass this to in headers to get jwt token
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken.toString()}`,
        },
      };

      axios.post(endPoints.GET_TOKEN, {}, config)
        .then(async (result) => {
          const { data, status } = result;
          if (status == 200) {
            const userInformaton = await decodeToken(data?.token)
            console.log("userInformaton", userInformaton);
            // after getting token store it in local storage and also set token in context
            setLocalData(storageKeys.userData, { ...userInformaton, token: data?.token })
            setuserData({ ...userInformaton, token: data?.token })
            if (fromGuestUserScreen) {
              navigation.navigate(fromGuestUserScreen)
              setFromGuestUserScreen(null)
            } else {
              setIsLoggedIn(true)
              if (userInformaton?.userRole[1]) {
                Socket.emit("driver-connect",
                  {
                    "userId": userInformaton?._id
                  }
                )
              } else {
                console.log("it is user");
              }
            }

          } else {
            await signOut().then((res) => {
              // handleLogin()
            });
            showGeneralError(isDark)
          }
          // console.log("token res====>", status);
          Actions.showLoader(false)
        })
        .catch(async (error) => {
          if (error?.response?.status === 401) {
            showErrorToast("You dont have account please create account", isDark)
            await deleteUser().then((res) => {
              navigation.navigate(AuthRouteStrings.USER_SIGN_UP)
            })
          } else {
            await signOut().then((res) => {

            });
            showGeneralError(isDark)
          }
          Actions.showLoader(false)
          console.log("error while getting access token", error);
        });
    } catch (err) {
      showGeneralError(isDark)
      Actions.showLoader(false)
      console.log(err);
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

  const handleConnectDriversuccess = (data) => {
    console.log("driver-connect-successfully", data);
  }


  useEffect(() => {
    Socket.on("driver-connect-successfully", handleConnectDriversuccess)

    return () => {
      Socket.off("driver-connect-successfully", handleConnectDriversuccess)
    }
  }, [Socket, handleConnectDriversuccess])


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
          handleChange={(number) => {
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
          editable
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
                {showPassword ? <Images.eyeOpen height={moderateScale(25)} width={moderateScale(25)} /> :
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