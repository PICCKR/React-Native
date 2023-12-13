import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const Header = ({
    userData,
    appStyles
}) => {
    console.log("userData", userData);
    return (
        <View style={styles.headerContainer}>
            <View style={styles.profileSection}>
                <View style={styles.profileView}>
                    <Images.profile height={moderateScale(50)} width={moderateScale(50)} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={appStyles?.largeTextWhiteBold}>
                        Good morning, {userData?.firstName} {userData?.lastName}!
                    </Text>
                    <Text style={appStyles.mediumTextWhite}>Let's send the package now!</Text>
                </View>
            </View>
            <View style={styles.walletView}>
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Images.wallet />
                    <View style={{ marginLeft: scale(10) }}>
                        <Text style={appStyles.smallTextGray} >
                            PicckRPay
                        </Text>
                        <Text style={appStyles.smallTextBlackBold} >
                            $530
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{ paddingVertical: verticalScale(6)}}
                >
                    <Text style={appStyles.smallTextPrimaryBold} >
                        Top up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header