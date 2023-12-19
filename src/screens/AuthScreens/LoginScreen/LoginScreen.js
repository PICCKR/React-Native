import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from './Styles'
import { AppContext } from '../../../context/AppContext'
import Header from '../../../components/Header/Header'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import InputText from '../../../components/InputText/InputText'
import MobileNumberInput from '../../../components/MobileNumberInput/MobileNumberInput'
import CustomButton from '../../../components/Button/CustomButton'
import { verticalScale } from 'react-native-size-matters'
import { RegEx } from '../../../utils/Constents/regulerexpressions'
import { uiColours } from '../../../utils/Styles/uiColors'
import { useNavigation } from '@react-navigation/native'
import { AuthRouteStrings } from '../../../utils/Constents/RouteStrings'
import { setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'
import Form from '../../../components/Form/Form'
import { loginFormData } from '../../../json/loginFormData'

const LoginScreen = () => {
  const { appStyles, isDark, setuserData } = useContext(AppContext)
  const navigation = useNavigation()
  const [loginData, setLoginData] = useState({
    selectedCountry: {},
    phoneNumber: "",
    password: ""
  })

  const [buttonActive, setButtonActive] = useState(false)
  const [ShowError, setShowError] = useState({})
  const [errorMsg, setErrorMsg] = useState("")

  const handleLogin = () => {
    const data = {
      id: 1,
      type: "user"
    }
    // setLocalData(storageKeys.userData, data)
    setuserData(data)
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

  return (
    <WrapperContainer
      centerTitle={"Login"}
      showBackButton
      buttonTitle="Sign in"
      handleButtonPress={handleLogin}
      buttonActive={buttonActive}
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
          ErrorMsg = {errorMsg}
          ShowError = {ShowError?.phoneNumber}
          onPressIn={()=>{
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
          ErrorMsg = {errorMsg}
          ShowError = {ShowError?.password}
          onPressIn={()=>{
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