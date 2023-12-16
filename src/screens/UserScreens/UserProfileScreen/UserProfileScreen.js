import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import styles from './Styles'
import { Images } from '../../../assets/images'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import EditAction from './EditAction'
import { moderateScale, scale } from 'react-native-size-matters'
import PrifileView from '../../../components/PrifileView/PrifileView'
import Switch from '../../../components/Switch/Switch'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import ConfirmationSheet from '../../../components/ConfirmationSheet/ConfirmationSheet'
import { uiColours } from '../../../utils/Styles/uiColors'
import { clearLocalData, setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'

const UserProfileScreen = () => {

  const { appStyles, userData, isDark, setIsDark, setuserData } = useContext(AppContext)
  // console.log("userData", userData);
  const navigation = useNavigation()

  const [profileInformation, setProfileInformation] = useState({
    profileImg: null,
    email: userData?.email,
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    phoneNumber: userData?.phoneNumber,
    selectedCountry: userData?.selectedCountry,
    address: userData?.address,
    paymentMethod: userData?.paymentMethod,

  })

  const [showSheet, setShowSheet] = useState({
    email: false,
    showAddress: false,
    addAddress: false,
    showPayment: false,
    addPayment: false
  })

  const [mode, setMode] = useState("Light Mode")

  const editActionData = [
    {
      id: "1",
      title: "Address",
      type: "address"
    },
    {
      id: "2",
      title: "Payment Method",
      type: "paymentMethod"
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
      title: "Sign out",
      type: "Signout"
    }
  ]

  const handleOptionClick = (item) => {
    switch (item?.type) {
      case "address":
        navigation.navigate(MainRouteStrings.ADDRESS_SCREEN)
        break;
      case "paymentMethod":
        navigation.navigate(MainRouteStrings.PAYMENT_METHOD)
        break;
      case "addresRatingReviewss":
        navigation.navigate(MainRouteStrings.RATING_AND_REVIEW)
        break;
      case "KYC":
        navigation.navigate(MainRouteStrings.USER_KYC_SCREEN)
        break;
      case "BecomePicckR":
        navigation.navigate(MainRouteStrings.BECOME_PICKER)
        break;
      case "Signout":

        break;

      default:
        break;
    }
  }

  return (
    <WrapperContainer
      centerTitle="Profile"
      rightTitle="Edit"
      showFooterButton={false}
      // handleButtonPress={handleSave}
      // buttonActive={buttonActive}
      containerPadding={{ paddingHorizontal: 0 }}
    >
      <ScrollView
        style={{ paddingHorizontal: scale(16) }}
      >

        <View style={styles.profileSection}>
          <PrifileView
            profileViewStyles={{}}
          />
          <Text style={appStyles.mediumTextPrimaryBold}>
            {profileInformation?.firstName} {profileInformation?.lastName}
          </Text>
          <Text style={appStyles.smallTextGray}>
            {profileInformation?.email}
          </Text>
          <Text style={appStyles.smallTextGray}>
            {`${profileInformation?.selectedCountry?.code} ${profileInformation?.phoneNumber}`}
          </Text>
        </View>

        <View style={{}}>
          <Text style={appStyles.mediumTextBlackBold}>
            Account
          </Text>

          {
            editActionData.map((item) => {
              return (
                <TouchableOpacity

                  key={item.id}
                  disabled={(item.type === "PicckRMode" || item.type === "Appearance") ? true : false}
                  style={styles.deatilsEditbutton}
                  onPress={() => handleOptionClick(item)}
                >
                  <Text style={appStyles.smallTextGray}>
                    {item.title}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: 'center', gap: scale(10) }}>
                    {item?.type === "paymentMethod" && <Text>
                      {
                        profileInformation?.paymentMethod?.length
                      } Cards
                    </Text>
                    }
                    {item?.type === "address" &&
                      <Text>
                        {profileInformation?.address?.length} Address
                      </Text>
                    }
                    {(item.type === "PicckRMode" || item.type === "Appearance") ?
                      <View style={commonStyles.flexRowAlnCtr}>
                        {item.type === "PicckRMode" &&
                          <Text>off</Text>
                        }

                        {item.type === "Appearance" &&
                          <Text>{isDark ? "Dark Mode" : "Light Mode"}</Text>
                        }

                        <Switch
                          handleSwitchClicked={(status) => {
                            // console.log("status==>", status);
                            if (item.type === "Appearance") {
                              setIsDark(status)
                            } else {
                              setuserData({ ...userData, type: "picker" })
                            }

                          }}
                        />
                      </View>
                      :
                      <Images.rightArrow height={moderateScale(24)} />}
                  </View>

                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>
      <ConfirmationSheet
        isVisible={true}
        renderIcon={() => {
          return (
            <Image source={Images.logOut} style={commonStyles.icon} tintColor={uiColours.GRAY_TEXT} />
          )
        }}
        title="Are you sure want to Sign out"
        buttonTitle="Sign out"
        handleButtonClick={() => {
          clearLocalData()
          setuserData(null)
        }}
      />
    </WrapperContainer >
  )
}

export default UserProfileScreen