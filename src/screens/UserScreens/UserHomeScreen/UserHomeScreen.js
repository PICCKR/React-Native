import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import styles from './Styles'
import Header from './Header'
import InputText from '../../../components/InputText/InputText'
import { Images } from '../../../assets/images'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { screenSize } from '../../../utils/Styles/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import SelectAmountPopup from '../../../components/SelectAmountPopup/SelectAmountPopup'
import { apiGet } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import Actions from '../../../redux/Actions'


const UserHomeScreen = () => {
  // Context and Navigation
  const { appStyles, userData, isDark, setSelectedVehicle } = useContext(AppContext)
  const navigation = useNavigation()
  const [vehicleType, setVehicleType] = useState([])

  // Mock Data for Vehicle Types and Reasons to Choose
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

  // console.log("juser dayayyaaa", userData);
  const getVehicleData = () => {
    Actions.showLoader(true)
    apiGet(endPoints.GET_VEHICLE_DATA).then((res) => {
      console.log("ress in vehical", res?.data?.data);
      if (res?.status === 200) {
        setVehicleType(res?.data?.data)
      }
      Actions.showLoader(false)
    }).catch((error) => {
      Actions.showLoader(false)
      console.log("error in vehcla data", error);
    })
  }

  useEffect(() => {
    getVehicleData()
  }, [])



  return (
    <SafeAreaView style={appStyles.container}>
      <ScrollView
        style={{}}
        showsVerticalScrollIndicator={false}
      >
        <Header
          userData={userData}
          appStyles={appStyles}
          isDark={isDark}
        />

        <View style={styles.homeScreenContainer}>
          {/* Input Text Component for Finding Destination */}
          <InputText
            placeholder="Find a destination"
            onPressIn={() => {
              navigation.navigate(MainRouteStrings.FIND_DESTINATON)
            }}
            hasLeftView
            renderLeftView={() => {
              return (
                <Images.search height={moderateScale(15)} width={moderateScale(15)} />
              )
            }}
          />

          {/* Conditional Rendering based on User Authentication */}
          {(userData?.token && !userData?.userRole[1]) && <TouchableOpacity
            activeOpacity={0.7}
            style={{ marginVertical: verticalScale(16), height: verticalScale(110), width: screenSize.width - scale(32) }}
            onPress={() => {
              navigation.navigate(MainRouteStrings.BECOME_PICKER)
            }}
          >
            <Image
              source={Images.becomePicckr}
              resizeMode="stretch"
              style={styles.becomePickerView}
            />
          </TouchableOpacity>}

          {/* Rendering Vehicle Types */}
          <Text style={[appStyles.mediumTextBlack, {
            marginTop: userData?.token ? 0 : verticalScale(10)
          }]}>Choose Vehicle</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator = {false}
            style={styles.vehicleTypeList}>
            {
              vehicleType.map((item) => {
                return (
                  <View key={item?._id} style={styles.VehicleType}>
                    <TouchableOpacity
                      style={styles.vehicleTypeIcon}
                      onPress={() => {
                        setSelectedVehicle(item)
                        navigation.navigate(MainRouteStrings.FIND_DESTINATON, {

                        })
                      }}
                    >
                      <Image source={{ uri: item?.catImage }} style={{
                        height: moderateScale(40),
                        width: moderateScale(40),
                      }} />
                      {/* <item.icon height={moderateScale(40)} width={moderateScale(40)} /> */}
                    </TouchableOpacity>
                    <Text style={appStyles.smallTextBlack}>
                      {item.name}
                    </Text>
                  </View>
                )
              })
            }
          </ScrollView>

          <Text style={appStyles.mediumTextBlack}>Why PicckR?</Text>

          {/* Rendering Reasons to Choose PicckR */}
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
    </SafeAreaView>
  )
}

export default UserHomeScreen