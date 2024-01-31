import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { AppContext, useSocket } from '../../../context/AppContext'
import { uiColours } from '../../../utils/Styles/uiColors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import styles from './Styles'
import { Images } from '../../../assets/images'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import CustomButton from '../../../components/Button/CustomButton'
import ShowPaymentSheet from './ShowPaymentSheet'
import InputText from '../../../components/InputText/InputText'
import { useNavigation } from '@react-navigation/native'
import { AuthRouteStrings, MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import useBackButton from '../../../customHooks/useBackButton'
import { showErrorToast } from '../../../helper/showErrorToast'
import SelectAmountPopup from '../../../components/SelectAmountPopup/SelectAmountPopup'
import Actions from '../../../redux/Actions'
import { apiGet, apiPost } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { showGeneralError } from '../../../helper/showGeneralError'
import { getPreciseDistance } from 'geolib'
import AddAmountSheet from './AddAmountSheet'
import { useSelector } from 'react-redux'
import { formatAmount } from '../../../helper/formatter'

const ItemsDetails = ({ route }) => {

  const {
    appStyles,
    isDark,
    selectedVehicle,
    setSelectedVehicle,
    setuserData,
    userData,
    vehicleType,
    setOrderDeatils,
    source,
    destination,
    setFromGuestUserScreen
  } = useContext(AppContext)

  const { Socket } = useSocket()

  const orderDeatils = useSelector((state) => state?.orderDeatilsReducer?.orderDeatils)
  // console.log("orderd deatils", orderDeatils);


  const navigation = useNavigation()

  const [showSheet, setShowSheet] = useState({
    paymentMethod: false,
    Otp: false,
    payment: false
  })
  const [showCustomPackage, setShowCustomPackage] = useState(false)
  const [buttonActive, setButtonActive] = useState(false)

  const [itemsDetails, setItemsDetails] = useState({
    packagetype: orderDeatils?.itemsDetails?.packagetype ? orderDeatils?.itemsDetails?.packagetype : null,
    estimatedItemWeight: orderDeatils?.itemsDetails?.estimatedItemWeight ? orderDeatils?.itemsDetails?.estimatedItemWeight : 1,
    paymentMethod: null,
    vehicleType: selectedVehicle,
    price: 0,
    amountToBeAdded: 0
  })

  const [packageData, setPackageData] = useState([])


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


  // Function to handle addition of amount to wallet balance
  const handleAddAmount = async (data, amount) => {
    setShowSheet({
      ...showSheet,
      payment: false
    })
    // console.log("data====>", data, amount);
    if (data?.status === "successful") {
      updateTransaction(data, amount)
    } else {
      // Handle unsuccessful transaction
    }
  }

  const updateTransaction = async (data, amount) => {
    Actions.showLoader(true)
    const transactionData = {
      "userId": userData?._id,
      "amount": amount,
      "flutterwaveDetails": { ...data, amount: amount }
    }
    apiPost(endPoints.UPDATE_TOP_UP, transactionData).then((res) => {
      // console.log("res in transaction update", res?.status, res?.data);
      if (res?.status === 201) {
        setuserData({
          ...userData, wallet: {
            ...userData?.wallet,
            balance: parseInt(userData?.wallet?.balance) + parseInt(amount)
          }
        })

      } else {
        showGeneralError()
      }
      Actions.showLoader(false)
    }).catch((err) => {
      showGeneralError()
      Actions.showLoader(false)
      console.log("error in update transaction", err);
    })
  }


  const calculatePrice = async () => {
    if (itemsDetails?.estimatedItemWeight) {
      var pdis = await getPreciseDistance(
        { latitude: source?.lat, longitude: source?.lng },
        { latitude: destination?.lat, longitude: destination?.lng }
      );
      const d = ((pdis * 15) / 100) + pdis
      const dis = Math.round((d / 1000) * 10) / 10
      // console.log("dis====>", dis);

      // TotalCost= distance*distance cost + weight* weight cost
      const totalCost = (dis * itemsDetails?.vehicleType?.distance?.cost) + (parseInt(itemsDetails?.estimatedItemWeight) * itemsDetails?.vehicleType?.weight?.cost)
      const reminingAmount = (totalCost + (totalCost * 0.075)).toFixed(2) - userData?.wallet?.balance
      setItemsDetails({
        ...itemsDetails,
        price: totalCost,
      })
      Actions.orderDeatils({
        ...orderDeatils, amountToBeAdded: reminingAmount
      })
    } else {
      setItemsDetails({
        ...itemsDetails,
        price: 0,
      })
      Actions.orderDeatils({
        ...orderDeatils, amountToBeAdded: 0
      })
    }


    // console.log("total cost", totalCost, itemsDetails);
  }


  const handleOrder = async () => {
    const reminingAmount = (itemsDetails?.price + (itemsDetails?.price * 0.075)).toFixed(2) - userData?.wallet?.balance
    await Actions.orderDeatils({
      ...orderDeatils, amountToBeAdded: reminingAmount
    })
    console.log("itemsDetails?.amountToBeAdded", reminingAmount);
    // return
    if (userData?.wallet?.balance < reminingAmount) {
      setShowSheet({
        ...showSheet,
        payment: true
      })

    } else {
      Actions.orderDeatils({
        ...orderDeatils,
        itemsDetails: itemsDetails
      })
      setOrderDeatils({
        ...orderDeatils,
        itemsDetails: itemsDetails
      })
      setSelectedVehicle(itemsDetails.vehicleType)

      const orderData = {
        "userId": userData?._id,
        "packageId": itemsDetails?.packagetype?._id,
        "vehicleType": selectedVehicle?._id,
        "pickupLocation": {
          "type": "Point",
          "coordinates": [source?.lat, source?.lng]
        },
        "dropOffLocation": {
          "type": "Point",
          "coordinates": [destination?.lat, destination?.lng]
        },
        "dropOffAddress": destination?.location,
        "pickupAddress": source?.location,
        "parcelDescription": {
          "weight": `${itemsDetails?.estimatedItemWeight} lbs`,
          "unit": "kg",
          "description": itemsDetails?.packagetype?.name
        },
        "sender": {
          "phone": orderDeatils?.pickUpData?.phoneNumber,
          "name": orderDeatils?.pickUpData?.name
        },
        "recipient": {
          "phone": orderDeatils?.recipientData?.phoneNumber,
          "name": orderDeatils?.recipientData?.name
        },
        "specialInstructions": "Handle with care",
        "pickupDate": orderDeatils?.pickUpData?.pickupDate,
        "requestAmount": (itemsDetails?.price + (itemsDetails?.price * 0.075)).toFixed(2)
      }

      // console.log("data====>", orderData);
      Socket.emit("create-request", orderData)
      Actions.showLoader(true)
    }
  }

  const getPackageData = async () => {
    Actions.showLoader(true)
    apiGet(endPoints.PAKAGES).then(async (res) => {
      Actions.showLoader(false)
      if (res?.status === 200) {
        const packages = res?.data?.data

        await packages.push({
          _id: "3",
          name: "More",
        })

        // console.log("packages===>",);
        setPackageData(packages)
        console.log("res ===>", res?.data?.data);
      }

    }).catch((error) => {
      Actions.showLoader(false)
      console.log("error ===>", error);
    })
  }

  useEffect(() => {
    getPackageData()
  }, [])


  useEffect(() => {
    calculatePrice()
  }, [itemsDetails?.estimatedItemWeight, itemsDetails?.vehicleType])


  useEffect(() => {
    if ((itemsDetails.paymentMethod || !userData?.token) &&
      itemsDetails.vehicleType &&
      itemsDetails.estimatedItemWeight !== "" &&
      itemsDetails.packagetype
    ) {
      setButtonActive(true)
    } else {
      setButtonActive(false)
    }
  }, [itemsDetails])


  const handleOrderCreated = useCallback(async (data) => {
    console.log("orderAccepted", data);
    Actions.showLoader(false)
    navigation.navigate(MainRouteStrings.FINDING_PICKER)
  }, [Socket])

  const handleOrderError = useCallback(async (data) => {
    // showErrorToast("")
    Actions.showLoader(false)
    console.log("order error", data);
  }, [Socket])



  useEffect(() => {
    Socket.on('request-created', handleOrderCreated)
    Socket.on('request-error', handleOrderError)

    return () => {
      Socket.off('request-created', handleOrderCreated)
      Socket.off('request-error', handleOrderError)
    }
  }, [Socket, handleOrderCreated, handleOrderError])


  useBackButton(() => {
    navigation.goBack()
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
          paymentMethod: true
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
            vehicleType.map((item) => {
              const selected = itemsDetails.vehicleType?._id === item?._id
              // console.log("item?.catImage", item?.catImage);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={commonStyles.flexRowAlnCtrJutySpaceBetween}
                  onPress={() => {
                    setSelectedVehicle(item)
                    setItemsDetails({
                      ...itemsDetails,
                      vehicleType: item
                    })
                  }}
                >
                  <View style={commonStyles.flexRowAlnCtr}>
                    <View style={styles.vehicleTypeIcon}>
                      <Image source={{ uri: item?.catImage }} style={{
                        height: "75%",
                        width: "75%",
                      }} />
                    </View>
                    <View>
                      <Text style={appStyles.smallTextPrimaryBold}>
                        {item.name}
                      </Text>
                      <Text style={[appStyles.smallTextGray, { fontSize: scale(10) }]}>
                        {item.description}
                      </Text>
                    </View>
                  </View>

                  <View style={commonStyles.flexRowAlnCtr}>
                    {/* <Text style={appStyles.smallTextGray}>
                      ₦{item?.}
                    </Text> */}
                    <View
                      style={[styles.radioButton, {
                        borderColor: selected ? uiColours.PRIMARY : uiColours.GRAY_TEXT
                      }]}

                    >
                      {selected && <View style={styles.redioActive}>
                      </View>}
                    </View>

                  </View>
                </TouchableOpacity>
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
              packageData.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index.toString()}
                    style={[styles.packageTypeCard, {
                      backgroundColor: itemsDetails?.packagetype?._id === item?._id ? uiColours.GOLDEN_LIGHT : null,
                      borderColor: (!isDark && itemsDetails.packagetype?._id === item?._id) ? uiColours.PRIMARY : (isDark && itemsDetails.packagetype?._id !== item?._id) ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY,
                    }]}
                    onPress={() => {
                      if (item._id !== "3") {
                        setShowCustomPackage(false)
                        setItemsDetails({
                          ...itemsDetails,
                          packagetype: item
                        })
                      } else {
                        // setItemsDetails({
                        //   ...itemsDetails,
                        //   packagetype: item
                        // })
                        setItemsDetails({
                          ...itemsDetails,
                          packagetype: null
                        })
                        setShowCustomPackage(true)
                      }

                    }}
                  >
                    {/* <item.icon height={moderateScale(18)} width={moderateScale(18)} /> */}
                    <Text style={[appStyles.smallTextGray, {
                      color: itemsDetails.packagetype?.id === item?.id ? uiColours.PRIMARY : uiColours.GRAY_TEXT,
                    }]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>

          {showCustomPackage && <InputText
            hasTitle
            inputTitle="Fill the custom package type"
            inputContainer={{ marginTop: verticalScale(16) }}
            placeholder="Input ypur custom packge type"
            value={itemsDetails.packagetype?.type}
            handleChange={(e) => {
              setItemsDetails({
                ...itemsDetails,
                packagetype: {
                  ...itemsDetails?.packagetype,
                  name: e,
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

        {userData?.token && <View style={[commonStyles.bottomBorder, {
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
              if (userData?.token) {
                setShowSheet({
                  ...showSheet,
                  paymentMethod: true
                })
              } else {
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
                    {formatAmount(userData?.wallet?.balance)}
                  </Text>
                </View>
              </View> :
              <Text style={appStyles.smallTextGray}>
                Select payment method
              </Text>}
            <Images.downArrow />
          </TouchableOpacity>
        </View>}

        {/* <CustomButton
          buttonType={buttonTypes.MEDIUM}
          buttonStyle={{ marginTop: verticalScale(30) }}
        /> */}

        <View style={{ gap: verticalScale(7), marginTop: verticalScale(16), marginVertical: verticalScale(100) }}>
          <Text style={appStyles.smallTextBlackBold}>
            Total
          </Text>

          <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
            <Text style={appStyles.smallTextGray}>
              Applicable Fees
            </Text>
            <Text style={appStyles.smallTextGray}>
              {formatAmount(itemsDetails?.price)}
              {/* ₦20 */}
            </Text>
          </View>

          <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
            <Text style={appStyles.smallTextGray}>
              Product Taxes (estimated)
            </Text>
            <Text style={appStyles.smallTextGray}>
              {formatAmount(itemsDetails?.price * 0.075)}
              {/* ₦{(itemsDetails?.price * 0.075).toFixed(2)} */}
            </Text>
          </View>

          <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
            <Text style={appStyles.smallTextGray}>
              Total Payment
            </Text>
            <Text style={appStyles.smallTextGray}>
              {formatAmount((itemsDetails?.price + itemsDetails?.price * 0.075))}
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
            {formatAmount((itemsDetails?.price + itemsDetails?.price * 0.075))}
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
            // if (!userData?._id) {
            //   setFromGuestUserScreen(MainRouteStrings?.ITEMS_DETAILS)
            //   navigation.navigate(AuthRouteStrings.WELCOME_SCREEN)
            // } else if (userData?.kycStatus != "approved") {
            //   showErrorToast("Please complete your kyc first", isDark)
            //   navigation.navigate(MainRouteStrings.USER_KYC_SCREEN)
            // } else {
            //   handleOrder()
            // }

            if (!userData?._id) {
              setFromGuestUserScreen(MainRouteStrings?.ITEMS_DETAILS)
              navigation.navigate(AuthRouteStrings.WELCOME_SCREEN)
            } else {
              handleOrder()
            }
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

      {/* <OtpPopUp
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
      /> */}

      {/* SelectAmountPopup component for topping up the wallet */}
      <AddAmountSheet
        sheetTitle={"Top Up"}
        isVisible={showSheet.payment}
        appStyles={appStyles}
        orderDeatils={orderDeatils}
        setItemsDetails={setItemsDetails}
        handleOnRedirect={(data, amount) => { handleAddAmount(data, amount) }}
        setShowSheet={setShowSheet}

      />
      {/* <SelectAmountPopup
        sheetTitle={"Top Up"}
        isVisible={showSheet.payment}
        appStyles={appStyles}
        wallateBalance={`Add ₦${(itemsDetails?.price + itemsDetails?.price * 0.075).toFixed(2) - userData?.wallet?.balance} to proceed with order`}
        setShowSheet={setShowSheet}
        handleOnRedirect={(data, amount) => { handleAddAmount(data, amount) }}
        from={"itemDetails"}
        amountToBeAdded={(itemsDetails?.price + itemsDetails?.price * 0.075).toFixed(2) - userData?.wallet?.balance}
      /> */}
    </WrapperContainer>
  )
}

export default ItemsDetails