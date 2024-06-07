import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { Styles } from './Styles'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import Form from '../../../components/Form/Form'
import { signUpFormData } from '../../../json/signUpFormData'
import HyperlinkView from './HyperlinkView'
import { RegEx } from '../../../utils/Constents/regulerexpressions'
import { AuthRouteStrings } from '../../../utils/Constents/RouteStrings'
import { scale, verticalScale } from 'react-native-size-matters'
import { deleteUser, signUp } from '@aws-amplify/auth'
import Actions from '../../../redux/Actions'
import { showErrorToast } from '../../../helper/showErrorToast'
import { setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'

const UserSignupScreen = () => {
  const { appStyles, isDark, userData, setuserData } = useContext(AppContext)
  const navigation = useNavigation()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    email: "",
    selectedCountry: null
  })
  const [checkData, setCheckData] = useState({
    termsCheck: false,
    privecyCheck: false
  })

  const [buttonActive, setButtonActive] = useState(false)
  const [ShowError, setShowError] = useState({})
  const [errorMsg, setErrorMsg] = useState()

  const handledContinue = async () => {
    // console.log("RegEx.name__regEx.test(formData.firstName)", formData);
    if (!RegEx.name__regEx.test(formData.firstName)) {
      setShowError({
        ...ShowError,
        firstName: true
      })
    }
    else if (!RegEx.name__regEx.test(formData.lastName)) {
      setShowError({
        ...ShowError,
        lastName: true
      })
    }
    else if (!RegEx.password.test(formData.password)) {
      // console.log("!formData.password.length >= 6", formData.password, RegEx.password.test(formData.password.trim()));
      setShowError({
        ...ShowError,
        password: true
      })
    } else {
      setShowError({})
      Actions.showLoader(true)
      try {
        const user = await signUp({
          username: `${formData?.selectedCountry?.code?.replace(/[()]/g, '')}${formData?.phoneNumber.replace(/\s+/g, '')}`,
          password: formData?.password,
          attributes: {
            phone_number: `${formData?.selectedCountry?.code}${formData?.phoneNumber.replace(/\s+/g, '')}`,
          },
          options: {
            autoSignIn: true
          },
        });
        // console.log("user==>", user);
        if (user) {
          setLocalData(storageKeys.userData, formData)
          navigation.navigate(AuthRouteStrings.OTP_SCREEN, {
            from: AuthRouteStrings.USER_SIGN_UP,
            data: formData,
            user: user
          })
        }
      } catch (error) {
        showErrorToast(error?.message, isDark)
        console.log("error", error?.message);
      } finally {
        Actions.showLoader(false)
      }
    }
  }

  useEffect(() => {
    if (
      formData?.password !== '' &&
      formData?.phoneNumber !== "" &&
      formData?.firstName !== "" &&
      formData?.lastName !== "" &&
      RegEx.email__regEx.test(formData?.email) &&
      checkData?.termsCheck &&
      checkData?.privecyCheck
    ) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [formData, checkData]);

  return (
    <WrapperContainer
      centerTitle={"Sign up"}
      showBackButton
      buttonTitle="Continue"
      handleBack={() => {
        navigation.goBack()
      }}
      buttonActive={buttonActive}
      handleButtonPress={handledContinue}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" && "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? verticalScale(100) : 0}
      >
        <ScrollView
          style={Styles.formView}
          showsVerticalScrollIndicator={false}
        >
          <Form
            data={signUpFormData}
            formData={formData}
            setFormData={setFormData}
            ShowError={ShowError}
            setShowError={setShowError}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
          />

          {/* <Text style={[appStyles.smallTextGray,{fontSize:scale(8)}]}>
          Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long.
        </Text> */}

          <HyperlinkView
            handleCheck={() => {
              setCheckData({
                ...checkData,
                termsCheck: !checkData.termsCheck
              })
            }}
            leftText="I agree to"
            rightText="Terms and Conditions"
            selected={checkData.termsCheck}
          />

          <HyperlinkView
            handleCheck={() => {
              setCheckData({
                ...checkData,
                privecyCheck: !checkData.privecyCheck
              })
            }}
            termsView={{ marginBottom: verticalScale(70) }}
            leftText="I have read the"
            rightText="Privacy Policy"
            selected={checkData.privecyCheck}
            handleLinkClick={() => {
              // navigation.navigate(AuthRouteStrings.PDF_VIEW)
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperContainer >
  )
}

export default UserSignupScreen