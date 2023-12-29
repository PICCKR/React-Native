import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import styles from './Styles'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import ProfileView from '../../../components/PrifileView/ProfileView'
import { Images } from '../../../assets/images'
import CustomButton from '../../../components/Button/CustomButton'
import { buttonTypes } from '../../../utils/Constents/constentStrings'
import { uiColours } from '../../../utils/Styles/uiColors'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'

const TripRequest = ({

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

    return (
        <View style={{ paddingHorizontal: scale(16), marginTop: verticalScale(24) }}>
            <Text style={[appStyles.mediumTextBlackBold, { marginBottom: 10 }]}>
                Trip Request
            </Text>
            {
                tripRequest ?
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
                                    ${tripRequest?.price}
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
                                    buttonStyle={{ borderColor: uiColours.RED }}
                                    titleStyle={{ color: uiColours.RED }}
                                />
                                <CustomButton
                                    NavigationHandle={() => {
                                        setAccept(true)
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
        </View>
    )
}

export default TripRequest