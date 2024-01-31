import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { screenSize } from '../../../utils/Styles/CommonStyles';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAP_API_KEY } from '../../../configs/google_map_api_key';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Images } from '../../../assets/images';
import { moderateScale } from 'react-native-size-matters';
import { uiColours } from '../../../utils/Styles/uiColors';
import BottomView from './BottomView';
import { AppContext } from '../../../context/AppContext';
import { showToast } from '../../../components/tostConfig/tostConfig';
import { tostMessagetypes } from '../../../utils/Constents/constentStrings';
import useBackButton from '../../../customHooks/useBackButton';
import { useNavigation } from '@react-navigation/native';
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings';
import { useSelector } from 'react-redux';

const TrackingScreen = ({ route }) => {

    const oderDetails = route?.params?.oderDetails
    const destination = route?.params?.geometry
    const orderDeatils = useSelector((state) => state?.orderDeatilsReducer?.orderDeatils)

    const { appStyles, selectedVehicle, isDark, source, setSource, setDestination } = useContext(AppContext)
    // console.log("origin === > ",source)
    const navigation = useNavigation()
    // const origin1 = { latitude: 12.308905854320136, longitude: 76.63889153653533 };
    const origin1 = { latitude: source?.lat, longitude: source?.lng };
    // const destination = { geometry.lat: 12.306077759217404, geometry: 76.65507293749431 };

    // Calculate deltas based on origin and destination
    const calculateMapDeltas = () => {

        const { isDark } = useContext(AppContext)
        const latitudes = [origin1.latitude, destination.latitude];
        const longitudes = [origin1.longitude, destination.longitude];

        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLng = Math.min(...longitudes);
        const maxLng = Math.max(...longitudes);

        const LATITUDE_DELTA = maxLat - minLat + 0.02; // Adjust as needed
        const LONGITUDE_DELTA = maxLng - minLng + 0.02; // Adjust as needed

        return {
            latitude: (minLat + maxLat) / 2,
            longitude: (minLng + maxLng) / 2,
            LATITUDE_DELTA,
            LONGITUDE_DELTA,
        };
    };

    const pinData = [2, 3, 5, 6, 7, 8]

    const { latitude, longitude, LATITUDE_DELTA, LONGITUDE_DELTA } = calculateMapDeltas();

    useEffect(() => {
        const toastMsgConfg = {
            isDark: false,
            msg: "Please prepare your package",
            title: "PicckR connected"
        }
        showToast(toastMsgConfg, tostMessagetypes.SUCCESS, false)
    }, [])

    useBackButton(() => {
        navigation.navigate(MainRouteStrings.ACTIVITY_SCREEN)
        setSource({
            lat: "",
            lng: "",
            location: "Current location"
        })
        setDestination({
            lat: "",
            lng: "",
            location: ""
        })
        return true
    })

    return (
        <View style={{ flex: 1, height: screenSize.height }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                initialRegion={{
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    latitude: latitude,
                    longitude: longitude,
                }}
                mapType={"standard"}
                followsUserLocation={true}
            >
                <MapViewDirections
                    origin={origin1}
                    destination={destination}
                    apikey={GOOGLE_MAP_API_KEY}
                    mode={"DRIVING"}
                    strokeWidth={moderateScale(5)}
                    strokeColor={uiColours.BLUE}
                    optimizeWaypoints
                    onStart={(params) => {
                        // console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                    }}
                />
                <Marker
                    coordinate={destination}
                    title={""}
                    description={""}
                    style={{ height: moderateScale(24), width: moderateScale(24), borderWidth: 1 }}
                >
                    <Images.car height={moderateScale(24)} width={moderateScale(24)} />
                </Marker>
                <Marker
                    title={""}
                    description={""}
                    coordinate={origin1}
                    style={{ height: moderateScale(30), width: moderateScale(30), borderWidth: 1 }}
                />
            </MapView >
            <BottomView
                appStyles={appStyles}
                isDark={isDark}
                orderDeatils={orderDeatils}
                pinData={pinData}
                selectedVehicle={selectedVehicle}
                handleCancelOrder={() => {
                    navigation.navigate(MainRouteStrings.PICKER_REVIEW_WHEN_CANCELLED)
                }}
            />
        </View>
    )
}

export default TrackingScreen