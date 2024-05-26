import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import styles from './Styles'
import { Image } from 'react-native-svg'
import { Images } from '../../../assets/images'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import InputText from '../../../components/InputText/InputText'
import { uiColours } from '../../../utils/Styles/uiColors'
import CustomButton from '../../../components/Button/CustomButton'
import { buttonTypes } from '../../../utils/Constents/constentStrings'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import CancelOrderSheet from './CancelOrderSheet'
import { formatAmount } from '../../../helper/formatter'

const Ongoing = ({
    orderDeatils,
    appStyles,
    navigation,
    isDark,
    handleJoinRoom
}) => {

    const [showSheet, setShowSheet] = useState({
        confirmation: false
    })

    return (
        <View style={{ padding: moderateScale(16), gap: verticalScale(16) }}>
            <View style={[styles.onGoingContentSection, {
                borderColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
            }]}>
                <View style={[styles.pickerProfile, {
                    borderColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
                }]}>
                    <View style={styles.pickerProfileView}>
                        {orderDeatils?.userId?.picture ? <Image source={{ uri: orderDeatils?.userId?.picture }} style={{
                            height: moderateScale(50),
                            width: moderateScale(50)
                        }} /> : <Images.profile height={moderateScale(50)} width={moderateScale(50)} />}
                    </View>
                    <View>
                        <Text style={appStyles?.mediumTextPrimaryBold}>{orderDeatils?.userId?.firstName} {orderDeatils?.userId?.lastName}</Text>
                        <Text style={appStyles?.smallTextGray}>{orderDeatils?.userId?.phoneNumber}</Text>
                    </View>
                </View>
                <View style={styles.sendMsg}>
                    <TouchableOpacity
                        style={[styles.msgInput, {
                            backgroundColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
                        }]}
                        onPress={() => {
                            handleJoinRoom(orderDeatils)
                        }}
                    >
                        <Text style={appStyles.smallTextGray}>Send message to {orderDeatils?.userId?.firstName}</Text>
                    </TouchableOpacity>

                </View>
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

            <View style={[styles.onGoingContentSection, {
                borderColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
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

            <View style={[styles.onGoingContentSection, {
                borderColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
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
                        {formatAmount((orderDeatils?.requestId?.requestAmount) + (orderDeatils?.requestId?.requestAmount * 0.075))}
                    </Text>
                </View>
            </View>


            <View style={[styles.onGoingFooter, {
                borderColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
                flexDirection: orderDeatils?.status === "pending" ? "row" : "column",
                justifyContent: "space-between"
            }]}>
                <CustomButton
                    buttonType={buttonTypes.MEDIUM}
                    hasBackground={false}
                    hasOutLine
                    title={"Dispute"}
                    NavigationHandle={() => {
                        navigation?.navigate(MainRouteStrings.DISPUTE_SCREEN)
                    }}
                />
                {orderDeatils?.status === "pending" && <CustomButton
                    buttonType={buttonTypes.MEDIUM}
                    title={"Cancel order"}
                    NavigationHandle={() => {
                        setShowSheet({
                            ...showSheet,
                            confirmation: true
                        })
                    }}
                />}
            </View>

        </View>
    )
}

export default Ongoing