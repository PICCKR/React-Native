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

const PickupScreen = ({ route }) => {

    // const orderDetails = route?.params?.orderDetails
    const orderDetails = useSelector((state) => state?.bookingDataReducer?.bookingData)

    const { appStyles, isDark, selectedVehicle } = useContext(AppContext)


    const navigation = useNavigation()

    const source = { latitude: orderDetails?.requestId?.pickupLocation?.coordinates[0], longitude: orderDetails?.requestId?.pickupLocation?.coordinates[1] };
    const destination = { latitude: orderDetails?.requestId?.dropOffLocation?.coordinates[0], longitude: orderDetails?.requestId?.dropOffLocation?.coordinates[1] };

    console.log("orderDetails =====>", source, destination);
    // Calculate deltas based on origin and destination
    const calculateMapDeltas = () => {
        const latitudes = [orderDetails?.requestId?.dropOffLocation?.coordinates[0], orderDetails?.requestId?.pickupLocation?.coordinates[0]];
        const longitudes = [orderDetails?.requestId?.dropOffLocation?.coordinates[1], orderDetails?.requestId?.pickupLocation?.coordinates[1]];

        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLng = Math.min(...longitudes);
        const maxLng = Math.max(...longitudes);

        const LATITUDE_DELTA = maxLat - minLat + 0.02; // Adjust as needed
        const LONGITUDE_DELTA = maxLng - minLng + 0.02; // Adjust as needed

        // console.log("LATITUDE_DELTA", LATITUDE_DELTA, LONGITUDE_DELTA);

        return {
            latitude: (minLat + maxLat) / 2,
            longitude: (minLng + maxLng) / 2,
            LATITUDE_DELTA,
            LONGITUDE_DELTA,
        };
    };

    const { latitude, longitude, LATITUDE_DELTA, LONGITUDE_DELTA } = calculateMapDeltas();

    useEffect(() => {
        // const toastMsgConfg = {
        //     isDark: false,
        //     msg: "Please prepare your package",
        //     title: "PicckR connected"
        // }
        // showToast(toastMsgConfg, tostMessagetypes.SUCCESS, false)
    }, [])

    useBackButton(() => {
        navigation.goBack()
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
                    longitude: longitude
                }}
                mapType={"standard"}
                followsUserLocation={true}
            >
                <MapViewDirections
                    origin={source}
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
                    coordinate={source}
                    title={""}
                    description={""}
                    style={{ height: moderateScale(24), width: moderateScale(24), borderWidth: 1 }}
                >
                    <Images.car height={moderateScale(24)} width={moderateScale(24)} />
                </Marker>
                <Marker
                    title={""}
                    description={""}
                    coordinate={destination}
                    style={{ height: moderateScale(30), width: moderateScale(30), borderWidth: 1 }}
                />
            </MapView>

            <BottomView
                appStyles={appStyles}
                isDark={isDark}
                orderDetails={orderDetails}
                selectedVehicle={selectedVehicle}
                handleCancelOrder={() => {
                    navigation.navigate(MainRouteStrings.PICKER_REVIEW_WHEN_CANCELLED)
                }}
            />
        </View>
    )
}

export default PickupScreen