import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './Styles'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { Images } from '../../../assets/images'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import DragableBottomSheet from '../../../components/DragableBottomSheet/DragableBottomSheet'
import { uiColours } from '../../../utils/Styles/uiColors'
import InputText from '../../../components/InputText/InputText'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import { ScrollView } from 'react-native-gesture-handler'
import CustomButton from '../../../components/Button/CustomButton'
import { buttonTypes } from '../../../utils/Constents/constentStrings'
import ConfirmationSheet from '../../../components/ConfirmationSheet/ConfirmationSheet'
import OtpPopUp from '../../../components/OtpPopUp/OtpPopUp'
import { formatAmount } from '../../../helper/formatter'
import { useSocket } from '../../../context/AppContext'
import { showErrorToast } from '../../../helper/showErrorToast'
import Actions from '../../../redux/Actions'
import ProfileView from '../../../components/PrifileView/ProfileView'

const BottomView = ({
    appStyles,
    data,
    selectedVehicle,
    handleCancelOrder,
    isDark,
    orderDetails
}) => {
    const navigation = useNavigation()
    const { Socket } = useSocket()
    const [showSheet, setShowSheet] = useState({
        cancelOrder: false,
        otp: false,
        completeOrder: false
    })
    const [showOtpErr, setShowOtpErr] = useState(false)
    const [tripStatus, setTripStatus] = useState(1)

    const handleVerifyOtp = (otp) => {

        Socket.emit("booking-start", {
            "id": orderDetails?._id,
            "verificationCode": parseInt(otp)
        })

        setShowSheet({
            ...showSheet,
            otp: false
        })
    }

    const handleBookingstartError = async (data) => {
        // console.log("booking-start-error", data);
        setShowOtpErr(true)
        // showErrorToast(data?.message, isDark)
    }

    const handleBookingstart = async (data) => {
        // console.log("booking-start-in-picker", data);
        setTripStatus(2)
    }

    const handleCancelSuccess = (data) => {
        Actions.showLoader(false)
        // console.log("request-cancel-successfully in picker", data);
        navigation.navigate(MainRouteStrings.USER_REVIEW_WHEN_CANCELLED, {
            data: orderDetails
        })

    }

    const handleCancelError = useCallback((data) => {
        Actions.showLoader(false)
        // console.log("request-cancel-error in picker", data);
        showErrorToast(data?.message, isDark)

    }, [Socket])

    const handleCompleteBookingError = useCallback((data) => {
        Actions.showLoader(false)
        // console.log("booking-complete-error", data);

    }, [Socket])

    const handleCompleteBookingSuccess = (data) => {
        Actions.showLoader(false)
        console.log("booking-complete-success", data?.data?.booking, orderDetails);
        // const bookingData = data?.data?.booking
        // return
        navigation.navigate(MainRouteStrings.WRITE_USER_REVIEW, {
            data: { _id: data?.data?.booking?._id, userId: orderDetails?.userId }
        })
        // navigation.navigate(MainRouteStrings.TRIPS_SCREEN)
        // Actions.bookingData(null)
        // Actions.orderDeatils(null)
    }

    // const handleGetBooking = (data) => {
    //     console.log("get-booking-in-picker", data)
    //     // Actions.bookingData(data?.data)
    // }


    useEffect(() => {
        Socket.on('booking-start-error', handleBookingstartError)
        Socket.on('booking-start-successfully', handleBookingstart)
        Socket.on("booking-cancel-successfully", handleCancelSuccess)
        Socket.on("booking-cancel-error", handleCancelError)
        Socket.on("booking-complete-error", handleCompleteBookingError)
        Socket.on("booking-complete-success", handleCompleteBookingSuccess)
        // Socket.on('get-booking', handleGetBooking)

        return () => {
            Socket.off('booking-start-error', handleBookingstartError)
            Socket.off('booking-start-successfully', handleBookingstart)
            Socket.off("booking-cancel-successfully", handleCancelSuccess)
            Socket.off("booking-cancel-error", handleCancelError)
            Socket.off("booking-complete-success", handleCompleteBookingSuccess)
            // Socket.off('get-booking', handleGetBooking)
        }
    }, [Socket, handleBookingstartError, handleBookingstart, handleCancelSuccess, handleCancelError, handleCompleteBookingError, handleCompleteBookingSuccess])

    return (
        <DragableBottomSheet
            index={2}
        >
            <View style={[styles.sheetHeader, {
                borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
            }]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Images.backArrow />
                </TouchableOpacity>
                <Text style={[appStyles.mediumTextPrimary, {
                    flex: 1,
                }]}>
                    {tripStatus === 1 ? "You are heading to the pick-up address" : "You are heading to the destination"}
                </Text>
            </View>
            <ScrollView
                nestedScrollEnabled
                contentContainerStyle={{ flexGrow: 1 }}
                style={styles.bottomSheetContainer}>
                <View style={[styles.pickerSection, {
                    borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                }]}>
                    <View style={{ borderWidth: moderateScale(1), borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY, borderRadius: moderateScale(6), padding: moderateScale(16) }}>
                        <View style={[styles.pickerProfile, appStyles.borderColor]}>
                            <ProfileView
                                profileImg={orderDetails?.userId?.picture}
                                hasBottomLine={false}
                                profileSection={{ paddingBottom: 0 }}
                                size={40}
                            />
                            {/* <View style={styles.pickerProfileView}>
                                {orderDetails?.picckrId?.picture ? <Image source={{ uri: orderDetails?.picckrId?.picture }} /> : <Images.profile height={moderateScale(45)} width={moderateScale(45)} />}
                            </View> */}
                            <View>
                                <Text style={appStyles?.mediumTextPrimaryBold}>{orderDetails?.userId?.firstName} {orderDetails?.userId?.lastName}</Text>
                                <View style={commonStyles.flexRowAlnCtr}>
                                    <Images.star />
                                    <Text style={appStyles.smallTextGray}>{4.9}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.sendMsg}>
                            <TouchableOpacity
                                style={styles.msgInput}
                                onPress={() => {
                                    Socket.emit("joinRoom", {
                                        "room": orderDetails?._id
                                    })
                                    navigation.navigate(MainRouteStrings.PICKER_MESSAGES_SCREEN, {
                                        orderDetails: orderDetails
                                    })

                                }}
                            >
                                <Text style={appStyles.smallTextGray}>Send message to {orderDetails?.userId?.firstName}</Text>
                            </TouchableOpacity>

                            <CustomButton
                                buttonStyle={{ width: "100%" }}
                                title={orderDetails?.status === "pending" ? "Go to destination address" : "Complete Order"}
                                NavigationHandle={() => {
                                    if (orderDetails?.status === "pending") {
                                        setShowSheet({
                                            ...showSheet,
                                            otp: true
                                        })
                                    } else {
                                        setShowSheet({
                                            ...showSheet,
                                            completeOrder: true
                                        })
                                    }
                                }}
                            />

                        </View>
                    </View>
                </View>

                {/* <View style={[styles.sectionView, appStyles.borderColor]}>
                    <View style={[styles.pinCodeInnerView, {
                        borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                    }]}>
                        <Text style={[appStyles.mediumTextBlackBold, { marginBottom: verticalScale(5) }]}>
                            Payment method
                        </Text>

                        <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                            <View style={commonStyles.flexRowAlnCtr}>
                                <Images.wallet />
                                <Text style={appStyles.smallTextGray}>
                                    PicckRPay
                                </Text>
                            </View>
                            <Text style={appStyles.smallTextGray}>
                                $110
                            </Text>
                        </View>
                    </View>
                </View> */}

                <View style={[styles.sectionView, appStyles.borderColor]}>
                    <View style={[styles.pinCodeInnerView, {
                        borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                    }]}>
                        <Text style={[appStyles.mediumTextBlackBold, { marginBottom: verticalScale(5) }]}>
                            Item details
                        </Text>

                        <InputText
                            hasTitle
                            inputTitle="Package type"
                            value={(orderDetails?.requestId?.packageId)?.name}
                            textBox={{ color: uiColours.GRAY_TEXT }}
                            editable={false}
                            inputContainer={{ width: '100%' }}
                            inPutStyles={{ backgroundColor: uiColours.LIGHT_GRAY }}
                        />
                        <InputText
                            hasTitle
                            inputTitle="Extimates item weight (kg)"
                            value={orderDetails?.requestId?.parcelDescription?.weight}
                            textBox={{ color: uiColours.GRAY_TEXT }}
                            editable={false}
                            inputContainer={{ width: '100%', marginTop: verticalScale(16) }}
                            inPutStyles={{ backgroundColor: uiColours.LIGHT_GRAY }}
                        />
                    </View>

                </View>


                <View style={[styles.sectionView, {
                    borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                }]}>
                    <View style={[styles.pinCodeInnerView, {
                        borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                    }]}>
                        <Text style={[appStyles.mediumTextBlackBold, { marginBottom: verticalScale(5) }]}>
                            Delivery destination
                        </Text>

                        <View style={[styles.tripDetails, { paddingHorizontal: 0 }]}>
                            <View style={{ flexDirection: 'row', gap: scale(5) }}>
                                <Images.source height={moderateScale(20)} width={moderateScale(20)} />
                                <View>
                                    <Text style={appStyles.smallTextBlack}>
                                        Sender
                                    </Text>
                                    <Text style={appStyles.smallTextGray}>
                                        {orderDetails?.requestId?.sender?.name}
                                    </Text>
                                    <Text style={appStyles.smallTextGray}>
                                        {orderDetails?.requestId?.pickupAddress}
                                    </Text>
                                    {/* <Text style={appStyles.smallTextGray}>
                                        {destination?.location}
                                    </Text> */}

                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', gap: scale(5) }}>
                                <Images.locationPinRed height={moderateScale(20)} width={moderateScale(20)} />
                                <View>
                                    <Text style={appStyles.smallTextBlack}>
                                        Recipient
                                    </Text>
                                    <Text style={appStyles.smallTextGray}>
                                        {orderDetails?.requestId?.recipeint?.name}
                                    </Text>
                                    <Text style={appStyles.smallTextGray}>
                                        {orderDetails?.requestId?.dropOffAddress}
                                    </Text>
                                    {/* <Text style={appStyles.smallTextGray}>
                                        {source?.location}
                                    </Text> */}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.sectionView, {
                    borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                }]}>
                    <View style={[styles.pinCodeInnerView, {
                        borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                    }]}>
                        <Text style={appStyles.smallTextBlackBold}>
                            Total
                        </Text>

                        <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                            <Text style={appStyles.smallTextGray}>
                                Applicable Fees
                            </Text>
                            <Text style={appStyles.smallTextGray}>
                                {formatAmount((orderDetails?.requestId?.requestAmount) - (orderDetails?.requestId?.requestAmount * 0.075))}
                            </Text>
                        </View>

                        <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                            <Text style={appStyles.smallTextGray}>
                                Product Taxes (estimated)
                            </Text>
                            <Text style={appStyles.smallTextGray}>
                                {formatAmount(orderDetails?.requestId?.requestAmount * 0.075)}
                            </Text>
                        </View>

                        <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                            <Text style={appStyles.smallTextGray}>
                                Total Payment
                            </Text>
                            <Text style={appStyles.smallTextGray}>
                                {formatAmount(orderDetails?.requestId?.requestAmount)}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ gap: verticalScale(16), marginTop: verticalScale(16) }}>
                    {orderDetails?.status === "pending" && <CustomButton
                        title={"Cancel order"}
                        buttonStyle={{ borderColor: uiColours.RED }}
                        titleStyle={{ color: uiColours.RED }}
                        hasBackground={false}
                        hasOutLine
                        NavigationHandle={() => {
                            setShowSheet({
                                ...showSheet,
                                cancelOrder: true,
                            })
                        }}
                    />}
                    <CustomButton
                        hasBackground={false}
                        // hasOutLine
                        title={"Dispute"}
                        NavigationHandle={() => {
                            navigation?.navigate(MainRouteStrings.DISPUTE_SCREEN)
                        }}
                    />

                </View>
            </ScrollView>


            <ConfirmationSheet
                headerTitle="Confirmation"
                isVisible={showSheet.cancelOrder}
                setShowSheet={setShowSheet}
                renderIcon={() => {
                    // console.log("selectedVehicle", selectedVehicle);
                    const VehicleIcon = selectedVehicle?.id === "1" ? Images.scooter : selectedVehicle?.id === "2" ? Images.car : selectedVehicle?.id === "3" ? Images.van : Images.truck
                    return (
                        <View style={styles.iconCircle}>
                            <VehicleIcon height={moderateScale(45)} width={moderateScale(45)} />
                        </View>

                    )
                }}
                title="Are you sure you want to cancel this order?"
                discription="You will be charged $5 if you cancel your order"
                button1Title="Skip"
                button2Title="Cancel order"
                handleButton2Click={async () => {
                    setShowSheet({
                        ...showSheet,
                        cancelOrder: false
                    })
                    await Actions.showLoader(true)
                    await Socket.emit("booking-cancel", {
                        "id": orderDetails?._id
                    })
                }}
                handleButton1Click={() => {
                    setShowSheet({
                        ...showSheet,
                        cancelOrder: false
                    })
                }}
            />

            <ConfirmationSheet
                headerTitle="Confirmation"
                isVisible={showSheet.completeOrder}
                setShowSheet={setShowSheet}
                renderIcon={() => {
                    // console.log("selectedVehicle", selectedVehicle);
                    const VehicleIcon = selectedVehicle?.id === "1" ? Images.scooter : selectedVehicle?.id === "2" ? Images.car : selectedVehicle?.id === "3" ? Images.van : Images.truck
                    return (
                        <View style={styles.iconCircle}>
                            <VehicleIcon height={moderateScale(45)} width={moderateScale(45)} />
                        </View>

                    )
                }}
                title="Are you sure you want to complete this order?"
                titleStyles={{ color: uiColours.PRIMARY }}
                button1Title="Back"
                button2Title="Yes, complete"
                handleButton2Click={() => {
                    setShowSheet({
                        ...showSheet,
                        completeOrder: false
                    })
                    Actions.showLoader(true)
                    Socket.emit("booking-complete", {
                        "id": orderDetails?._id
                    })
                }}
                handleButton1Click={() => {
                    setShowSheet({
                        ...showSheet,
                        completeOrder: false
                    })
                }}
            />
            <OtpPopUp
                isVisible={showSheet.otp}
                headerTitle="Transaction Pin Code"
                title="Enter Transaction Pin Code"
                subTitle="Ask sender for the Transaction Pin Code"
                setShowSheet={setShowSheet}
                handleVerifyOtp={handleVerifyOtp}
                showOtpErr={showOtpErr}
                setShowOtpErr={setShowOtpErr}
            />
        </DragableBottomSheet>
    )
}

export default BottomView