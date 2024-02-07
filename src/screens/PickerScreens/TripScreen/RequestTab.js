import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from './Styles'
import { AppContext, useSocket } from '../../../context/AppContext'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import ProfileView from '../../../components/PrifileView/ProfileView'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '../../../assets/images'
import CustomButton from '../../../components/Button/CustomButton'
import { uiColours } from '../../../utils/Styles/uiColors'
import { buttonTypes, tostMessagetypes } from '../../../utils/Constents/constentStrings'
import ConfirmationSheet from '../../../components/ConfirmationSheet/ConfirmationSheet'
import { showToast } from '../../../components/tostConfig/tostConfig'
import VehicleIconView from '../../../components/VehicleIconView/VehicleIconView'
import BidPriceSheet from './BidPriceSheet'
import Actions from '../../../redux/Actions'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import { useSelector } from 'react-redux'
import { showErrorToast } from '../../../helper/showErrorToast'

const RequestTab = ({
}) => {
    const { appStyles, isDark, newRequest, setNewRequest, bidPlaced, setBidPlaced } = useContext(AppContext)
    const userData = useSelector((state) => state?.userDataReducer?.userData)
    const { Socket } = useSocket()
    const navigation = useNavigation()
    const [showSheet, setShowSheet] = useState({
        cancelConfirmtion: false,
        acceptConfirmation: false,
        bidPrice: false
    })

    const [selectedTrip, setSelectedTrip] = useState(null)


    const handleDecline = async () => {
        const newData = await newRequest.filter((val) => {
            if (val?._id != selectedTrip?._id) {
                return val
            }
        })

        setNewRequest(() => newData)
    }

    const handleAccept = async () => {
        Actions.showLoader(true)
        Socket.emit("accept-request", {
            "picckrId": userData?._id,
            "requestId": selectedTrip?._id
        })
    }

    const handleSendOffer = (bidPrice) => {
        Actions.showLoader(true)
        Socket.emit("place-bid", {
            "picckrId": userData?._id,
            "bidAmount": bidPrice,
            "requestId": selectedTrip?._id
        })

    }


    const handleNewRequest = (data) => {
        Actions.showLoader(false)
        // console.log("new-ride-request", data?.data);
        setNewRequest([...newRequest, data?.data?.data])
    }

    const acceptRequestError = useCallback(async (data) => {
        Actions.showLoader(false)
        console.log("error in ccept request", data);
        showErrorToast(data?.message)
    }, [Socket])

    const handleRequestSuccessfully = useCallback(async (data) => {
        console.log("accept-request-successfully in picker", data?.data);
        setNewRequest([])
        // navigation.navigate(MainRouteStrings.PICKUP_SCREEN, {
        //     orderDetails: data?.data
        // })
        Actions.showLoader(false)
    }, [Socket])

    const placeBidError = useCallback(async (data) => {
        Actions.showLoader(false)
        // console.log("placeBidError", data);
    }, [Socket])

    const handleBidPlaced = useCallback(async (data) => {
        Actions.showLoader(false)
        // console.log("placeBidError", data);
        setBidPlaced(true)
    }, [Socket])

    const handleBidDecline = async (data) => {
        Actions.showLoader(false)
        // console.log("reject-bid-successfully in picker", data);
    }

    const handleGetRide = useCallback((data) => {
        // console.log("get-ride in picker", data);
        if (data?.data?.status !== "cancelled") {
            Actions.showLoader(true)
            setTimeout(() => {
                navigation.navigate(MainRouteStrings.PICKUP_SCREEN)
                Actions.showLoader(false)
            }, 200);
            setNewRequest([])
        } else if (data?.data?.status !== "cancelled") {

        }

    }, [Socket])


    const handleGetBooking = (data) => {
        // console.log("get-booking-in-picker", data?.data)
        setNewRequest([])
        if (data?.data?.status !== "cancelled") {
            Actions.bookingData(data?.data)
        } else if (data?.data?.status === "cancelled") {
            Alert.alert("", "Your booking has been cancelled by user")
            navigation.navigate(MainRouteStrings.TRIPS_SCREEN)
        }

    }

    useEffect(() => {
        Socket.on('new-ride-request', handleNewRequest)
        Socket.on("accept-request-error", acceptRequestError)
        Socket.on('accept-request-successfully', handleRequestSuccessfully)
        Socket.on("place-bid-error", placeBidError)
        Socket.on("bid-placed", handleBidPlaced)
        Socket.on('get-ride', handleGetRide)
        Socket.on("reject-bid-successfully", handleBidDecline)
        Socket.on('get-booking', handleGetBooking)

        return () => {
            Socket.off('new-ride-request', handleNewRequest)
            Socket.off("accept-request-error", acceptRequestError)
            Socket.off('accept-request-successfully', handleRequestSuccessfully)
            Socket.off("place-bid-error", placeBidError)
            Socket.off("bid-placed", handleBidPlaced)
            Socket.off('get-ride', handleGetRide)
            Socket.off("reject-bid-successfully", handleBidDecline)
            Socket.off('get-booking', handleGetBooking)
        }
    }, [Socket, handleNewRequest, acceptRequestError, handleRequestSuccessfully, placeBidError, handleBidPlaced, handleBidDecline, handleGetRide, handleGetBooking])


    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', () => {
            Socket.emit("driver-connect",
                {
                    "userId": userData?._id
                }
            )
        });

        // Cleanup function (optional)
        return () => {
            unsubscribeFocus();
            // Cleanup logic, if needed
        };
    }, [navigation]);


    return (
        <View>
            {newRequest.length > 0 ? (
                bidPlaced ?
                    <View style={[styles.tripCard, appStyles.borderColor]}>
                        <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                            <View style={[commonStyles.flexRowAlnCtr, { flex: 1, alignItems: "flex-start" }]}>
                                <ProfileView
                                    hasBottomLine={false}
                                    size={moderateScale(40)}
                                    profileImg={selectedTrip?.userId?.picture}
                                />

                                <View style={{ width: '75%' }}>
                                    <Text style={appStyles.smallTextPrimaryBold}>
                                        {selectedTrip?.userId?.firstName} {selectedTrip?.userId?.lastName}
                                    </Text>
                                    <Text style={appStyles.smallTextGray}>
                                        Send to
                                        <Text style={appStyles.smallTextPrimary}>
                                            {` ${selectedTrip?.dropOffAddress}`}
                                        </Text>
                                    </Text>
                                </View>
                            </View>

                            <View style={{ alignItems: "flex-end" }}>
                                <Text style={appStyles.smallTextPrimaryBold}>
                                    ₦{selectedTrip?.bidPrice}
                                </Text>
                                <Text style={appStyles.smallTextGray}>
                                    {selectedTrip?.distence}km
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.waitingButton, {
                            backgroundColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                        }]}>
                            <Text style={appStyles.smallTextGray}>
                                Waiting for bid price approval
                            </Text>
                        </View>
                    </View> :

                    <ScrollView style={{}}>
                        {
                            newRequest?.map((item, index) => {
                                return (
                                    <View style={[styles.tripCard, appStyles.borderColor]}>
                                        <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                                            <View style={[commonStyles.flexRowAlnCtr, { flex: 1, alignItems: "flex-start" }]}>
                                                <ProfileView
                                                    hasBottomLine={false}
                                                    size={moderateScale(40)}
                                                    profileImg={item?.userId?.picture}
                                                />

                                                <View style={{ width: '75%' }}>
                                                    <Text style={appStyles.smallTextPrimaryBold}>
                                                        {item?.userId?.firstName} {item?.userId?.lastName}
                                                    </Text>
                                                    <Text style={appStyles.smallTextGray}>
                                                        Send to
                                                        <Text style={appStyles.smallTextPrimary}>
                                                            {` ${item?.dropOffAddress}`}
                                                        </Text>
                                                    </Text>
                                                </View>

                                            </View>

                                            <View style={{ alignItems: "flex-end" }}>
                                                <Text style={appStyles.smallTextPrimaryBold}>
                                                    ₦{item?.requestAmount}
                                                </Text>
                                                <Text style={appStyles.smallTextGray}>
                                                    {item?.distence}km
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                                            <TouchableOpacity
                                                style={[styles.deleteButton, appStyles.borderColor]}
                                                onPress={() => {
                                                    setShowSheet({
                                                        ...showSheet,
                                                        cancelConfirmtion: true
                                                    })
                                                    setSelectedTrip(item)
                                                }}
                                            >
                                                <Images.delete height={moderateScale(20)} width={moderateScale(20)} />
                                            </TouchableOpacity>
                                            <CustomButton
                                                buttonType={buttonTypes.SMALL}
                                                title="Bid Price"
                                                hasBackground={false}
                                                hasOutLine
                                                NavigationHandle={() => {
                                                    setShowSheet({
                                                        ...showSheet,
                                                        bidPrice: true
                                                    })
                                                    setSelectedTrip(item)
                                                }}
                                                buttonStyle={{ width: scale(110), height: verticalScale(40), }}
                                            />
                                            <CustomButton
                                                NavigationHandle={() => {
                                                    setShowSheet({
                                                        ...showSheet,
                                                        acceptConfirmation: true
                                                    })
                                                    setSelectedTrip(item)
                                                }}
                                                buttonType={buttonTypes.SMALL}
                                                title={`Accept for  ₦${item?.requestAmount}`}
                                                buttonStyle={{ width: scale(110), height: verticalScale(40), }}
                                            />
                                        </View>
                                    </View>
                                )
                            })
                        }

                    </ScrollView>
            )

                :
                <View style={{ marginTop: "50%", alignSelf: 'center' }}>
                    <Text style={appStyles.mediumTextBlack}>
                        No requests
                    </Text>
                </View>
            }

            <ConfirmationSheet
                setShowSheet={setShowSheet}
                headerTitle="Confirmation"
                isVisible={showSheet.cancelConfirmtion}
                title="Are you sure you want to decline this order?"
                discription="You will not be charged a penalty if you cancel your order"
                button1Title='Back'
                button2Title='Yes, decline'
                handleButton1Click={() => {
                    setShowSheet({
                        ...showSheet,
                        cancelConfirmtion: false
                    })
                }}
                handleButton2Click={() => {
                    setShowSheet({
                        ...showSheet,
                        cancelConfirmtion: false
                    })

                    handleDecline()
                }}
                renderIcon={() => {
                    return (
                        <VehicleIconView />
                    )

                }}
            />

            <ConfirmationSheet
                setShowSheet={setShowSheet}
                headerTitle="Confirmation"
                isVisible={showSheet.acceptConfirmation}
                title={`Are you sure you want to accept this order for ₦${selectedTrip?.requestAmount}`}
                discription="You must immediately go to the pick-up address"
                button1Title='Back'
                button2Title='Yes, accept'
                titleStyles={{ color: uiColours.PRIMARY }}
                handleButton1Click={() => {
                    setShowSheet({
                        ...showSheet,
                        acceptConfirmation: false
                    })
                }}
                handleButton2Click={() => {
                    setShowSheet({
                        ...showSheet,
                        acceptConfirmation: false
                    })

                    handleAccept()
                }}
                renderIcon={() => {
                    return (
                        <VehicleIconView />
                    )

                }}
            />

            <BidPriceSheet
                setShowSheet={setShowSheet}
                isVisible={showSheet.bidPrice}
                handleSendOffer={handleSendOffer}
                selectedTrip={selectedTrip}
                setSelectedTrip={setSelectedTrip}
            />
        </View>

    )
}

export default RequestTab