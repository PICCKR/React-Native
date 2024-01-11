import { View, Text, SafeAreaView, DatePickerAndroid } from 'react-native'
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


const SetDestination = ({route}) => {
  const from = route?.params?.from
  const {
    appStyles,
    userData,
    destination,
    source,
    isDark
  } = useContext(AppContext)

  // console.log("destination", userData);

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
    name: "",
    phoneNumber: ""
  })
  const [pickUpData, setPickUpData] = useState({
    name: userData?.firstName ? `${userData?.firstName} ${userData?.lastName}` : "",
    phoneNumber: userData?.phoneNumber ? userData?.phoneNumber : "",
    selectedCountry:userData?.phoneNumber?.split(" ")[0],
    pickupDate: "Now"
  })

  const [showTime, setShowTime] = useState(true)

  const [date, setDate] = useState(new Date(1598051730000));

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
        modelBgStyles={{backgroundColor:"rgba(255, 255, 255, 0)"}}
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
          navigation.goBack()
          
        }}
        handleNext={() => {
          setShowBottomSheet({
            ...showBottomSheet,
            recipient: false,
            pickup: true
          })
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
          setShowBottomSheet({
            ...showBottomSheet,
            recipient: true,
            pickup: false
          })
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
          navigation.navigate(MainRouteStrings.ITEMS_DETAILS,{
            data:{
              pickUpData,
              recipientData
            }
          })
        }}

      />

      <DatePicker
        isVisible={showBottomSheet.datePicker}
        mode={'single'}
        colorOptions={{
          headerColor:isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT,
          headerTextColor:isDark ? uiColours.WHITE_TEXT : uiColours.WHITE_TEXT,
          backgroundColor:isDark ? uiColours.DARK_BG :uiColours.WHITE_TEXT,
          dateTextColor:isDark ? uiColours.WHITE_TEXT : uiColours.GRAY_TEXT,
        }}
        hideTime={showTime}
        onSelectDate={()=>{
          console.log("sdds");
          setShowTime(false)
        }}
        minDate={new Date()}
        onSeclectTime={(data) => {
          setShowBottomSheet({
            ...showBottomSheet,
            datePicker: false,
            pickup: true
          })
          setPickUpData({
            ...pickUpData,
            pickupDate: data?.time
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