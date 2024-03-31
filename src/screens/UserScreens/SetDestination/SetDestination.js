import { View, Text, SafeAreaView, DatePickerAndroid, Platform } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { screenSize } from '../../../utils/Styles/CommonStyles'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Images } from '../../../assets/images'
import { moderateScale } from 'react-native-size-matters'
import PickUpSheet from './PickUpSheet'
import RecipientSheet from './RecipientSheet'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import moment from 'moment'
import { uiColours } from '../../../utils/Styles/uiColors'
import DatePicker from '../../../components/DatePicker'
import useBackButton from '../../../customHooks/useBackButton'
import { useSelector } from 'react-redux'
import Actions from '../../../redux/Actions'


const SetDestination = ({ route }) => {
  const from = route?.params?.from
  const {
    appStyles,
    destination,
    source,
    isDark,
    // orderDeatils,
    setOrderDeatils
  } = useContext(AppContext)
  const userData = useSelector((state) => state?.userDataReducer?.userData)
  const orderDeatils = useSelector((state) => state?.orderDeatilsReducer?.orderDeatils)
  // console.log("userData", userData);

  const navigation = useNavigation()
  const isFocused = useIsFocused();

  const mapRef = useRef()
  const ASPECT_RATIO = screenSize.width / screenSize.height;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


  const [showBottomSheet, setShowBottomSheet] = useState({
    recipient: true,
    pickup: false,
    datePicker: false
  })

  const [recipientData, setRecipientData] = useState({
    name: orderDeatils?.recipientData?.name,
    phoneNumber: orderDeatils?.recipientData?.phoneNumber
  })
  const [pickUpData, setPickUpData] = useState({
    name: orderDeatils?.pickUpData?.name ? orderDeatils?.pickUpData?.name : userData?.token ? `${userData?.firstName} ${userData?.lastName}` : "",
    phoneNumber: orderDeatils?.pickUpData?.phoneNumber ? orderDeatils?.pickUpData?.phoneNumber : userData?.token ? userData?.phoneNumber : "",
    selectedCountry: orderDeatils?.pickUpData?.selectedCountry ? orderDeatils?.pickUpData?.selectedCountry : userData?.token ? { code: userData?.phoneNumber?.split(" ")[0] } : { code: "+234" },
    pickupDate: orderDeatils?.pickUpData?.pickupDate
  })

  const [showTime, setShowTime] = useState(true)

  const getDate = () =>{
    // Create a new Date object
var currentDate = new Date();

// Get the current date
var day = currentDate.getDate();

// Set the date to one day back
currentDate.setDate(day - 1);

// Output the updated date
return currentDate.toISOString()
  }

  useEffect(() => {
    // This will run every time the screen comes into focus
    if (isFocused) {
      setShowBottomSheet({
        ...showBottomSheet,
        recipient: true
      })
    }

  }, [isFocused]);



  return (
    <SafeAreaView style={{ alignItems: "center", justifyContent: 'center', flex: 1 }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1, width: screenSize.width }}
        initialRegion={{
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
          latitude: showBottomSheet.recipient ? destination?.lat : source?.lat,
          longitude: showBottomSheet.recipient ? destination?.lng : source?.lng,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        loadingEnable={true}
      // onRegionChangeComplete={onLocationSelect}
      >
      </MapView>
      <View style={{
        position: 'absolute',
        alignSelf: 'center',
        top: '20%'
        // marginBottom:
      }}>
        <Images.locationPinRed height={moderateScale(40)} width={moderateScale(40)} />
      </View>


      <RecipientSheet
        isVisible={showBottomSheet.recipient}
        modelBgStyles={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
        formData={recipientData}
        setFormData={setRecipientData}
        location={destination}
        appStyles={appStyles}
        isDark={isDark}
        handleEdit={() => {
          setShowBottomSheet({
            ...showBottomSheet,
            recipient: false,
            pickup: false
          })
          navigation.navigate(MainRouteStrings.FIND_DESTINATON)
        }}
        handleBackClick={() => {
          setShowBottomSheet({
            ...showBottomSheet,
            recipient: false,
            pickup: false
          })
          navigation.navigate(MainRouteStrings.FIND_DESTINATON)

        }}
        handleNext={() => {
          if (Platform.OS === "android") {
            setShowBottomSheet({
              ...showBottomSheet,
              recipient: false,
              pickup: true
            })
          } else {
            setShowBottomSheet({
              ...showBottomSheet,
              recipient: false,
            })
            Actions.showLoader(true)
            setTimeout(() => {
              Actions.showLoader(false)
              setShowBottomSheet({
                pickup: true
              })

            }, 1000);
          }

          // setShowBottomSheet(() => {
          //   return {
          //     recipient: false,
          //     pickup: true
          //   }

          // })

          // navigation.navigate(toScreen)
        }}
      />


      <PickUpSheet
        isVisible={showBottomSheet.pickup}
        formData={pickUpData}
        userData={userData}
        setFormData={setPickUpData}
        location={source}
        appStyles={appStyles}
        isDark={isDark}
        handleEdit={() => {
          setShowBottomSheet({
            ...showBottomSheet,
            recipient: false,
            pickup: false
          })
          navigation.navigate(MainRouteStrings.FIND_DESTINATON)
        }}
        handleBackClick={() => {

          if (Platform.OS === "android") {
            setShowBottomSheet({
              ...showBottomSheet,
              recipient: true,
              pickup: false
            })
          } else {
            setShowBottomSheet({
              ...showBottomSheet,
              pickup: false
            })
            Actions.showLoader(true)
            setTimeout(() => {
              Actions.showLoader(false)
              setShowBottomSheet({
                recipient: true,
              })

            }, 1000);
          }
        }}
        handlePickDate={async () => {
          setShowBottomSheet({
            ...showBottomSheet,
            datePicker: true,
            pickup: false
          })
        }}

        handleNext={() => {
          setShowBottomSheet({
            ...showBottomSheet,
            pickup: false
          })

          // console.log("formData", formData);

          Actions.orderDeatils({
            ...orderDeatils,
            recipientData: recipientData,
            pickUpData: pickUpData
          })

          // setOrderDeatils()
          navigation.navigate(MainRouteStrings.ITEMS_DETAILS)
        }}

      />

      <DatePicker
        isVisible={showBottomSheet.datePicker}
        mode={'single'}
        colorOptions={{
          headerColor: isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT,
          headerTextColor: isDark ? uiColours.WHITE_TEXT : uiColours.WHITE_TEXT,
          backgroundColor: isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT,
          dateTextColor: isDark ? uiColours.WHITE_TEXT : uiColours.GRAY_TEXT,
        }}
        hideTime={showTime}
        onSelectDate={() => {
          // console.log("sdds");
          setShowTime(false)
        }}
        startDate={new Date()}
        minDate={new Date()}
        onSeclectTime={(data) => {
          console.log("data===>", data);
          setShowBottomSheet({
            ...showBottomSheet,
            datePicker: false,
            pickup: true
          })
          setPickUpData({
            ...pickUpData,
            pickupDate: moment(data).format("YYYY-MM-DD")
          })
        }}
        onBackdropPress={() => {
          setShowBottomSheet({
            ...showBottomSheet,
            datePicker: false,
            pickup: true
          })

        }}
        handleClose={() => {
          setShowBottomSheet({
            ...showBottomSheet,
            datePicker: false,
            pickup: true
          })
        }}
        modalStyles={{}}
        onConfirm={(output) => {
          setShowBottomSheet({
            ...showBottomSheet,
            datePicker: false,
            pickup: true
          })
          setPickUpData({
            ...pickUpData,
            pickupDate: output?.dateString
          })

        }}

      />
    </SafeAreaView>
  )
}

export default SetDestination