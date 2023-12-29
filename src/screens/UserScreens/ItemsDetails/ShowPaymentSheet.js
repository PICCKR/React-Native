import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import { AppContext } from '../../../context/AppContext'
import styles from './Styles'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '../../../assets/images'
import RadioButton from '../../../components/RadioButton/RadioButton'

const ShowPaymentSheet = ({
  isVisible,
  setShowSheet,
  handleSelectPayment,
}) => {
  const { appStyles, isDark } = useContext(AppContext)
  return (
    <BottomSheet
      isVisible={isVisible}
      hasCloseIcon
      title="Payment method"
      onBackdropPress={() => {
        setShowSheet(false)
      }}
      handleRightClick={() => {
        setShowSheet(false)
      }}
    >

      <View style={{ gap: verticalScale(10) }}>
        <Text style={appStyles.smallTextBlack}>
          E-Wallet
        </Text>

        <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
          <View style={commonStyles.flexRowAlnCtr}>
            <Images.wallet height={moderateScale(20)}
              width={moderateScale(20)} />
            <View style={{ marginLeft: scale(10) }}>
              <Text style={appStyles.smallTextGray}>
                PicckRPay
              </Text>
              <Text style={appStyles.smallTextPrimaryBold}>
                $530
              </Text>
            </View>
          </View>
          <RadioButton
            handleChecked={() => {
              setShowSheet(false)
              handleSelectPayment()
            }}
          />

        </View>
      </View>
    </BottomSheet>
  )
}

export default ShowPaymentSheet