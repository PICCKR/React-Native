import { View, Text, Dimensions, TouchableOpacity, BackHandler, Alert, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { screenSize } from '../../../utils/Styles/CommonStyles'
import { AppContext } from '../../../context/AppContext'
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Images } from '../../../assets/images'
import { useIsFocused, useNavigation } from '@react-navigation/native'

import SearchingPicker from './SearchingPicker'
import NearByPickers from './NearByPickers'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import WaitingSheet from './WaitingSheet'

const FindingPicker = ({ route }) => {

    const {
        appStyles,
        setSource,
        source
    } = useContext(AppContext)


    const navigation = useNavigation()
    const isFocused = useIsFocused();

    const mapRef = useRef()
    const ASPECT_RATIO = screenSize.width / screenSize.height;
    console.log("ASPECT_RATIO", ASPECT_RATIO);
    const LATITUDE_DELTA = (3000 / 1000) * 0.03;
    // const LATITUDE_DELTA = 0.04;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const pickersLocation = [
        {
            id: "1",
            lat: 12.293049583717883,
            lng: 76.63101437360515,
        },
        {
            id: "2",
            lat: 12.302739640568026,
            lng: 76.62731305608372
        },
        {
            id: "3",
            lat: 12.306077759217404,
            lng: 76.65507293749431
        },
        {
            id: "4",
            lat: 12.295053579462769,
            lng: 76.64540017987146
        },
    ]

    const circleCenter = {
        latitude: 12.308905854320136,
        longitude: 76.63889153653533,
    };

    const [showSheet, setShowSheet] = useState({
        searchingPicker: true,
        nearByPickers: false,
        waiting: false
    })
    const [selectedPicker, setSelectedPicker] = useState({})

    // useEffect(() => {
    //     setTimeout(() => {
    //         setShowSheet({
    //             ...showSheet,
    //             searchingPicker: false,
    //             nearByPickers: true
    //         })
    //     }, 2000);
    // }, [])

    useEffect(() => {
        // This will run every time the screen comes into focus
        if (isFocused) {
            setShowSheet({
                ...showSheet,
                nearByPickers: true
            })
        }
    }, [isFocused]);

    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1, width: screenSize.width }}
                initialRegion={{
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    latitude: 12.308905854320136,
                    longitude: 76.63889153653533,
                }}
                mapType={"standard"}
                followsUserLocation={true}

            >
                <Circle
                    center={circleCenter}
                    radius={3000}
                    strokeWidth={2}
                    strokeColor="rgba(1, 109, 178, 0.25)"
                    fillColor="rgba(201, 243, 251, 0.4)"
                />
                {
                    pickersLocation.map((item) => {
                        return (
                            <Marker
                                key={item?.id}
                                coordinate={{ latitude: item.lat, longitude: item.lng }}
                                title={"ddd"}
                                description={"hi suhel"}
                                image={Images.carPng}
                            />
                        )
                    })
                }

            </MapView>
{/* 
            <SearchingPicker
                isVisible={showSheet.searchingPicker}
                setShowSheet={setShowSheet}
            /> */}

            <NearByPickers
            
                isVisible={showSheet.nearByPickers}
                setShowSheet={setShowSheet}
                handleCancelRide={() => {
                    navigation.navigate(MainRouteStrings.USER_HOME_SCREEN)
                }}
                handleAccept={(item) => {
                    setSelectedPicker(() => item)
                    setShowSheet({
                        ...showSheet,
                        nearByPickers: false,
                        waiting: false
                    })
                    navigation.navigate(MainRouteStrings.TRACKING_SCREEN, {
                        geometry: { latitude: item?.lat, longitude: item?.lng }
                    })
                }}
            />
            {/* <WaitingSheet
                isVisible={showSheet.waiting}
                setShowSheet={setShowSheet}
                handlePickerAccepted={() => {
                    console.log("sjdhsjhd ===>", selectedPicker);
                    setShowSheet({
                        ...showSheet,
                        nearByPickers: false,
                        waiting: false
                    })

                    // navigation.navigate(MainRouteStrings.TRACKING_SCREEN, {
                    //     geometry: { latitude: selectedPicker?.lat, longitude: selectedPicker?.lng }
                    // })
                }}
            /> */}
        </SafeAreaView>
    )
}

export default FindingPicker