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
import SelectAmountPopup from '../../../components/SelectAmountPopup/SelectAmountPopup'
import { showErrorToast } from '../../../helper/showErrorToast'
import Actions from '../../../redux/Actions'
import { apiPost } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { showGeneralError } from '../../../helper/showGeneralError'
import { useSelector } from 'react-redux'

const UserProfileScreen = () => {

  const { appStyles, isDark, setIsDark, setuserData } = useContext(AppContext)
  const userData = useSelector((state) => state?.userDataReducer?.userData)
  console.log("userData===>", userData);
  const navigation = useNavigation()

  const [profileInformation, setProfileInformation] = useState({
    profileImg: userData?.picture,
    email: userData?.email,
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    phoneNumber: userData?.phoneNumber,
    selectedCountry: userData?.selectedCountry,
    address: userData?.address,
    paymentMethod: userData?.paymentMethod,
    walletBalance: 0
  })


  const handleOptionClick = (item) => {

    // console.log("item", item);
    switch (item) {
      case "Address":
        navigation.navigate(MainRouteStrings.ADDRESS_SCREEN)
        break;
      case "Wallet":
        navigation.navigate(MainRouteStrings.USER_WALLET_SCREEN)
        break;
      case "Rating & Reviews":
        navigation.navigate(MainRouteStrings.RATING_AND_REVIEW)
        break;
      case "KYC":
        navigation.navigate(MainRouteStrings.USER_KYC_SCREEN)
        break;
      case "Become PicckR":
        // navigation.navigate(MainRouteStrings.BECOME_PICKER)
        // return
        if (userData?.kycStatus === "approved") {
          navigation.navigate(MainRouteStrings.BECOME_PICKER)
        } else {
          showErrorToast("Please verify your KYC first", isDark)
        }

        break;
      case "Manage Account":
        navigation.navigate(MainRouteStrings.MANAGE_ACCOUNT)
        break;

      default:
        break;
    }
  }

  function hideNumber(number) {
    // return number
    // Convert the number to a string
    if(number){
     var numberStr = number?.toString();
  
     // Replace all but the last 4 characters with asterisks
     var hiddenPart = '*'.repeat(numberStr?.length - 4);
   
     // Concatenate the last 4 characters back onto the string
     var result = hiddenPart + numberStr.slice(-4);
   
     return result;
    }
  
  }


  return (
    <WrapperContainer
      centerTitle="Profile"
      rightTitle="Edit"
      handlerRightViewPress={() => {
        navigation.navigate(MainRouteStrings.EDIT_PROFILE, {
          from: MainRouteStrings.USER_PROFILE_SCREEN
        })
      }}
      showFooterButton={false}
      containerPadding={{ paddingHorizontal: 0 }}
    >
      <ScrollView
        style={{ paddingHorizontal: scale(0) }}
        showsVerticalScrollIndicator={false}
      >

        <PrifileView
          profileImg={userData?.picture}
          userData={{ ...userData, email: userData?.email === " " ? "" : userData?.email }}
        />

        <View style={{ paddingHorizontal: scale(16), paddingTop: verticalScale(10) }}>
          <Text style={appStyles.mediumTextBlackBold}>
            Account
          </Text>
          {/* 
          {editActionData.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                disabled={(item.type === "PicckRMode" || item.type === "Appearance" || (item.type === "KYC" && userData?.kyc?.idNumber)) ? true : false}
                style={styles.deatilsEditbutton}
                onPress={() => handleOptionClick(item)}
              >
                <Text style={[appStyles.smallTextGray]}>
                  {item.title}
                </Text>
                <View style={{ flexDirection: "row", alignItems: 'center', gap: scale(10) }}>
                  {item?.type === "Wallet" && <Text>
                    ₦{userData?.wallet?.balance}
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
                            setIsDark(!isDark)
                          } else {
                            setuserData({ ...userData, routeType: "picker" })
                          }

                        }}
                      />
                    </View>}
                  {item.type === "KYC" &&
                    <Text style={appStyles.smallTextGray}>{userData?.kyc?.idNumber}</Text>
                  }


                  {(item.type !== "PicckRMode" && item.type !== "Appearance" && item?.type !== "KYC") &&
                    <Images.rightArrow height={moderateScale(24)} />
                  }

                  {(item?.type == "KYC" && !userData?.kyc?.idNumber) &&
                    <Images.rightArrow height={moderateScale(24)} />
                  }
                </View>

              </TouchableOpacity>
            )
          })
          } */}


          <EditAction
            appStyles={appStyles}
            title="Address"
            showArrow
            handlePress={handleOptionClick}
          />

          <EditAction
            appStyles={appStyles}
            title="Wallet"
            showArrow
            handlePress={handleOptionClick}
          />

          <EditAction
            appStyles={appStyles}
            title="Rating & Reviews"
            showArrow
            handlePress={handleOptionClick}
          />

          <EditAction
            appStyles={appStyles}
            title="KYC"
            showArrow={userData?.kycStatus === "approved" ? false : true}
            disabled={userData?.kycStatus === "approved" ? true : false}
            handlePress={handleOptionClick}
            value={userData?.kycStatus === "approved" ? hideNumber(userData?.kyc?.idNumber) : ""}
          />

          {userData?.userRole?.length < 2 && <EditAction
            appStyles={appStyles}
            title="Become PicckR"
            showArrow
            handlePress={handleOptionClick}
          />}

          {userData?.userRole?.length == 2 && <EditAction
            appStyles={appStyles}
            title="PicckR Mode"
            disabled={true}
            showSwitch
            showSwitchValue={"off"}
            handleSwitchClicked={(value) => {
              Actions.userData({ ...userData, routeType: "picker" })
              // setuserData({ ...userData, routeType: "picker" })
            }}
          />
          }
          <EditAction
            appStyles={appStyles}
            title="Appearance"
            disabled={true}
            showSwitch
            showSwitchValue={isDark ? "Dark Mode" : "Light Mode"}
            handleSwitchClicked={(value) => {
              setIsDark(!isDark)
            }}
          />

          <EditAction
            appStyles={appStyles}
            title="Manage Account"
            showArrow
            handlePress={handleOptionClick}
          />

        </View>
      </ScrollView>

    </WrapperContainer >
  )
}

export default UserProfileScreen