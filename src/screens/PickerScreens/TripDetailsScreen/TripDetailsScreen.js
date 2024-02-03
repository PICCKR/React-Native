import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { AppContext, useSocket } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { uiColours } from '../../../utils/Styles/uiColors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Image } from 'react-native-svg'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import InputText from '../../../components/InputText/InputText'
import Ongoing from './Ongoing'
import CustomButton from '../../../components/Button/CustomButton'
import { buttonTypes } from '../../../utils/Constents/constentStrings'
import { ReviewsData } from '../../../json/reviewData'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import ConfirmationSheet from '../../../components/ConfirmationSheet/ConfirmationSheet'
import { useSelector } from 'react-redux'
import moment from 'moment'
import OtpPopUp from '../../../components/OtpPopUp/OtpPopUp'
import Actions from '../../../redux/Actions'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import { showErrorToast } from '../../../helper/showErrorToast'

const TripDetailsScreen = ({ route }) => {
    const { appStyles, isDark } = useContext(AppContext)
    const navigation = useNavigation()
    const orderDeatils = route.params?.data
    const userData = useSelector((state) => state?.userDataReducer?.userData)

    const status = orderDeatils?.status === "Cancelled" ? `${orderDeatils?.status} by ${orderDeatils?.by}` : orderDeatils?.status

    const { Socket } = useSocket()

    const [showSheet, setShowSheet] = useState({
        cancelOrder: false,
        otp: false,
        completeOrder: false
    })
    const [showOtpErr, setShowOtpErr] = useState(false)

    // console.log("data===>", data);

    const handleButtonPress = async () => {
        if (orderDeatils?.status === "in-transit") {
            setShowSheet({
                ...showSheet,
                completeOrder: true
            })
        } else {
            setShowSheet({
                ...showSheet,
                otp: true
            })
        }
    }

    const handleVerifyOtp = (otp) => {

        Socket.emit("booking-start", {
            "id": orderDeatils?._id,
            "verificationCode": parseInt(otp)
        })

        setShowSheet({
            ...showSheet,
            otp: false
        })
    }


    const handleBookingstartError = async (data) => {
        console.log("booking-start-error", data);
        // setShowOtpErr(true)
        showErrorToast(data?.message, isDark)

    }

    const handleBookingstart = async (data) => {
        console.log("booking-start-in-picker", data);
        navigation.goBack()
        showSuccessToast("Your booking has been started", isDark)
    }

    const handleCancelSuccess = (data) => {
        Actions.showLoader(false)
        console.log("request-cancel-successfully in picker", data);
        navigation.navigate(MainRouteStrings.USER_REVIEW_WHEN_CANCELLED, {
            data: orderDeatils
        })
        Actions.bookingData(null)
        Actions.orderDeatils(null)
    }

    const handleCancelError = useCallback((data) => {
        Actions.showLoader(false)
        console.log("request-cancel-error in picker", data);

    }, [Socket])

    const handleCompleteBookingError = useCallback((data) => {
        Actions.showLoader(false)
        console.log("booking-complete-error", data);

    }, [Socket])

    const handleCompleteBookingSuccess = (data) => {
        Actions.showLoader(false)
        console.log("booking-complete-success", data);
        navigation.navigate(MainRouteStrings.TRIPS_SCREEN)
        Actions.bookingData(null)
        Actions.orderDeatils(null)
    }

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
            Socket.off("booking-complete-succes", handleCompleteBookingSuccess)
            // Socket.off('get-booking', handleGetBooking)
        }
    }, [Socket, handleBookingstartError, handleBookingstart, handleCancelSuccess, handleCancelError, handleCompleteBookingError, handleCompleteBookingSuccess])

    return (
        <WrapperContainer
            centerTitle="Summary"
            showBackButton
            handleBack={() => {
                navigation.goBack()
            }}
            showFooterButton={true}
            buttonTitle={orderDeatils?.status === "in-transit" ? "Complete Order" : "Start booking"}
            buttonActive={true}
            handleButtonPress={handleButtonPress}
            containerPadding={{ paddingHorizontal: 0 }}
        >
            <ScrollView style={{}}>

                <View style={[styles.ActivitySummaryConatiner, {
                    borderColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
                }]}>
                    <View style={styles.vehicle}>
                        {/* <Image source = {{uri : data?.picckrId?.vehicle?.}} /> */}
                        <Images.car height={moderateScale(34)} width={moderateScale(34)} />
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={appStyles.smallTextGray}>
                            {moment(orderDeatils?.createdAt).format("DD-MM-YYYY")}
                        </Text>
                        <View style={[styles.label, {
                            backgroundColor: orderDeatils?.status === "delivered" ? uiColours.LIGHT_GREEN : orderDeatils?.status === "cancelled" ? uiColours.LIGHT_RED : "#C9F3FB"
                        }]}>
                            <Text style={[appStyles.smallTextPrimary, {
                                color: orderDeatils?.status === "delivered" ? uiColours.GREEN : orderDeatils?.status === "cancelled" ? uiColours.RED : uiColours.BLUE

                            }]}>
                                {status}
                            </Text>
                        </View>
                    </View>
                </View>

                <Ongoing
                    orderDeatils={orderDeatils}
                    appStyles={appStyles}
                    navigation={navigation}
                    isDark={isDark}
                    userData={userData}
                    handleJoinRoom={(data) => {
                        Socket.emit("joinRoom", {
                            "room": data?._id
                        })
                        navigation.navigate(MainRouteStrings.PICKER_MESSAGES_SCREEN, {
                            orderDetails: data
                        })
                    }}
                />

                {/* {data?.status === "Cancelled" &&
                    <View style={{ paddingHorizontal: scale(16), alignItems: "center" }}>
                        <View style={[styles.profileSection, appStyles.borderColor]}>
                            <View style={styles.profileView}>
                                {data?.profileImg ? <Image source={{ uri: profileInformation.profileImg }} /> : <Images.profile />}
                            </View>

                            <Text style={appStyles.mediumTextPrimaryBold}>{data?.picker}</Text>
                            <Rating
                                ratingCount={5}
                                imageSize={moderateScale(22)}
                                style={{

                                    alignItems: "center",
                                }}
                                readonly
                                ratingBackgroundColor="#fff"
                                onFinishRating={(e) => {
                                    // console.log('eee', e);
                                }}
                            />

                        </View>
                        <InputText
                            hasTitle
                            inputTitle="Any other feedback for Cooper Septimus?"
                            value={"PicckR distance too far"}
                            multiline
                            textBox={{ color: uiColours.GRAY_TEXT }}
                            editable={false}
                            inputContainer={{ width: '100%' }}
                            inPutStyles={{ backgroundColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON, marginBottom: verticalScale(16) }}
                        />
                    </View>
                }

                {(data?.status === "Completed" || data?.status === "Ongoing") && <View style={{ paddingHorizontal: scale(16) }}>

                    <View style={{ gap: verticalScale(16) }}>
                        <View style={[styles.onGoingContentSection, {
                            borderColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
                        }]}>
                        </View>
                        <View style={appStyles.bottomBorder}>
                            <Text style={[appStyles.mediumTextBlackBold, {}]}>
                                Delivery history
                            </Text>

                            <View style={[styles.tripDetails]}>
                                <View style={{ flexDirection: 'row', gap: scale(5) }}>
                                    <Images.source height={moderateScale(20)} width={moderateScale(20)} />
                                    <View>
                                        <Text style={appStyles.smallTextBlack}>
                                            Sender
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            Jeremy Jason
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            212-111-2222
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            Lesley University
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            29 Everett St, Cambridge, MA 02138
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', gap: scale(5) }}>
                                    <Images.locationPinRed height={moderateScale(20)} width={moderateScale(20)} />
                                    <View>
                                        <Text style={appStyles.smallTextBlack}>
                                            Recipient
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            John Cena
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            212-111-2222
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            Harvard University
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            Massachusetts Hall, Cambridge, MA 02138, United States of America
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <InputText
                                hasTitle
                                inputTitle="Price"
                                value={"₦100"}
                                textBox={{ color: uiColours.GRAY_TEXT }}
                                editable={false}
                                inputContainer={{ width: '100%' }}
                                inPutStyles={{ backgroundColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON, marginBottom: verticalScale(16) }}
                            />
                        </View>

                        <View style={[appStyles.bottomBorder, {
                            paddingBottom: verticalScale(16)
                        }]}>
                            <Text style={[appStyles.mediumTextBlackBold, { marginBottom: verticalScale(5) }]}>
                                Item details
                            </Text>

                            <InputText
                                hasTitle
                                inputTitle="Package type"
                                value={"Electronics"}
                                textBox={{ color: uiColours.GRAY_TEXT }}
                                editable={false}
                                inputContainer={{ width: '100%' }}
                                inPutStyles={{ backgroundColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON, }}
                            />
                            <InputText
                                hasTitle
                                inputTitle="Package type"
                                value={"Electronics"}
                                textBox={{ color: uiColours.GRAY_TEXT }}
                                editable={false}
                                inputContainer={{ width: '100%', marginTop: verticalScale(16) }}
                                inPutStyles={{ backgroundColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON, }}
                            />

                        </View>
                    </View>


                    {data?.status === "Completed" && <View style={styles.reviewSection}>
                        <Text style={[appStyles.mediumTextBlackBold, {}]}>
                            Sender’s feedback
                        </Text>
                        <Text style={appStyles.smallTextBlack}>
                            What went great?
                        </Text>
                        <View style={[commonStyles.flexRowAlnCtr, { flexWrap: "wrap", gap: scale(8), marginTop: verticalScale(10) }]}>
                            {
                                ReviewsData.map((item) => {
                                    return (
                                        <View
                                            key={item.id}
                                            style={[styles.reviewCard, {
                                                backgroundColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                                            }]}
                                        >
                                            <Text style={[appStyles.smallTextGray, { fontSize: scale(10) }]}>
                                                {item.title}
                                            </Text>
                                        </View>
                                    )
                                })
                            }
                        </View>

                        <View style={{ marginTop: verticalScale(16), paddingBottom: verticalScale(70) }}>
                            <InputText
                                hasTitle
                                inputTitle="Any other feedback for Cooper Septimus?"
                                value={"Thank you"}
                                multiline
                                textBox={{ color: uiColours.GRAY_TEXT }}
                                editable={false}
                                inputContainer={{ width: '100%' }}
                                inPutStyles={{ backgroundColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON, marginBottom: verticalScale(16) }}
                            />
                        </View>
                    </View>}
                </View>} */}

            </ScrollView>

            <ConfirmationSheet
                headerTitle="Confirmation"
                isVisible={showSheet.completeOrder}
                setShowSheet={setShowSheet}
                renderIcon={() => {
                    // console.log("selectedVehicle", selectedVehicle);
                    // const VehicleIcon = selectedVehicle?.id === "1" ? Images.scooter : selectedVehicle?.id === "2" ? Images.car : selectedVehicle?.id === "3" ? Images.van : Images.truck
                    return (
                        <View style={styles.iconCircle}>
                            <Images.scooter height={moderateScale(45)} width={moderateScale(45)} />
                        </View>

                    )
                }}
                title="Are you sure you want to complete this order?"
                titleStyles={{ color: uiColours.PRIMARY }}
                button1Title="Back"
                button2Title="Yes, complete"
                handleButton2Click={async () => {
                    setShowSheet({
                        ...showSheet,
                        completeOrder: false
                    })
                    await Actions.showLoader(true)
                    await Socket.emit("booking-complete", {
                        "id": orderDeatils?._id
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
        </WrapperContainer>
    )
}

export default TripDetailsScreen