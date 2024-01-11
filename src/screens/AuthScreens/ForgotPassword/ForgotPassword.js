import { View, Text, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { AppContext } from '../../../context/AppContext'
import InputText from '../../../components/InputText/InputText'
import { verticalScale } from 'react-native-size-matters'
import CustomButton from '../../../components/Button/CustomButton'
import styles from './Styles'
import { uiColours } from '../../../utils/Styles/uiColors'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { RegEx } from '../../../utils/Constents/regulerexpressions'
import { useNavigation } from '@react-navigation/native'
import { AuthRouteStrings } from '../../../utils/Constents/RouteStrings'
import useBackButton from '../../../customHooks/useBackButton'
import MobileNumberInput from '../../../components/MobileNumberInput/MobileNumberInput'
import { resetPassword } from '@aws-amplify/auth'
import Actions from '../../../redux/Actions'

const ForgotPassword = () => {
  const { appStyles, isDark } = useContext(AppContext)
  const navigation = useNavigation()

  const [formData, setFormData] = useState({
    phoneNumber: "",
    selectedCountry: {}
  })
  const [buttonActive, setButtonActive] = useState(false)
  const [ShowError, setShowError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (number, selectedCountry) => {
    setFormData({
      ...formData,
      phoneNumber: number,
      selectedCountry: selectedCountry
    })
    if (RegEx.only__number__regEx.test(number)) {
      setButtonActive(true)
    } else {
      setButtonActive(false)
    }
  }

  useBackButton(() => {
    navigation.goBack();
    return true;
  });

  const handleNext = async () => {
    Actions.showLoader(true)
    try {
      await resetPassword({ username: `${formData?.selectedCountry?.code?.replace(/[()]/g, '')}${formData?.phoneNumber.replace(/\s+/g, '')}` }).then((res, result) => {
        // console.log("res===>", res, result);
        navigation.navigate(AuthRouteStrings.OTP_SCREEN, {
          from: AuthRouteStrings.FORGOT_PASSWORD,
          phoneNumber: `${formData?.selectedCountry?.code?.replace(/[()]/g, '')} ${formData?.phoneNumber.replace(/\s+/g, '')}`
        })
      });

    } catch (err) {
      console.log(err);
      Alert.alert("Error During Reset Password", err.message);
    }
    finally {
      Actions.showLoader(false)
      // setLoading(false)
    }
    return
   
  }

  return (
    <WrapperContainer
      centerTitle={"Forgot Password"}
      showBackButton
      buttonActive={buttonActive}
      buttonTitle="Send OTP"
      handleBack={() => {
        navigation.goBack()
      }}
      handleButtonPress={handleNext}
    >
      <Text style={[appStyles.mediumTextPrimaryBold]}>
        Enter your email address to find your account
      </Text>

      <MobileNumberInput
        handleChange={handleChange}
        ErrorMsg={errorMsg}
        ShowError={ShowError?.phoneNumber}
        onPressIn={() => {
          setShowError(false)
        }}
        setFormData={setFormData}
      />
      <Text style={appStyles.smallTextGray}>
        If your phone number is correct, you can enter the OTP code that will be sent to the connected phone number.
      </Text>


    </WrapperContainer>

  )
}

export default ForgotPassword