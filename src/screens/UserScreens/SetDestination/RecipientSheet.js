import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Styles } from './Styles'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CustomButton from '../../../components/Button/CustomButton'
import { uiColours } from '../../../utils/Styles/uiColors'
import { RegEx } from '../../../utils/Constents/regulerexpressions'
import Form from '../../../components/Form/Form'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import { useNavigation } from '@react-navigation/native'
import useBackButton from '../../../customHooks/useBackButton'

const RecipientSheet = ({
  location,
  appStyles,
  handleNext,
  isDark,
  formData,
  setFormData,
  isVisible,
  handleBackClick,
  handleEdit
}) => {
const navigation =useNavigation()
  const recepentFormData = [
    {
      id: 1,
      title: 'Name',
      placeHolder: "Input your name",
      type: "name",
      maxLenght: 100,
      isRequired: true,
      errorMsg: "Enter valid first name",
      validationString: RegEx.name__regEx
    },
    {
      id: 2,
      title: 'Phone Number',
      placeHolder: "Input phone number",
      type: "phoneNumber",
      maxLenght: 100,
      isRequired: true,
      errorMsg: "Enter valid Phone Number",
      validationString: RegEx.notEmpty
    },
  ]

  const [showError, setShowError] = useState(false)
  const [buttonActive, setButtonActive] = useState(false)

  useEffect(() => {
    if (RegEx.name__regEx.test(formData.name)  && formData.phoneNumber) {
      setButtonActive(true)
    } else {
      setButtonActive(false)
    }
  }, [formData])

  useBackButton(() => {
    // setShowBottomSheet(false)
    navigation.goBack()
    return true
  })

  return (
    <BottomSheet
      isVisible={isVisible}
      modelBgStyles={{backgroundColor:"rgba(255, 255, 255, 0)"}}
      title="Recipients Details"
      hasBackButton
      showFooterButton
      buttonActive={buttonActive}
      buttonTitle="Next"
      handleButtonPress={handleNext}
      handleBackClick={handleBackClick}
      handleRightClick={() => {
        // setShowSheet(false)
      }}
      containerStyles={{ padding: 0 }}
    >

      <View style={[commonStyles.bottomBorder, Styles.bottomViewContent,{
        borderColor:isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
      }]}>
        <Text style={[appStyles?.smallTextBlack, { flex: 1 }]}>
          {location?.location}
        </Text>
        <TouchableOpacity
          onPress={handleEdit}
          style={{ paddingVertical: verticalScale(2) }}
        >
          <Text style={[appStyles?.smallTextPrimaryBold]}>Edit</Text>
        </TouchableOpacity>

      </View>

      <View style={[commonStyles.bottomBorder, Styles.recipientDetails,{
        borderColor:isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
      }]}>
        <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
          <Text style={appStyles.mediumTextBlackBold}>
            Recipient details<Text style={{ color: uiColours.RED }}>*</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              setFormData({
                name: "",
                phoneNumber: ""
              })
            }}
          >
            <Text style={appStyles.smallTextGray}>
              Clear details
            </Text>
          </TouchableOpacity>
        </View>

        <Form
          data={recepentFormData}
          formData={formData}
          setFormData={setFormData}
          ShowError={showError}
          setShowError={setShowError}
        />
      </View>
      {/* <CustomButton
        buttonStyle={{
          backgroundColor: buttonActive ? uiColours.PRIMARY :
            !buttonActive && isDark ? uiColours.GRAYED_BUTTON :
              uiColours.LIGHT_GRAY,
          marginVertical: verticalScale(16)
        }}
        titleStyle={{
          color: buttonActive ? uiColours.WHITE_TEXT : !buttonActive && isDark ? uiColours.GRAYED_BUTTON :
            uiColours.GRAY_TEXT
        }}
        title="Next"
        NavigationHandle={handleNext}
        disabled={!buttonActive}

      /> */}
    </BottomSheet>
  )
}

export default RecipientSheet