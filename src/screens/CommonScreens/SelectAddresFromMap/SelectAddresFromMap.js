import { View, Text, Dimensions, TouchableOpacity, BackHandler, Alert, SafeAreaView } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { Styles } from './Styles'
import { screenSize } from '../../../utils/Styles/CommonStyles'
import { AppContext } from '../../../context/AppContext'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Images } from '../../../assets/images'
import { moderateScale } from 'react-native-size-matters'
import BottomView from './BottomView'
import Geocoder from 'react-native-geocoding'
import { GOOGLE_MAP_API_KEY } from '../../../configs/google_map_api_key'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import { uiStrings } from '../../../utils/Constents/uiStrings'

const SelectAddresFromMap = ({ route }) => {
  const toScreen = route?.params?.toScreen
  const action = route?.params?.action
  const geometry = route?.params?.geometry

  const {
    appStyles,
    destination,
    setDestination,
    currentLocation,
    setSource,
    source
  } = useContext(AppContext)

  // console.log("source===>", geometry, action);

  const navigation = useNavigation()

  const mapRef = useRef()
  const ASPECT_RATIO = screenSize.width / screenSize.height;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [selectedAddress, setSelectedAddress] = useState({
    location: (toScreen === MainRouteStrings.SET_DESTINATION || action === "destination") ? destination?.location : source?.location,
    lat: "",
    lng: ""
  })

  const [mapView, setMapView] = useState('standard')

  const onLocationSelect = async (coords, d) => {
    // console.log("e", coords);
    Geocoder.init(GOOGLE_MAP_API_KEY);
    Geocoder.from(coords.latitude, coords.longitude)
      .then(async json => {
        // console.log('lat lan', json.results[0]);
        const adddress = json.results[0]?.formatted_address
        setSelectedAddress({
          lat: coords.latitude,
          lng: coords.longitude,
          location: adddress
        })

      })
      .catch(function (error) {
        console.log('errr', error);
        Alert.alert("", uiStrings.commonError)
      });

  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1, width: screenSize.width }}
        initialRegion={{
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
          latitude: geometry?.lat ? geometry?.lat : currentLocation?.lat ? currentLocation?.lat : 40.74386765542541,
          longitude: geometry?.lng ? geometry?.lng : currentLocation?.lng ? currentLocation?.lng : -74.17151573273323
        }}
        mapType={mapView}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        loadingEnable={true}
        onRegionChangeComplete={onLocationSelect}
      >
      </MapView>
      <View style={{
        position: 'absolute',
        alignSelf: 'center',
        bottom: '50%'
        // marginBottom:
      }}>
        <Images.locationPinRed height={moderateScale(40)} width={moderateScale(40)} />
      </View>


      <TouchableOpacity
        onPress={() => {
          if (mapView === "standard") {
            setMapView('satellite')
          } else {
            setMapView('standard')
          }
        }}
        style={Styles.Satllite}>
        <Text style={[appStyles.smallTextBlackBold, { textAlign: 'center' }]}>
          {mapView === 'standard' ? "Satellite View" : "Normal View"}
        </Text>
      </TouchableOpacity>

      <BottomView
        address={selectedAddress?.location}
        appStyles={appStyles}
        handleConfirm={() => {
          if (toScreen === MainRouteStrings.FIND_DESTINATON) {
            setSource({
              lat: selectedAddress.lat,
              lng: selectedAddress.lng,
              location: selectedAddress?.location
            })
          } else if (toScreen === MainRouteStrings.SET_DESTINATION) {
            // console.log('lat lan', json.results[0]);
            setDestination({
              lat: selectedAddress.lat,
              lng: selectedAddress.lng,
              location: selectedAddress?.location
            })
          } else if (action === "source") {
            setSource({
              lat: selectedAddress.lat,
              lng: selectedAddress.lng,
              location: selectedAddress?.location
            })
          } else if (action === "destination") {
            setDestination({
              lat: selectedAddress.lat,
              lng: selectedAddress.lng,
              location: selectedAddress?.location
            })
          }

          navigation.navigate(toScreen, {
            addresData: selectedAddress
          })
        }}
      />
    </SafeAreaView>
  )
}

export default SelectAddresFromMap