import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { AppContext } from '../../../context/AppContext'
import { uiColours } from '../../../utils/Styles/uiColors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import styles from './Styles'
import { Images } from '../../../assets/images'
import { validateData } from '../../../helper/valiadateData'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import CustomButton from '../../../components/Button/CustomButton'
import ShowPaymentSheet from './ShowPaymentSheet'
import RadioButton from '../../../components/RadioButton/RadioButton'
import InputText from '../../../components/InputText/InputText'
import OtpPopUp from './OtpPopUp'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import useBackButton from '../../../customHooks/useBackButton'

const ItemsDetails = ({ route }) => {
  const data = route?.params?.data
  const { appStyles, isDark, selectedVehicle, setSelectedVehicle, setuserData, userData } = useContext(AppContext)
  console.log("selectedVehicle?.type", selectedVehicle);
  const navigation = useNavigation()

  const [showSheet, setShowSheet] = useState({
    paymentMethod: false,
    Otp: false
  })
  const [buttonActive, setButtonActive] = useState(false)
  const [itemsDetails, setItemsDetails] = useState({
    packagetype: {},
    estimatedItemWeight: "0",
    paymentMethod: null,
    vehicleType: {
      id: selectedVehicle?.id,
      type: selectedVehicle?.type,
      price: selectedVehicle?.price,
      tax: 0,
      totalPrice: ((selectedVehicle?.price * (0.02)) + selectedVehicle?.price)
    },

  })

  const VehicleTypeData = [
    {
      id: "1",
      icon: Images.scooter,
      type: "Bike",
      des: "For small items, max 10kg",
      price: 50
    },
    {
      id: "2",
      icon: Images.car,
      type: "Car",
      des: "For big items, max. 100kg",
      price: 100
    },
    {
      id: "3",
      icon: Images.van,
      type: "Van",
      des: "For bigger items, max. 150kg",
      price: 125
    },
    {
      id: "4",
      icon: Images.truck,
      type: "Truck",
      des: "For biggest items, max. 300kg",
      price: 150
    }
  ]

  const pckgeTypeData = [
    {
      id: "1",
      icon: Images.groceries,
      type: "",
      typeDisply: "Groceries"
    },
    {
      id: "2",
      icon: Images.email,
      type: "",
      typeDisply: "Documents"
    },
    {
      id: "3",
      icon: Images.dots,
      type: "",
      typeDisply: "More"
    },
  ]

  useEffect(() => {
    if (itemsDetails.paymentMethod &&
      itemsDetails.vehicleType?.id &&
      itemsDetails.estimatedItemWeight !== "" &&
      itemsDetails.packagetype?.type
    ) {
      setButtonActive(true)
    } else {
      setButtonActive(false)
    }
  }, [itemsDetails])

  useBackButton(() => {
    navigation.navigate(MainRouteStrings.SET_DESTINATION)
    return true
  })

  return (
    <WrapperContainer
      centerTitle="Details"
      showBackButton
      handleBack={() => {
        navigation.goBack()
      }}
      handleButtonPress={() => {
        setShowSheet({
          ...showSheet,
          Otp: true
        })
      }}
      showFooterButton={false}
      containerPadding={{}}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={appStyles.mediumTextBlackBold}>
          Item details<Text style={{ color: uiColours.RED }}>*</Text>
        </Text>

        <View style={[styles.vehicleTypeList, {
          borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY,
        }]}>
          <Text style={appStyles.smallTextBlackBold}>
            Choose Vehicle
          </Text>
          {
            VehicleTypeData.map((item) => {
              const selected = itemsDetails.vehicleType?.id === item?.id
              return (
                <View key={item.id} style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                  <View style={commonStyles.flexRowAlnCtr}>
                    <View style={styles.vehicleTypeIcon}>
                      <item.icon height={moderateScale(24)} width={moderateScale(24)} />
                    </View>
                    <View>
                      <Text style={appStyles.smallTextPrimaryBold}>
                        {item.type}
                      </Text>
                      <Text style={[appStyles.smallTextGray, { fontSize: scale(10) }]}>
                        {item.des}
                      </Text>
                    </View>
                  </View>

                  <View style={commonStyles.flexRowAlnCtr}>
                    <Text style={appStyles.smallTextGray}>
                      ${item.price}
                    </Text>
                    <TouchableOpacity
                      style={[styles.radioButton, {
                        borderColor: selected ? uiColours.PRIMARY : uiColours.GRAY_TEXT
                      }]}
                      onPress={() => {
                        setSelectedVehicle(item)
                        setItemsDetails({
                          ...itemsDetails,
                          vehicleType: {
                            ...item,
                            tax: (item.price * 2) / 100,
                            totalPrice: ((item.price * 2) / 100) + item.price
                          }
                        })
                      }}
                    >
                      {selected && <View style={styles.redioActive}>
                      </View>}
                    </TouchableOpacity>

                  </View>
                </View>
              )
            })
          }
        </View>

        <View style={[styles.packageType, {
          borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY,
        }]}>
          <Text style={appStyles.smallTextBlackBold}>Package type</Text>
          <View style={commonStyles.flexRowAlnCtr}>
            {
              pckgeTypeData.map((item) => {
                return (
                  <TouchableOpacity
                    style={[styles.packageTypeCard, {
                      backgroundColor: itemsDetails.packagetype?.id === item?.id ? uiColours.GOLDEN_LIGHT : null,
                      borderColor: (!isDark && itemsDetails.packagetype?.id === item?.id) ? uiColours.PRIMARY : (isDark && itemsDetails.packagetype?.id !== item?.id) ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY,
                    }]}
                    onPress={() => {
                      if (item.id !== "3") {
                        setItemsDetails({
                          ...itemsDetails,
                          packagetype: { ...item, type: item?.typeDisply }
                        })
                      } else {
                        setItemsDetails({
                          ...itemsDetails,
                          packagetype: item
                        })
                      }

                    }}
                  >
                    <item.icon height={moderateScale(18)} width={moderateScale(18)} />
                    <Text style={[appStyles.smallTextGray, {
                      color: itemsDetails.packagetype?.id === item?.id ? uiColours.PRIMARY : uiColours.GRAY_TEXT,
                    }]}>{item.typeDisply}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>

          {itemsDetails.packagetype?.typeDisply === "More" && <InputText
            hasTitle
            inputTitle="Fill the custom package type"
            inputContainer={{ marginTop: verticalScale(16) }}
            placeholder="Input ypur custom packge type"
            value={itemsDetails.packagetype?.type}
            handleChange={(e) => {
              setItemsDetails({
                ...itemsDetails,
                packagetype: {
                  type: e
                }
              })
            }}
          />}

          <InputText
            hasTitle
            inputTitle="Estimated item weight (kg)"
            inputContainer={{ marginTop: verticalScale(16) }}
            placeholder="0"
            keyboardType={"numeric"}
            value={itemsDetails.estimatedItemWeight}
            handleChange={(e) => {
              setItemsDetails({
                ...itemsDetails,
                estimatedItemWeight: e
              })
            }}
          />
        </View>

        <View style={[commonStyles.bottomBorder, {
          paddingVertical: verticalScale(16),
          borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY,
        }]}>
          <Text style={appStyles.smallTextBlackBold}>
            Payment method<Text style={{ color: uiColours.RED }}>*</Text>
          </Text>
          <TouchableOpacity
            style={[styles.paymentMethodButton, {
              borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY,
            }]}
            onPress={() => {
              if (userData?.type === "user") {
                setShowSheet({
                  ...showSheet,
                  paymentMethod: true
                })
              }else{
                setuserData(null)
              }

            }}
          >
            {itemsDetails.paymentMethod ?
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
              </View> :
              <Text style={appStyles.smallTextGray}>
                Select payment method
              </Text>}
            <Images.downArrow />
          </TouchableOpacity>
        </View>

        <View style={{ gap: verticalScale(7), marginTop: verticalScale(16), marginVertical: verticalScale(100) }}>
          <Text style={appStyles.smallTextBlackBold}>
            Total
          </Text>

          <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
            <Text style={appStyles.smallTextGray}>
              Applicable Fees
            </Text>
            <Text style={appStyles.smallTextGray}>
              ${itemsDetails.vehicleType.price}
            </Text>
          </View>

          <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
            <Text style={appStyles.smallTextGray}>
              Product Taxes (estimated)
            </Text>
            <Text style={appStyles.smallTextGray}>
              ${itemsDetails.vehicleType?.tax}
            </Text>
          </View>

          <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
            <Text style={appStyles.smallTextGray}>
              Total Payment
            </Text>
            <Text style={appStyles.smallTextGray}>
              ${itemsDetails.vehicleType?.totalPrice}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, {
        backgroundColor: isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT,
        borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY,
      }]}>

        <View style={{ flex: 1 }}>
          <Text style={appStyles.smallTextGray}>
            Total Payment
          </Text>
          <Text style={appStyles.mediumTextPrimaryBold}>
            ${itemsDetails.vehicleType.totalPrice}
          </Text>
        </View>

        <CustomButton
          disabled={!buttonActive}
          buttonStyle={{
            backgroundColor: buttonActive ? uiColours.PRIMARY :
              !buttonActive && isDark ? uiColours.GRAYED_BUTTON :
                uiColours.LIGHT_GRAY,
            flex: 1
          }}
          titleStyle={{
            color: buttonActive ? uiColours.WHITE_TEXT : !buttonActive && isDark ? uiColours.GRAY_TEXT :
              uiColours.GRAY_TEXT
          }}
          title="Order"
          NavigationHandle={() => {
            setShowSheet({
              ...showSheet,
              Otp: true
            })
          }}
        />
      </View>

      <ShowPaymentSheet
        isVisible={showSheet.paymentMethod}
        setShowSheet={setShowSheet}
        handleSelectPayment={() => {
          setItemsDetails({
            ...itemsDetails,
            paymentMethod: "wallet"
          })
        }}
      />

      <OtpPopUp
        isVisible={showSheet.Otp}
        appStyles={appStyles}
        isDark={isDark}
        setShowSheet={setShowSheet}
        handleVerifyOtp={() => {
          setShowSheet({
            ...showSheet,
            Otp: false
          })
          setSelectedVehicle(itemsDetails.vehicleType)
          navigation.navigate(MainRouteStrings.FINDING_PICKER)
        }}
      />
    </WrapperContainer>
  )
}

export default ItemsDetails