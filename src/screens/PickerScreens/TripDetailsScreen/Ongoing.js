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
                    inPutStyles={{ backgroundColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,marginBottom:verticalScale(16) }}
                />
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
    )
}

export default Ongoing