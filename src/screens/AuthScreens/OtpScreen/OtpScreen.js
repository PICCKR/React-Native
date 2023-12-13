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

const OtpScreen = ({ route }) => {
  const data = route?.params?.data
  const from = route?.params?.from

  const { appStyles, isDark } = useContext(AppContext)

  const navigation = useNavigation()
  const [otp, setOTP] = useState('')
  const [buttonActive, setButtonActive] = useState(false)


  const handleConfirm = () => {
    if (from === MainRouteStrings.BECOME_PICKER) {
      navigation.navigate(MainRouteStrings.VEHICLE_VERIFICATION, {
        data: data
      })
    } else {
      navigation.navigate(AuthRouteStrings.PROFILE_INFORMATION, {
        data: data
      })
    }

  }

  useEffect(() => {
    if (
      otp.length == 5
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
        {`${data?.selectedCountry?.code} ${data?.phoneNumber}`}
      </Text>

      <OTPInputView
        onCodeFilled={(code) => {
          setOTP(code)
        }}
        autoFocusOnLoad
        pinCount={5}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.borderStyleHighLighted}
        style={[styles.otpStyles]}
        secureTextEntry
      />

      <View style={styles.resendOtpView}>
        <Text style={appStyles.smallTextBlack}>
          Didn’t receive code?
        </Text>
        <TouchableOpacity
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