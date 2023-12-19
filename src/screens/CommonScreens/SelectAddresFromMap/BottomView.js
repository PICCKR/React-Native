import { View, Text } from 'react-native'
import React from 'react'
import { Styles } from './Styles'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import CustomButton from '../../../components/Button/CustomButton'

const BottomView = ({
  destination,
  appStyles,
  handleConfirm
}) => {
  return (
    <View style={[commonStyles.dropShadow, Styles.bottomView]}>
      <View style={[commonStyles.bottomBorder, { padding: moderateScale(16) }]}>
        <Text style={appStyles?.mediumTextPrimaryBold}>Set location</Text>
      </View>
      <View style={[commonStyles.bottomBorder, Styles.bottomViewContent]}>
        <Text style={appStyles?.smallTextBlack}>
          {destination?.location}
        </Text>
      </View>
      <CustomButton
        buttonStyle={{ marginVertical: verticalScale(16) }}
        title="Confirm Destination"
        NavigationHandle={handleConfirm}
      />
    </View>
  )
}

export default BottomView