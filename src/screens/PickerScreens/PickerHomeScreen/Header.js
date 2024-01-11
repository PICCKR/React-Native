import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { uiColours } from '../../../utils/Styles/uiColors'
import SelectAmountPopup from '../../../components/SelectAmountPopup/SelectAmountPopup'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import { AppContext } from '../../../context/AppContext'

const Header = ({
    appStyles,
    isDark,
}) => {
    // console.log("userData", userData);
    const {setuserData, userData} = useContext(AppContext)
    const navigation = useNavigation()
    const [showSheet, setShowSheet] = useState(false)

    const handleWithdraw = (data, amount) => {
        console.log("data====>", data, amount);
        if (data?.status === "successful") {
            setuserData({
                ...userData, wallet: {
                    ...userData?.wallet,
                    balance: parseInt(userData?.wallet?.balance) - parseInt(amount)
                }
            })
        } else {
            
        }
        setShowSheet(false)
    }

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
                        <Text style={[appStyles.smallTextBlackBold, {
                            color: uiColours.BLACK_TEXT
                        }]} >
                            ₦{userData?.wallet?.balance}
                        </Text>
                    </View>
                </View>

                {userData?.wallet?.balance > 0 &&<TouchableOpacity
                    onPress={() =>
                        navigation.navigate(MainRouteStrings.WALLET_SCREEN)
                    }
                    style={{ paddingVertical: verticalScale(6) }}
                >
                    <Text style={appStyles.smallTextPrimaryBold} >
                        Withdraw
                    </Text>
                </TouchableOpacity>}
            </View>

            <SelectAmountPopup
                sheetTitle={"Withdraw"}
                isVisible={showSheet}
                appStyles={appStyles}
                setShowSheet={setShowSheet}
                handleOnRedirect={handleWithdraw}
                buttonTitle="Withdraw"
                wallateBalance={userData?.wallet?.balance}
                action ="withdraw"
            />
        </View>
    )
}

export default Header