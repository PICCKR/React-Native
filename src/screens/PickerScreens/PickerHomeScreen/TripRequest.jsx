import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import styles from './Styles'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import ProfileView from '../../../components/PrifileView/ProfileView'
import { Images } from '../../../assets/images'
import CustomButton from '../../../components/Button/CustomButton'
import { buttonTypes, tostMessagetypes } from '../../../utils/Constents/constentStrings'
import { uiColours } from '../../../utils/Styles/uiColors'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import ConfirmationSheet from '../../../components/ConfirmationSheet/ConfirmationSheet'
import VehicleIconView from '../../../components/VehicleIconView/VehicleIconView'
import { showToast } from '../../../components/tostConfig/tostConfig'

const TripRequest = ({
    handleDecline,
    from
}) => {
    const { appStyles, isDark } = useContext(AppContext)
    const navigation = useNavigation()

    const [tripRequest, setTripRequest] = useState(
        {
            name: "John Corbuzier",
            destination: "Harvard University",
            price: "110",
            distence: "1.5",
            time: "00:15",
            rating: "4.9"
        }
    )
    const [accept, setAccept] = useState(false)
    const [showSheet, setShowSheet] = useState({
        confirmtion: false
    })


    return (
        <View style={{ paddingHorizontal: scale(16), marginTop: verticalScale(24) }}>
            <Text style={[appStyles.mediumTextBlackBold, { marginBottom: 10 }]}>
                Trip Request
            </Text>
            {
                (tripRequest && from !== "review") ?
                    <View style={[styles.tripCard, appStyles.borderColor]}>
                        <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>

                            <ProfileView
                                hasBottomLine={false}
                                size={moderateScale(40)}
                            />

                            <View style={{ width: '70%' }}>
                                <Text style={appStyles.smallTextPrimaryBold}>
                                    {tripRequest?.name}
                                </Text>
                                <Text style={appStyles.smallTextGray}>
                                    Send to
                                    <Text style={appStyles.smallTextPrimary}>
                                        {` ${tripRequest?.destination}`}
                                    </Text>
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Images.star height={moderateScale(20)} width={moderateScale(20)} />
                                    <Text style={[appStyles.smallTextGray, {
                                        top: verticalScale(2)
                                    }]}>
                                        {tripRequest?.rating}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ alignItems: "flex-end" }}>
                                <Text style={appStyles.smallTextPrimaryBold}>
                                    ₦{tripRequest?.price}
                                </Text>
                                <Text style={appStyles.smallTextGray}>
                                    {tripRequest?.distence}kg
                                </Text>

                                <Text style={appStyles.smallTextGray}>
                                    {tripRequest?.time}
                                </Text>
                            </View>
                        </View>
                        {!accept ?
                            <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                                <CustomButton
                                    buttonType={buttonTypes.MEDIUM}
                                    title="Decline"
                                    hasBackground={false}
                                    hasOutLine
                                    NavigationHandle={() => {
                                        setShowSheet({
                                            ...showSheet,
                                            confirmtion: true
                                        })
                                    }}
                                    buttonStyle={{ borderColor: uiColours.RED }}
                                    titleStyle={{ color: uiColours.RED }}
                                />
                                <CustomButton
                                    NavigationHandle={() => {
                                        setAccept(true)
                                        navigation.navigate(MainRouteStrings.PICKUP_SCREEN, {
                                            geometry: {
                                                latitude: 12.978463866133229,
                                                longitude: 77.57011765790308
                                            }
                                        })
                                    }}
                                    buttonType={buttonTypes.MEDIUM}
                                    title="Accept"
                                />
                            </View> :

                            <TouchableOpacity
                                style={styles.msgInput}
                                onPress={() => {
                                    navigation.navigate(MainRouteStrings.PICKER_MESSAGES_SCREEN)
                                }}
                            >
                                <Text style={appStyles.smallTextGray}>Send message to John Corbuzier</Text>
                            </TouchableOpacity>

                        }
                    </View> :
                    <Text style={[appStyles.smallTextGray, {
                        textAlign: 'center'
                    }]}>
                        You don’t have any trip request.
                        Please set your route
                    </Text>
            }

            <ConfirmationSheet
                setShowSheet={setShowSheet}
                headerTitle="Confirmation"
                isVisible={showSheet.confirmtion}
                title="Are you sure you want to decline this order?"
                discription="You will not be charged a penalty if you cancel your order"
                button1Title='Back'
                button2Title='Yes, decline'
                handleButton1Click={() => {
                    setShowSheet({
                        ...showSheet,
                        confirmtion: false
                    })
                }}
                handleButton2Click={() => {
                    setShowSheet({
                        ...showSheet,
                        confirmtion: false
                    })
                    setTripRequest(null)
                    const toastMsgConfg = {
                        isDark: isDark,
                        msg: "You have successfully decline your trip."
                    }
                    showToast(toastMsgConfg, tostMessagetypes.SUCCESS, isDark)
                }}
                renderIcon={() => {
                    return (
                        <VehicleIconView />
                    )

                }}
            />
        </View>
    )
}

export default TripRequest