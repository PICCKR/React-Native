import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../../../context/AppContext'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import styles from './Styles'
import { Images } from '../../../assets/images'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import SelectAmountPopup from '../../../components/SelectAmountPopup/SelectAmountPopup'
import WithdrawPopUp from './WithdrawPopUp'

const WalletScreen = () => {
    const { appStyles, userData, setuserData } = useContext(AppContext)
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
        <WrapperContainer
            centerTitle="Wallet"
            showFooterButton={false}
            containerPadding={{}}
            showBackButton
            handleBack={() => {
                navigation.goBack()
            }}
        >
            <Text style={appStyles?.mediumTextBlack}>Wallet</Text>

            <View style={[
                commonStyles.flexRowAlnCtrJutySpaceBetween,
                appStyles.bottomBorder,
                styles.walletCard
            ]}>
                <View style={commonStyles.flexRowAlnCtr}>
                    <Images.wallet height={moderateScale(24)} width={moderateScale(24)} />
                    <View >
                        <Text style={appStyles?.smallTextGray}>
                            PicckRPay
                        </Text>
                        <Text style={appStyles?.smallTextPrimaryBold}>
                            ₦{userData?.wallet?.balance}
                        </Text>
                    </View>
                </View>

                {userData?.wallet?.balance > 0 && <TouchableOpacity
                    onPress={() => {
                        setShowSheet(true)
                    }}
                    style={{ paddingVertical: verticalScale(5) }}
                >
                    <Text style={appStyles?.smallTextPrimaryBold}>
                        Withdraw
                    </Text>
                </TouchableOpacity>}

            </View>

            <WithdrawPopUp
                sheetTitle={"Withdraw"}
                isVisible={showSheet}
                appStyles={appStyles}
                setShowSheet={setShowSheet}
                handleOnRedirect={handleWithdraw}
                buttonTitle="Withdraw"
                wallateBalance={userData?.wallet?.balance}
                action="withdraw"
            />

        </WrapperContainer>
    )
}

export default WalletScreen