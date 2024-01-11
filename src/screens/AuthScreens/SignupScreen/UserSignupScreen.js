import { ScrollView } from 'react-native'
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
import { verticalScale } from 'react-native-size-matters'
import { deleteUser, signUp } from '@aws-amplify/auth'
import Actions from '../../../redux/Actions'
import { showErrorToast } from '../../../helper/showErrorToast'

const UserSignupScreen = () => {
  const { appStyles, isDark, userData, setuserData } = useContext(AppContext)
  const navigation = useNavigation()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
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
    else if (formData.password.length < 6) {
      // console.log("!formData.password.length >= 6");
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

        if (user) {
          // setuserData({...userData, formData})
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
      <ScrollView style={Styles.formView}>

        <Form
          data={signUpFormData}
          formData={formData}
          setFormData={setFormData}
          ShowError={ShowError}
          setShowError={setShowError}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
        />

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
          leftText="I have read the"
          rightText="Privacy Policy"
          selected={checkData.privecyCheck}
          termsView={{ marginBottom: verticalScale(70) }}
        />

      </ScrollView>
    </WrapperContainer>
  )
}

export default UserSignupScreen