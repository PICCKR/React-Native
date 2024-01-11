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

const Ongoing = ({
    data,
    appStyles,
    navigation,
    isDark
}) => {
    
    const [showSheet, setShowSheet] = useState({
        confirmation: false
    })

    return (
        <View style={{ padding: moderateScale(16), gap: verticalScale(16) }}>
            <View style={[styles.onGoingContentSection,{
                borderColor:!isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
            }]}>
                <View style={[styles.pickerProfile,{
                     borderColor:!isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
                }]}>
                    <View style={styles.pickerProfileView}>
                        {data?.profileImg ? <Image source={{ uri: data.profileImg }} /> : <Images.profile height={moderateScale(50)} width={moderateScale(50)} />}
                    </View>
                    <View style={styles.pickerVehicle}>
                        <Images.car height={moderateScale(17)} width={moderateScale(17)} />
                    </View>
                    <View>
                        <Text style={appStyles?.mediumTextPrimaryBold}>{data?.picker}</Text>
                        <Text>AM666EE • Toyota Prius Hybris</Text>
                        <View style={commonStyles.flexRowAlnCtr}>
                            <Images.star />
                            <Text style={appStyles.smallTextGray}>{4.9}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.sendMsg}>

                    <TouchableOpacity
                        style={[styles.msgInput,{
                            backgroundColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
                        }]}
                        onPress={() => {
                            navigation.navigate(MainRouteStrings.USER_CHAT_SCREEN)
                        }}
                    >
                        <Text style={appStyles.smallTextGray}>Send message to Cooper Septimus</Text>
                    </TouchableOpacity>

                    <View style={styles.heartIcon}>
                        <Images.heartRed />
                    </View>

                </View>
            </View>

            <View style={[styles.onGoingContentSection,{
                borderColor:!isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
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
                    inPutStyles={{backgroundColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON, }}
                />
                <InputText
                    hasTitle
                    inputTitle="Package type"
                    value={"Electronics"}
                    textBox={{ color: uiColours.GRAY_TEXT }}
                    editable={false}
                    inputContainer={{ width: '100%', marginTop: verticalScale(16) }}
                    inPutStyles={{backgroundColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON, }}
                />

            </View>

            <View style={[styles.onGoingContentSection,{
                borderColor:!isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
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

            <View style={[styles.onGoingContentSection,{
                borderColor:!isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
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
                    ₦100
                    </Text>
                </View>

            </View>

            <View style={[styles.onGoingFooter,{
                 borderColor:!isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
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
                <CustomButton
                    buttonType={buttonTypes.MEDIUM}
                    title={"Cancel order"}
                    NavigationHandle={() => {
                        setShowSheet({
                            ...showSheet,
                            confirmation: true
                        })
                    }}
                />
            </View>

    
                <CancelOrderSheet
                    isVisible={showSheet.confirmation}
                    appStyles={appStyles}
                    setShowSheet={setShowSheet}
                    handleCancelOrder={() => {
                        setShowSheet(false)
                        navigation.navigate(MainRouteStrings.PICKER_REVIEW_WHEN_CANCELLED)
                    }}
                />
            

        </View>
    )
}

export default Ongoing