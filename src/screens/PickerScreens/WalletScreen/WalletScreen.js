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
import ConfirmPaymentPopUp from './ConfirmPaymentPopUp'
import { apiPost } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import Actions from '../../../redux/Actions'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import { showErrorToast } from '../../../helper/showErrorToast'

const WalletScreen = () => {
    const { appStyles, userData, setuserData, isDark } = useContext(AppContext)
    const navigation = useNavigation()
    const [showSheet, setShowSheet] = useState({
        withdraw: false,
        confirm: false
    })
    const [withDrawData, setWithDrawData] = useState({
        account_bank: "",
        amount: "0",
    })


    const handleWithdraw = () => {
        setShowSheet(false)
        const data = {
            picckrId: userData?._id,
            amount: withDrawData?.amount,
            bankAccountId: withDrawData?.account_bank?._id
        }
        // console.log("data====>", data);
        Actions.showLoader(true)
        apiPost(endPoints?.WITHDRAWAL, data).then((res) => {
            Actions.showLoader(false)
            if (res?.status === 201) {
                showSuccessToast(res?.data?.message, isDark)
            } else {
                showErrorToast(res?.data?.message)
            }
            // console.log("res?.data", res?.data, res?.status);
        }).catch((error) => {
            Actions.showLoader(false)
            console.log("error in withdrarw", res);
        })

        // console.log("data====>", data, amount);
        // if (data?.status === "successful") {
        //     setuserData({
        //         ...userData, wallet: {
        //             ...userData?.wallet,
        //             balance: parseInt(userData?.wallet?.balance) - parseInt(amount)
        //         }
        //     })
        // } else {

        // }

    }

    const handleConfirm = async () => {
        setShowSheet({
            ...showSheet,
            confirm: true,
            withdraw: false
        })
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
                        setShowSheet({
                            ...showSheet,
                            withdraw: true
                        })
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
                isVisible={showSheet.withdraw}
                appStyles={appStyles}
                setShowSheet={setShowSheet}
                handleConfirm={handleConfirm}
                buttonTitle="Withdraw"
                wallateBalance={userData?.wallet?.balance}
                action="withdraw"
                withDrawData={withDrawData}
                setWithDrawData={setWithDrawData}
            />

            <ConfirmPaymentPopUp
                isVisible={showSheet?.confirm}
                appStyles={appStyles}
                sheetTitle={"confirm Withdraw"}
                withdrawData={withDrawData}
                handleWithdraw={handleWithdraw}
                setShowSheet={setShowSheet}
            />

        </WrapperContainer>
    )
}

export default WalletScreen