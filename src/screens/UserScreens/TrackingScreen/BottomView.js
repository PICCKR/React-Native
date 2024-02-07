import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
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
import { AppContext, useSocket } from '../../../context/AppContext'
import { formatAmount, formatter } from '../../../helper/formatter'
import Actions from '../../../redux/Actions'
import { apiPost, apiPut } from '../../../services/apiServices'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import { endPoints } from '../../../configs/apiUrls'
import { showErrorToast } from '../../../helper/showErrorToast'
import useBackButton from '../../../customHooks/useBackButton'

const BottomView = ({
    appStyles,
    data,
    selectedVehicle,
    handleCancelOrder,
    isDark,
    orderDeatils
}) => {
    const { destination, source } = useContext(AppContext)
    const [isBookingStarted, setIsBookingStarted] = useState(false)
    const { Socket } = useSocket()
    const navigation = useNavigation()
    const [showSheet, setShowSheet] = useState({
        confirmation: false,
    })

    const pinData = orderDeatils?.verificationCode?.toString()?.split('')
    // console.log(pinData);


    const handleAddFavorate = () => {
        Actions.showLoader(true)
        apiPost(endPoints.FAVORIES, {
            "picckrId": orderDeatils?.picckrId?._id,
            "userId": orderDeatils?.userId?._id,
            "vehicleId": orderDeatils?.picckrId?.vehicle?._id
        }).then((res) => {
            Actions.showLoader(false)
            // console.log("res innadd fav", res?.data);
            if (res?.status === 201) {
                showSuccessToast(`${orderDeatils?.picckrId?.firstName} is added to your favorate list`, isDark)
            } else {
                showErrorToast(res?.data?.message, isDark)
            }
        }).catch((error) => {
            Actions.showLoader(false)
            console.log("error in add fav", error);
        })
    }

    const handleBookingstart = async (data) => {
        // console.log("booking-start-in-user", data);
    }

    const handleGetBooking = (data) => {
        Actions.showLoader(false)
        // console.log("get-booking-in-user-traking", data?.data);
        if (data?.data?.status === "delivered") {
            showSuccessToast("Your order deleverd successfully", isDark)
            navigation.navigate(MainRouteStrings.ACTIVITY_SCREEN)
        }
        // Actions.bookingData(null)
        // A
    }

    const handleCancelSuccess = (data) => {
        Actions.showLoader(false)
        // console.log("request-cancel-successfully in user", data);
        navigation.navigate(MainRouteStrings.PICKER_REVIEW_WHEN_CANCELLED, {
            data: orderDeatils
        })
    }

    const handleCancelError = useCallback((data) => {
        Actions.showLoader(false)
        // console.log("request-cancel-error", data);
        showErrorToast(data?.message, isDark)

    }, [Socket])

    useEffect(() => {

        Socket.on('booking-start-successfully', handleBookingstart)
        Socket.on('get-booking', handleGetBooking)
        Socket.on("booking-cancel-successfully", handleCancelSuccess)
        Socket.on("booking-cancel-error", handleCancelError)
        return () => {
            Socket.off('booking-start-successfully', handleBookingstart)
            Socket.off('get-booking', handleGetBooking)
            Socket.off("booking-cancel-successfully", handleCancelSuccess)
            Socket.off("booking-cancel-error", handleCancelError)
        }
    }, [Socket, handleBookingstart, handleGetBooking, handleCancelSuccess, handleCancelError])

    useBackButton(() => {
        navigation.navigate(MainRouteStrings.ACTIVITY_SCREEN)
        return true
    })

    return (
        <DragableBottomSheet
            index={2}
        >
            <View style={[styles.sheetHeader, {
                borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
            }]}>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(MainRouteStrings.ACTIVITY_SCREEN)
                    }}
                >
                    <Images.backArrow />
                </TouchableOpacity>
                <Text style={[appStyles.mediumTextPrimary, {
                    flex: 1,
                }]}>
                    {isBookingStarted ? "PicckR is heading to the destination" : "PicckR is heading to the pick-up address"}
                </Text>
                {/* <View style={styles.timeView}>
                    <Text style={appStyles.smallTextBlack}>5 min</Text>
                </View> */}
            </View>
            <ScrollView
                nestedScrollEnabled
                contentContainerStyle={{ flexGrow: 1 }}
                style={styles.bottomSheetContainer}>
                <View style={[styles.pickerSection, {
                    borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                }]}>
                    <View style={{ borderWidth: moderateScale(1), borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY, borderRadius: moderateScale(6), padding: moderateScale(16) }}>
                        <View style={[styles.pickerProfile, {
                            borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                        }]}>
                            <View style={styles.pickerProfileView}>
                                {orderDeatils?.picckrId?.picture ? <Image source={{ uri: orderDeatils?.picckrId?.picture }} style={{ height: moderateScale(40), width: moderateScale(40) }} /> : <Images.profile height={moderateScale(40)} width={moderateScale(40)} />}
                            </View>
                            {/* <View style={styles.pickerVehicle}>
                                <Images.car height={moderateScale(17)} width={moderateScale(17)} />
                            </View> */}
                            <View>
                                <Text style={appStyles?.mediumTextPrimaryBold}>{orderDeatils?.picckrId?.firstName} {orderDeatils?.picckrId?.lastName}</Text>
                                <Text style={appStyles?.smallTextGray}>{orderDeatils?.picckrId?.vehicle?.plateNumber} • {orderDeatils?.picckrId?.vehicle?.model} • {orderDeatils?.picckrId?.vehicle?.color}</Text>
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
                                        "room": orderDeatils?._id
                                    })
                                    navigation.navigate(MainRouteStrings.USER_CHAT_SCREEN, {
                                        orderDetails: orderDeatils
                                    })
                                }}
                            >
                                <Text style={appStyles.smallTextGray}>Send message to {orderDeatils?.picckrId?.firstName}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.heartIcon}
                                onPress={handleAddFavorate}
                            >
                                <Images.heartRed />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {orderDeatils?.status === "pending" && <View style={[styles.pinCodeView, {
                    borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                }]}>
                    <View style={[styles.pinCodeInnerView, {
                        borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                    }]}>
                        <Text style={appStyles.mediumTextBlackBold}>
                            Transaction pin code
                        </Text>
                        <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                            {
                                pinData?.map((item, index) => {
                                    return (
                                        <View key={index.toString()} style={styles.pinCard}>
                                            <Text style={[appStyles.mediumTextPrimaryBold, {
                                                color: uiColours.BLUE
                                            }]}>{item}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>}

                <View style={[styles.pinCodeView, {
                    borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                }]}>
                    <View style={[styles.pinCodeInnerView, {
                        borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                    }]}>
                        <Text style={[appStyles.mediumTextBlackBold, { marginBottom: verticalScale(5) }]}>
                            Item details
                        </Text>

                        <InputText
                            hasTitle
                            inputTitle="Package type"
                            value={orderDeatils?.requestId?.packageId?.name}
                            textBox={{ color: uiColours.GRAY_TEXT }}
                            editable={false}
                            inputContainer={{ width: '100%' }}
                            inPutStyles={{ backgroundColor: uiColours.LIGHT_GRAY }}
                        />
                        <InputText
                            hasTitle
                            inputTitle="Extimates item weight (kg)"
                            value={orderDeatils?.requestId?.parcelDescription?.weight}
                            textBox={{ color: uiColours.GRAY_TEXT }}
                            editable={false}
                            inputContainer={{ width: '100%', marginTop: verticalScale(16) }}
                            inPutStyles={{ backgroundColor: uiColours.LIGHT_GRAY }}
                        />
                    </View>

                </View>


                <View style={[styles.pinCodeView, {
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
                                        {orderDeatils?.requestId?.sender?.name}
                                    </Text>
                                    <Text style={appStyles.smallTextGray}>
                                        {orderDeatils?.requestId?.pickupAddress}
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
                                        {orderDeatils?.requestId?.recipeint?.name}
                                    </Text>
                                    <Text style={appStyles.smallTextGray}>
                                        {orderDeatils?.requestId?.dropOffAddress}
                                    </Text>
                                    {/* <Text style={appStyles.smallTextGray}>
                                        {source?.location}
                                    </Text> */}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.pinCodeView, {
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
                                {formatAmount((orderDeatils?.requestId?.requestAmount) - (orderDeatils?.requestId?.requestAmount * 0.075))}
                            </Text>
                        </View>

                        <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                            <Text style={appStyles.smallTextGray}>
                                Product Taxes (estimated)
                            </Text>
                            <Text style={appStyles.smallTextGray}>
                                {formatAmount(orderDeatils?.requestId?.requestAmount * 0.075)}
                            </Text>
                        </View>

                        <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                            <Text style={appStyles.smallTextGray}>
                                Total Payment
                            </Text>
                            <Text style={appStyles.smallTextGray}>
                                {formatAmount(orderDeatils?.requestId?.requestAmount)}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.pinCodeView, {
                    borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                }]}>
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
                                {formatAmount((orderDeatils?.requestId?.requestAmount) - (orderDeatils?.requestId?.requestAmount * 0.075))}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ gap: verticalScale(16), marginTop: verticalScale(16) }}>
                    {orderDeatils?.status === "pending" && <CustomButton
                        title={"Cancel order"}
                        buttonStyle={{ borderColor: uiColours.RED }}
                        titleStyle={{ color: uiColours.RED }}
                        hasBackground={false}
                        hasOutLine
                        NavigationHandle={() => {
                            setShowSheet({
                                ...showSheet,
                                confirmation: true
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
                isVisible={showSheet.confirmation}
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
                        confirmation: false
                    })
                    await Actions.showLoader(true)
                    await Socket.emit("booking-cancel", {
                        "id": orderDeatils?._id
                    })

                }}
                handleButton1Click={() => {
                    setShowSheet({
                        ...showSheet,
                        confirmation: false
                    })
                }}
            />
        </DragableBottomSheet>
    )
}

export default BottomView