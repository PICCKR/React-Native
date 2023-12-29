import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import styles from './Styles'
import Header from './Header'
import InputText from '../../../components/InputText/InputText'
import { Images } from '../../../assets/images'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { uiColours } from '../../../utils/Styles/uiColors'
import { screenSize } from '../../../utils/Styles/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import TopUpSheet from './TopUpSheet'
import AddTopUp from './AddTopUp'
import OtpPopUp from './OtpPopUp'
import { showToast } from '../../../components/tostConfig/tostConfig'
import { tostMessagetypes } from '../../../utils/Constents/constentStrings'

const UserHomeScreen = () => {
  const { appStyles, userData, isDark, setSelectedVehicle } = useContext(AppContext)
  const navigation = useNavigation()

  const [showSheet, setShowSheet] = useState({
    showPayment: false,
    addPayment: false,
    Otp: false
  })
  const [topUpAmount, setTopUpAmount] = useState({
    price: "0"
  })

  const recentDestinationData = [
    {
      title: "Harvard University",
      details: 'Massachusetts Hall, Cambridge, MA 02138'
    },
    {
      title: "Houghton Library",
      details: 'Quincy Street &, Harvard St, Cambridge, MA 02138'
    },
    {
      title: "Cambridge Historical Tours",
      details: '1400 Massachusetts Ave, Cambridge, MA 02138'
    },
    {
      title: "John Harvard Statue",
      details: 'Harvard Yard, 1, Cambridge, MA 02138'
    }
  ]

  const VehicleType = [
    {
      id: "1",
      icon: Images.scooter,
      type: "Bike",
      price: 50
    },
    {
      id: "2",
      icon: Images.car,
      type: "Car",
      price: 100
    },
    {
      id: "3",
      icon: Images.van,
      type: "Van",
      price: 125
    },
    {
      id: "4",
      icon: Images.truck,
      type: "Truck",
      price: 150
    }
  ]

  const whyPickerData = [
    {
      id: '1',
      icon: Images.truck,
      title: "Delivering your package quickly",
      description: "We also have many PicckRs, so your packages will be sent and arrive on time."
    },
    {
      id: '2',
      icon: Images.clock,
      title: "Saving your time",
      description: "Makes it easier for you to send items to various destinations and saves your time."
    },
    {
      id: '3',
      icon: Images.moneyBag,
      title: "Saving your money",
      description: "PicckR saves time, energy, and costs with affordable prices."
    }
  ]

  return (
    <SafeAreaView style={appStyles.container}>
      <ScrollView
        style={{}}
        showsVerticalScrollIndicator={false}
      >
        <Header
          userData={userData}
          appStyles={appStyles}
          setShowSheet={setShowSheet}
          showSheet={showSheet}
          topUpAmount={topUpAmount}
          isDark={isDark}
        />
        <View style={styles.homeScreenContainer}>
          <InputText
            placeholder="Find a destination"
            onPressIn={()=>{
              navigation.navigate(MainRouteStrings.FIND_DESTINATON)
            }}
            hasLeftView
            renderLeftView={() => {
              return (
                <Images.search height={moderateScale(15)} width={moderateScale(15)} />
              )
            }}
          />
          {/* <View style={styles.recentDestinationView}>
            <Text style={appStyles.mediumTextBlack}>Recent destination</Text>
            {
              recentDestinationData.map((item) => {
                return (
                  <View key={item.title} style={{ flexDirection: 'row', gap: scale(8) }}>
                    <Images.locationPinRed height={moderateScale(20)} width={moderateScale(20)} />
                    <View style={{ flex: 1 }}>
                      <Text style={appStyles.smallTextBlackBold}>
                        {item?.title}
                      </Text>
                      <Text style={appStyles.smallTextGray}>
                        {item?.details}
                      </Text>
                    </View>
                  </View>
                )
              })
            }
          </View> */}

         {userData?.type === "user" && <TouchableOpacity
            activeOpacity={0.7}
            style={{ marginVertical: verticalScale(16), height:verticalScale(110), width:screenSize.width - scale(32) }}
            onPress={() => {
              navigation.navigate(MainRouteStrings.BECOME_PICKER)
            }}
          >
            <Image 
            source={Images.becomePicckr}
            resizeMode = "stretch"
              style={styles.becomePickerView}
            />
          </TouchableOpacity>}

          <Text style={[appStyles.mediumTextBlack,{
            marginTop: userData?.type === "user" ? 0 : verticalScale(10)
          }]}>Choose Vehicle</Text>
          <View style={styles.vehicleTypeList}>
            {
              VehicleType.map((item) => {
                return (
                  <View key={item?.id} style={styles.VehicleType}>
                    <TouchableOpacity
                      style={styles.vehicleTypeIcon}
                      onPress={() => {
                        setSelectedVehicle(item)
                        navigation.navigate(MainRouteStrings.FIND_DESTINATON, {

                        })
                      }}
                    >
                      <item.icon height={moderateScale(40)} width={moderateScale(40)} />
                    </TouchableOpacity>
                    <Text style={appStyles.smallTextBlack}>
                      {item.type}
                    </Text>
                  </View>
                )
              })
            }
          </View>

          <Text style={appStyles.mediumTextBlack}>Why PicckR?</Text>
          <View style={styles.whyPickerItemList}>
            {
              whyPickerData.map((item) => {
                return (
                  <View key={item?.id} style={styles.whyPickerItem}>
                    <item.icon height={moderateScale(32)} width={moderateScale(32)} />
                    <View style={{ flex: 1 }}>
                      <Text style={appStyles.mediumTextPrimaryBold}>
                        {item.title}
                      </Text>
                      <Text style={appStyles.smallTextGray}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                )
              })
            }
          </View>

        </View>
      </ScrollView>

      <AddTopUp
        isVisible={showSheet.addPayment}
        appStyles={appStyles}
        setShowSheet={setShowSheet}
        topUpAmount={topUpAmount}
        setTopUpAmount={setTopUpAmount}
        handleAddTopUp={(item) => {
          setTopUpAmount(item)
          setShowSheet({
            ...showSheet,
            addPayment: false,
          })
        }}

      />
      {/* <OtpPopUp
        isVisible={showSheet.Otp}
        appStyles={appStyles}
        setShowSheet={setShowSheet}
        handleVerifyOtp={() => {
          setShowSheet({
            ...showSheet,
            Otp: false
          })
          const toastMsgConfg = {
            isDark: isDark,
            msg: "You successfully top up your wallet"
          }
          showToast(toastMsgConfg, tostMessagetypes.SUCCESS, isDark)
        }}
      /> */}
    </SafeAreaView>
  )
}

export default UserHomeScreen