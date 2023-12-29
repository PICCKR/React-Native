import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import styles from './Styles'
import { Images } from '../../../assets/images'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import EditAction from './EditAction'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import PrifileView from '../../../components/PrifileView/ProfileView'
import Switch from '../../../components/Switch/Switch'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import ConfirmationSheet from '../../../components/ConfirmationSheet/ConfirmationSheet'
import { uiColours } from '../../../utils/Styles/uiColors'
import { clearLocalData, setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'
import AddTopUp from '../UserHomeScreen/AddTopUp'

const UserProfileScreen = () => {

  const { appStyles, userData, isDark, setIsDark, setuserData } = useContext(AppContext)
  // console.log("userData", userData);
  const navigation = useNavigation()

  const [profileInformation, setProfileInformation] = useState({
    profileImg: userData?.profileImg,
    email: userData?.email,
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    phoneNumber: userData?.phoneNumber,
    selectedCountry: userData?.selectedCountry,
    address: userData?.address,
    paymentMethod: userData?.paymentMethod,
    walletBalance: 0

  })

  const [showSheet, setShowSheet] = useState({
    addPayment: false,
  })

  const [walletBalance, seWalletBalance] = useState({
    price: "0"
  })

  const editActionData = [
    {
      id: "1",
      title: "Address",
      type: "address"
    },
    {
      id: "2",
      title: "Wallet",
      type: "Wallet"
    },
    {
      id: "3",
      title: "Rating & Reviews",
      type: "addresRatingReviewss"
    },
    {
      id: "4",
      title: "KYC",
      type: "KYC"
    },
    {
      id: "5",
      title: "Become PicckR",
      type: "BecomePicckR"
    },
    {
      id: "6",
      title: "PicckR Mode",
      type: "PicckRMode"
    },
    {
      id: "7",
      title: "Appearance",
      type: "Appearance"
    },
    {
      id: "8",
      title: "Manage Account",
      type: "ManageAccount"
    }
  ]

  const handleOptionClick = (item) => {
    switch (item?.type) {
      case "address":
        navigation.navigate(MainRouteStrings.ADDRESS_SCREEN)
        break;
      case "Wallet":
        setShowSheet({
          ...showSheet,
          addPayment: true
        })
        break;
      case "addresRatingReviewss":
        navigation.navigate(MainRouteStrings.RATING_AND_REVIEW)
        break;
      case "KYC":
        // navigation.navigate(MainRouteStrings.USER_KYC_SCREEN)
        break;
      case "BecomePicckR":
        navigation.navigate(MainRouteStrings.BECOME_PICKER)
        break;
      case "ManageAccount":
        navigation.navigate(MainRouteStrings.MANAGE_ACCOUNT)
        break;

      default:
        break;
    }
  }

  return (
    <WrapperContainer
      centerTitle="Profile"
      rightTitle="Edit"
      handlerRightViewPress={() => {
        navigation.navigate(MainRouteStrings.EDIT_PROFILE)
      }}
      showFooterButton={false}
      containerPadding={{ paddingHorizontal: 0 }}
    >
      <ScrollView
        style={{ paddingHorizontal: scale(0) }}
      >

        <PrifileView
          profileImg={profileInformation?.profileImg}
          userData={userData}
        />

        <View style={{ paddingHorizontal: scale(16), paddingTop: verticalScale(10) }}>
          <Text style={appStyles.mediumTextBlackBold}>
            Account
          </Text>

          {
            editActionData.map((item) => {
              return (
                <TouchableOpacity

                  key={item.id}
                  disabled={(item.type === "PicckRMode" || item.type === "Appearance" || item.type === "KYC") ? true : false}
                  style={styles.deatilsEditbutton}
                  onPress={() => handleOptionClick(item)}
                >
                  <Text style={[appStyles.smallTextGray]}>
                    {item.title}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: 'center', gap: scale(10) }}>
                    {item?.type === "Wallet" && <Text>
                      {
                        walletBalance?.price
                      }
                    </Text>
                    }
                    {item?.type === "address" &&
                      <Text style={appStyles.smallTextGray}>
                        {profileInformation?.address?.length} Address
                      </Text>
                    }
                    {(item.type === "PicckRMode" || item.type === "Appearance") &&
                      <View style={commonStyles.flexRowAlnCtr}>
                        {item.type === "PicckRMode" &&
                          <Text style={appStyles.smallTextGray}>off</Text>
                        }

                        {item.type === "Appearance" &&
                          <Text style={appStyles.smallTextGray}>{isDark ? "Dark Mode" : "Light Mode"}</Text>
                        }

                        <Switch
                          initialValue={item.type === "Appearance" && isDark}
                          handleSwitchClicked={(status) => {
                            // console.log("status==>", status);
                            if (item.type === "Appearance") {
                              setIsDark(status)
                            } else {
                              setuserData({ ...userData, type: "picker" })
                            }

                          }}
                        />
                      </View>}
                    {item.type === "KYC" &&
                      <Text style={appStyles.smallTextGray}>{userData?.bvn}</Text>
                    }


                    {(item.type !== "PicckRMode" && item.type !== "Appearance" && item?.type !== "KYC") &&
                      <Images.rightArrow height={moderateScale(24)} />
                    }
                  </View>

                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>

      <AddTopUp
        isVisible={showSheet.addPayment}
        appStyles={appStyles}
        setShowSheet={setShowSheet}
        topUpAmount={walletBalance}
        setTopUpAmount={seWalletBalance}
        handleAddTopUp={() => {
          setShowSheet({
            ...showSheet,
            addPayment: false,
          })
        }}

      />
    </WrapperContainer >
  )
}

export default UserProfileScreen