import { View, Text, Dimensions, TouchableOpacity, BackHandler, Alert, SafeAreaView } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { screenSize } from '../../../utils/Styles/CommonStyles'
import { AppContext, useSocket } from '../../../context/AppContext'
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Images } from '../../../assets/images'
import { useIsFocused, useNavigation } from '@react-navigation/native'

import SearchingPicker from './SearchingPicker'
import NearByPickers from './NearByPickers'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import WaitingSheet from './WaitingSheet'
import Actions from '../../../redux/Actions'

const FindingPicker = ({ route }) => {

    const {
        appStyles,
        setSource,
        source,
        selectedVehicle
    } = useContext(AppContext)

    const { Socket } = useSocket()
    const navigation = useNavigation()

    const [pickersData, setPickersData] = useState([])
    const [nearByPickers, setNearByPickers] = useState([])
    const [seletedBid, setSelectedBid] = useState(null)

    console.log("sssss", selectedVehicle);

    const mapRef = useRef()
    const ASPECT_RATIO = screenSize.width / screenSize.height;
    // console.log("ASPECT_RATIO", ASPECT_RATIO);
    const LATITUDE_DELTA = (5000 / 1000) * 0.04;
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
        latitude: source?.lat,
        longitude: source?.lng,
    };

    const [showSheet, setShowSheet] = useState({
        searchingPicker: true,
        nearByPickers: false,
        waiting: false
    })


    const handleGetride = (data) => {
        console.log("get-ride in user", data?.data);
        if (data?.data?.status !== "cancelled") {
            navigation.navigate(MainRouteStrings.TRACKING_SCREEN)
        } else {
            Alert.alert("", "Your booking has been cancelled by pickkR")
            navigation.navigate(MainRouteStrings.ACTIVITY_SCREEN)
        }
    }

    const handleGetBooking = (data) => {
        console.log("get-booking-in-user", data)
        if (data?.data?.status !== "cancelled") {
            Actions.bookingData(data?.data)
        } else if (data?.data?.status !== "cancelled") {

        }
    }

    const handleNewBid = (data) => {
        console.log("new bid", data?.data);
        setPickersData([...pickersData, data?.data])
    }

    const handleGetAvilablePickers = (data) => {
        Actions.showLoader(false)
        console.log("data pickeerrss", data?.data);
        setNearByPickers(data?.data)
    }

    const handleGetAvilablePickersError = (data) => {
        Actions.showLoader(false)
        console.log("handleGetAvilablePickersError", data);
    }

    const handleAcceptBidError = useCallback(async (data) => {
        Actions.showLoader(false)
        console.log("accept-bid-error", data);
    }, [Socket])


    const handleBidAccepted = async (data) => {
        Actions.showLoader(false)
        console.log("accept-bid-successfully", data);
    }

    const handleRejectBidError = useCallback(async (data) => {
        Actions.showLoader(false)
        console.log("reject-bid-erro", data);
    }, [Socket])

    const handleBidDecline = async (data) => {
        Actions.showLoader(false)
        console.log("reject-bid-successfully in user", data?.data);
        const newData = await pickersData.filter((val) => {
            if (val?._id != data?.data?._id) {
                return val
            }
        })
        setPickersData(() => newData)
    }

    useEffect(() => {
        Socket.on("availble-picckrs", handleGetAvilablePickers)
        Socket.on("get-availble-picckrs-error", handleGetAvilablePickersError)
        Socket.on('get-ride', handleGetride)
        Socket.on('get-booking', handleGetBooking)
        Socket.on("new-request-bid", handleNewBid)
        Socket.on("accept-bid-error", handleAcceptBidError)
        Socket.on("accept-bid-successfully", handleBidAccepted)
        Socket.on("reject-bid-error", handleRejectBidError)
        Socket.on("reject-bid-successfully", handleBidDecline)
        return () => {
            Socket.off("availble-picckrs", handleGetAvilablePickers)
            Socket.off('get-ride', handleGetride)
            Socket.off('get-booking', handleGetBooking)
            Socket.off("new-request-bid", handleNewBid)
            Socket.off("accept-bid-error", handleAcceptBidError)
            Socket.off("accept-bid-successfully", handleBidAccepted)
            Socket.off("reject-bid-error", handleRejectBidError)
            Socket.off("reject-bid-successfully", handleBidDecline)
        }
    }, [Socket, handleGetride, handleGetBooking, handleNewBid, handleGetAvilablePickers, handleGetAvilablePickersError, handleAcceptBidError, handleBidAccepted, handleBidDecline, handleRejectBidError])

    useEffect(() => {
        Actions.showLoader(true)
        console.log("source?.lat", source?.lat, source?.lng);
        Socket.emit("get-availble-picckrs", {
            "longitude": source?.lng,
            "latitude": source?.lat
        })
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1, width: screenSize.width }}
                initialRegion={{
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    latitude: source?.lat,
                    longitude: source?.lng,
                }}
                mapType={"standard"}
                followsUserLocation={true}

            >
                <Circle
                    center={circleCenter}
                    radius={5000}
                    strokeWidth={2}
                    strokeColor="rgba(1, 109, 178, 0.25)"
                    fillColor="rgba(201, 243, 251, 0.4)"
                />
                {
                    nearByPickers?.map((item) => {
                        console.log(item.latitude, item.longitude);
                        return (
                            <Marker
                                key={item?._id}
                                coordinate={{ latitude: 12.3558259, longitude: 76.5885713 }}
                                title={""}
                                description={""}
                                image={selectedVehicle.catImage ? selectedVehicle.catImage : Images.carPng}

                            />
                        )
                    })
                }

            </MapView>

            <NearByPickers
                nearByPickersData={pickersData}
                setShowSheet={setShowSheet}
                handleCancelRide={() => {
                    navigation.navigate(MainRouteStrings.USER_HOME_SCREEN)
                }}
                handleAccept={(item) => {
                    Actions.showLoader(true)
                    Socket.emit("accept-bid", {
                        "id": item?._id
                    })
                }}
                handleDecline={(item) => {
                    Actions.showLoader(true)
                    Socket.emit("reject-bid", {
                        "id": item?._id
                    })
                }}
            />
        </SafeAreaView>
    )
}

export default FindingPicker