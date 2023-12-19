import { View, Text, SafeAreaView, DatePickerAndroid } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
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


const SetDestination = () => {
  // const toScreen = route?.params?.toScreen
  const {
    appStyles,
    destination,
    source,
    isDark
  } = useContext(AppContext)

  console.log("destination", destination);

  const navigation = useNavigation()

  const mapRef = useRef()
  const ASPECT_RATIO = screenSize.width / screenSize.height;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const onLocationSelect = async (e, d) => {
    // console.log("e", e);
    // const location = await convertLanLngToAddress(e)
  }


  // const convertLanLngToAddress = async (coords) => {
  //   Geocoder.init(GOOGLE_MAP_API_KEY);
  //   Geocoder.from(coords.latitude, coords.longitude)
  //     .then(async json => {
  //       console.log('lat lan', json.results[0]);
  //       const adddress = json.results[0]?.formatted_address
  //       setDestination({
  //         ...destination,
  //         lat: coords.latitude,
  //         lng: coords.longitude,
  //         location: adddress
  //       })
  //     })
  //     .catch(function (error) {
  //       console.log('errr', error);
  //       Alert.alert("", "Something went wrong please try again")
  //     });
  // }

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
    name: "",
    phoneNumber: "",
    pickupDate: "Now"
  })

  const [date, setDate] = useState(new Date(1598051730000));

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
            recipient: false,
            pickup: false
          })
          navigation.navigate(MainRouteStrings.ITEMS_DETAILS)
        }}
      />

      <DatePicker
        isVisible={showBottomSheet.datePicker}
        mode={'single'}
        colorOptions={{
          headerColor: uiColours.WHITE_TEXT,
          headerTextColor: uiColours.BLACK_TEXT
        }}
        minDate= {new Date()}
        onSeclectTime={(data)=>{
          setShowBottomSheet({
            ...showBottomSheet,
            datePicker: false,
            pickup: true
          })
          setPickUpData({
            ...pickUpData,
          pickupDate:data?.time
          })
        }}
        onBackdropPress={() => {
          setShowBottomSheet({
            ...showBottomSheet,
            datePicker: false,
            pickup: true
          })
          
        }}
        handleClose={()=>{
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
          pickupDate:output?.dateString
          })
        }}
      />
    </SafeAreaView>
  )
}

export default SetDestination