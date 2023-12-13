import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { Styles } from './Styles'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import Form from '../../../components/Form/Form'
import { signUpFormData } from '../../../json/signUpFormData'
import CheckBox from '../../../components/CheckBox/CheckBox'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import HyperlinkView from './HyperlinkView'
import CustomButton from '../../../components/Button/CustomButton'
import { uiColours } from '../../../utils/Styles/uiColors'
import { RegEx } from '../../../utils/Constents/regulerexpressions'
import { AuthRouteStrings } from '../../../utils/Constents/RouteStrings'

const UserSignupScreen = () => {
  const { appStyles, isDark } = useContext(AppContext)
  const navigation = useNavigation()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    selectedCountry: {}
  })
  const [checkData, setCheckData] = useState({
    termsCheck: false,
    privecyCheck: false
  })

  const [buttonActive, setButtonActive] = useState(false)
  const [ShowError, setShowError] = useState({})

  const handledContinue = () => {
    console.log("RegEx.name__regEx.test(formData.firstName)", RegEx.name__regEx.test(formData.firstName));
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
      console.log("!formData.password.length >= 6");
      setShowError({
        ...ShowError,
        password: true
      })
    } else {
      setShowError({})
      console.log("sdgfshdahdasghdag", formData);
      navigation.navigate(AuthRouteStrings.OTP_SCREEN, {
        data: formData
      })
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
        />

      </ScrollView>



    </WrapperContainer>
  )
}

export default UserSignupScreen