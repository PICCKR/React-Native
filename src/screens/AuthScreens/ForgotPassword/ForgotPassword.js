import { View, Text } from 'react-native'
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

const ForgotPassword = () => {
  const { appStyles, isDark } = useContext(AppContext)
  const navigation = useNavigation()

  const [email, setEmail] = useState("")
  const [buttonActive, setButtonActive] = useState(false)

  const handleChange = (e) => {
    setEmail(e)
    if (RegEx.email__regEx.test(e)) {
      setButtonActive(true)
    } else {
      setButtonActive(false)
    }
  }


  return (
    <WrapperContainer
      centerTitle={"Forgot Password"}
      showBackButton
      buttonActive = {buttonActive}
      buttonTitle="Reset Password"
      handleButtonPress={()=>{
        navigation.navigate(AuthRouteStrings.WELCOME_SCREEN)
      }}
    >
      <Text style={[appStyles.mediumTextPrimaryBold]}>
        Enter your email address to reset password
      </Text>

      <InputText
        hasTitle
        inputTitle="Email Address"
        placeholder={"Input your email address"}
        inputContainer={styles.input}
        handleChange={handleChange}
      />
      <Text style={appStyles.smallTextGray}>
        Authentication link will be sent to the email
      </Text>


    </WrapperContainer>

  )
}

export default ForgotPassword