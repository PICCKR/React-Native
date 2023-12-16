import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import { AppContext } from '../../../context/AppContext'
import styles from './Styles'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '../../../assets/images'

const TopUpSheet = ({
  isVisible,
  setShowSheet,
  profileInformation,
  handleAddCard,
  handleCardClick
}) => {
  const { appStyles, isDark, userData } = useContext(AppContext)
  const payments = userData?.paymentMethod

  const savedCardData = [
    {
      id: '1',
      cardName: 'American Express',
      cardType: "Credit card (*1234)"
    },
    {
      id: '2',
      cardName: 'Bank of America',
      cardType: "Debit card (*1234)"
    }
  ]

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

      <View style={{ paddingVertical: verticalScale(0) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={appStyles.smallTextBlack}>
            Saved card
          </Text>
          {/* <TouchableOpacity
            style={{ paddingVertical: verticalScale(5) }}

          >
            <Text style={appStyles.smallTextPrimaryBold}>
              Add card
            </Text>
          </TouchableOpacity> */}
        </View>

        {
          userData?.paymentMethod?.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.savedCardView}
                onPress={handleCardClick}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(8) }}>
                  <Images.cardIcon height={moderateScale(13)} width={moderateScale(20)} />
                  <View>
                    <Text style={appStyles.smallTextBlack} >
                      American Express
                    </Text>
                    <Text style={appStyles.smallTextGray}>
                      {item?.cardType} {`(${item?.cardNumber?.slice(-4)})`}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardClickCircle}>

                </View>
              </TouchableOpacity>
            )
          })
        }


      </View>

    </BottomSheet>
  )
}

export default TopUpSheet