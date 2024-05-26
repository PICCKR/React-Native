import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import styles from './Styles'
import { uiColours } from '../../../utils/Styles/uiColors'
import { Images } from '../../../assets/images'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'

const SetRoute = ({
    
}) => {
    const { appStyles, userData, isDark, currentLocation, destination, source } = useContext(AppContext)
    // console.log("source", source);
    const navigation = useNavigation()
    return (
        <View style={{paddingHorizontal:scale(16), marginTop:verticalScale(16)}}>
            <Text style={appStyles.mediumTextBlackBold}>Set route</Text>
            <View style={[styles.inputContainer, {
                borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
            }]}>
                <View style={[styles.inputView]}>
                    <Images.source height={moderateScale(16)} width={moderateScale(16)} />
                    <TouchableOpacity
                        style={[styles.locationView, appStyles?.bottomBorder,appStyles.borderColor]}
                        onPress={() => {
                            navigation.navigate(MainRouteStrings.PICKER_FIND_DESTINATION)
                        }}
                    >
                        <Text style={appStyles.smallTextGray}>
                            {(source.location && source?.lat) ? source.location : 'Set your current location'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputView}>
                    <Images.locationPinRed height={moderateScale(16)} width={moderateScale(16)} />
                    <TouchableOpacity
                        style={[styles.locationView]}
                        onPress={() => {
                            navigation.navigate(MainRouteStrings.PICKER_FIND_DESTINATION)
                        }}
                    >
                        <Text style={appStyles.smallTextGray}>
                            {destination.location ? destination.location : "Set your destination"}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default SetRoute