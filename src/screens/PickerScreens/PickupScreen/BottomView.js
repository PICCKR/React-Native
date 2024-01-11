import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
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

const BottomView = ({
    appStyles,
    data,
    pinData,
    selectedVehicle,
    handleCancelOrder,
    isDark
}) => {
    const navigation = useNavigation()
    const [showSheet, setShowSheet] = useState({
        cancelOrder: false,
        otp: false,
        completeOrder: false
    })
    const [showOtpErr, setShowOtpErr] = useState(false)
    const [tripStatus, setTripStatus] = useState(1)

    const handleVerifyOtp = (otp) => {
        setShowSheet({
            ...showSheet,
            otp: false
        })
        setTripStatus(3)
    }

    useEffect(() => {
        setTimeout(() => {
            setTripStatus(2)
        }, 2000);
    }, [])

    return (
        <DragableBottomSheet
            index={2}
        >
            <View style={[styles.sheetHeader, {
                borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
            }]}>
                <Text style={[appStyles.mediumTextPrimary, {
                    flex: 1,
                }]}>
                    You are heading to the pick-up address
                </Text>
                <View style={styles.timeView}>
                    <Text style={appStyles.smallTextBlack}>5 min</Text>
                </View>
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
                            <View style={styles.pickerProfileView}>
                                {data?.profileImg ? <Image source={{ uri: data.profileImg }} /> : <Images.profile height={moderateScale(50)} width={moderateScale(50)} />}
                            </View>
                            <View>
                                <Text style={appStyles?.mediumTextPrimaryBold}>Cooper Septimus</Text>
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
                                    navigation.navigate(MainRouteStrings.USER_CHAT_SCREEN)
                                }}
                            >
                                <Text style={appStyles.smallTextGray}>Send message to Cooper Septimus</Text>
                            </TouchableOpacity>

                            <CustomButton
                                buttonStyle={{ width: "100%" }}
                                title={tripStatus === 1 ? "Arrived at pick-up address" : tripStatus === 2 ? "Go to destination address" : "Complete Order"}
                                NavigationHandle={() => {
                                    if (tripStatus === 2) {
                                        setShowSheet({
                                            ...showSheet,
                                            otp: true
                                        })
                                    }else if(tripStatus === 3){
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

                <View style={[styles.sectionView, appStyles.borderColor]}>
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
                </View>

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
                            value={"Electronics"}
                            textBox={{ color: uiColours.GRAY_TEXT }}
                            editable={false}
                            inputContainer={{ width: '100%' }}
                            inPutStyles={{ backgroundColor: uiColours.LIGHT_GRAY }}
                        />
                        <InputText
                            hasTitle
                            inputTitle="Extimates item weight (kg)"
                            value={"5"}
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
                                $100
                            </Text>
                        </View>

                        <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                            <Text style={appStyles.smallTextGray}>
                                Product Taxes (estimated)
                            </Text>
                            <Text style={appStyles.smallTextGray}>
                                $10
                            </Text>
                        </View>

                        <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                            <Text style={appStyles.smallTextGray}>
                                Total Payment
                            </Text>
                            <Text style={appStyles.smallTextGray}>
                                $110
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ gap: verticalScale(16), marginTop: verticalScale(16) }}>
                    <CustomButton
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
                    />
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
                handleButton2Click={() => {
                    setShowSheet({
                        ...showSheet,
                        cancelOrder: false
                    })
                    handleCancelOrder()
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
                titleStyles={{color:uiColours.PRIMARY}}
                button1Title="Back"
                button2Title="Yes, complete"
                handleButton2Click={() => {
                    setShowSheet({
                        ...showSheet,
                        completeOrder: false
                    })
                    navigation.navigate(MainRouteStrings.WRITE_USER_REVIEW,{
                        status:"Completed"
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