import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import { AppContext } from '../../../context/AppContext'
import styles from './Styles'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '../../../assets/images'

const ShowPaymentSheet = ({
  isVisible,
  setShowSheet,
  profileInformation,
  handleAddPayment,
}) => {
  const { appStyles, isDark } = useContext(AppContext)
  const payments = profileInformation?.paymentMethod
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

        {payments?.length === 0 && <View style={[styles.addressSheetHeader,{marginTop:0}]}>
          <Text style={appStyles.smallTextBlack}>
            Saved card
          </Text>
          <TouchableOpacity
            onPress={handleAddPayment}
            style={{ paddingVertical: verticalScale(5) }}
          >
            <Text style={appStyles.smallTextPrimaryBold}>
              Add card
            </Text>
          </TouchableOpacity>
        </View>}

        {payments?.length === 0 ?
          <Text style={[appStyles.smallTextGray, { width: '60%', textAlign: "center", alignSelf: 'center', paddingVertical: verticalScale(30) }]}>
            You don’t have saved card.
            Please add card first
          </Text> :
          <View style={{ gap: verticalScale(10) }}>
            <Text style={appStyles.smallTextBlack}>
              E-Wallet
            </Text>

            <View style={styles.addresCard}>
              <View style={{ flexDirection: "row", alignItems: 'center', maxWidth: "90%" }}>
                <Image source={Images.home} style={{
                  height: moderateScale(20),
                  width: moderateScale(20),
                }} />

                <View style={{ marginLeft: scale(10) }}>
                  <Text style={appStyles.smallTextGray}>
                    PicckRPay
                  </Text>
                  <Text style={appStyles.smallTextGray}>
                    $0
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.addressSheetHeader}>
              <Text style={appStyles.smallTextBlack}>
                Saved card
              </Text>
              <TouchableOpacity
                onPress={handleAddPayment}
                style={{ paddingVertical: verticalScale(5) }}
              >
                <Text style={appStyles.smallTextPrimaryBold}>
                  Add card
                </Text>
              </TouchableOpacity>
            </View>
            {payments?.map((item, index) => {
              console.log("item", item);
              return (
                <View key={index.toString()} style={styles.addresCard}>
                  <View style={{ flexDirection: "row", alignItems: 'center', maxWidth: "90%" }}>
                    <Image source={Images.home} style={{
                      height: moderateScale(20),
                      width: moderateScale(20),
                    }} />

                    <View style={{ marginLeft: scale(10) }}>
                      <Text style={appStyles.smallTextBlack}>
                        American Express
                      </Text>
                      <Text style={appStyles.smallTextPrimary}>
                        {item?.cardType} {`(${item?.cardNumber.slice(-4)})`}
                      </Text>
                    </View>
                  </View>
                  {/* <TouchableOpacity
                    style={styles.addresEditIcon}
                    onPress={() => handleAddressEdit(item)}
                  >
                    <Images.edit />
                  </TouchableOpacity> */}

                </View>
              )
            })}
          </View>
        }
      </View>

    </BottomSheet>
  )
}

export default ShowPaymentSheet