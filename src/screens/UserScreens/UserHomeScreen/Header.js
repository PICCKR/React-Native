import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { uiColours } from '../../../utils/Styles/uiColors'
import SelectAmountPopup from '../../../components/SelectAmountPopup/SelectAmountPopup'
import { apiGet } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { AppContext } from '../../../context/AppContext'
import Actions from '../../../redux/Actions'

const Header = ({
    appStyles,
    isDark
}) => {
    // console.log("userData", userData);
    // State for showing/hiding SelectAmountPopup and wallet balance
    const { setuserData, userData } = useContext(AppContext)
    const [showSheet, setShowSheet] = useState(false)

    // Function to handle addition of amount to wallet balance
    const handleAddAmount = async (data, amount) => {
        
        console.log("data====>", data, amount);
        if (data?.status === "successful") {
            setuserData({
                ...userData, wallet: {
                    ...userData?.wallet,
                    balance: parseInt(userData?.wallet?.balance) + parseInt(amount)
                }
            })
        } else {
            // Handle unsuccessful transaction
        }
        setShowSheet(false)  // Close SelectAmountPopup after handling transaction
    }


    return (
        <View style={styles.headerContainer}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
                <View style={styles.profileView}>
                    <Images.profile height={moderateScale(50)} width={moderateScale(50)} />
                </View>
                <View style={{ flex: 1 }}>
                    {/* Displaying user's name if authenticated */}
                    {userData?.token ? <Text numberOfLines={1} ellipsizeMode="tail" style={appStyles?.largeTextWhiteBold}>
                        Good morning, {userData?.firstName} {userData?.lastName}!
                    </Text> :
                        <Text numberOfLines={1} ellipsizeMode="tail" style={appStyles?.largeTextWhiteBold}>
                            Good morning!
                        </Text>
                    }
                    <Text style={appStyles.mediumTextWhite}>Let's send the package now!</Text>
                </View>
            </View>

            {/* Wallet Section (Visible when user is authenticated) */}
            {userData?.token && <View style={styles.walletView}>
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

                {/* Button to open SelectAmountPopup for topping up wallet */}
                <TouchableOpacity
                    onPress={() =>
                        setShowSheet({
                            ...showSheet,
                            addPayment: true
                        })
                    }
                    style={{ paddingVertical: verticalScale(6) }}
                >
                    <Text style={appStyles.smallTextPrimaryBold} >
                        Top up
                    </Text>
                </TouchableOpacity>
            </View>}

            {/* SelectAmountPopup component for topping up the wallet */}
            <SelectAmountPopup
                sheetTitle={"Top Up"}
                isVisible={showSheet}
                appStyles={appStyles}
                wallateBalance={userData?.wallateBalance}
                setShowSheet={setShowSheet}
                handleOnRedirect={(data, amount) => { handleAddAmount(data, amount) }}
            />
        </View>
    )
}

export default Header