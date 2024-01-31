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
import { apiPost } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { showGeneralError } from '../../../helper/showGeneralError'

const UserWalletScreen = () => {
    const { appStyles, userData, setuserData } = useContext(AppContext)
    const navigation = useNavigation()
    const [showSheet, setShowSheet] = useState(false)


    const handleAddAmount = async (data, amount) => {
        console.log("data====>", data, amount);
        if (data?.status === "successful") {
            updateTransaction(data, amount)
        } else {

        }
        setShowSheet(false)
    }

    const updateTransaction = async (data, amount) => {
        Actions.showLoader(true)
        const transactionData = {
            "userId": userData?._id,
            "amount": amount,
            "flutterwaveDetails": { ...data, amount: amount }
        }
        apiPost(endPoints.UPDATE_TOP_UP, transactionData).then((res) => {
            console.log("res in transaction update", res?.status, res?.data);
            if (res?.status === 201) {
                setuserData({
                    ...userData, wallet: {
                        ...userData?.wallet,
                        balance: parseInt(userData?.wallet?.balance) + parseInt(amount)
                    }
                })

            } else {
                showGeneralError()
            }
            Actions.showLoader(false)
        }).catch((err) => {
            showGeneralError()
            Actions.showLoader(false)
            console.log("error in update transaction", err);
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

                <TouchableOpacity
                    onPress={() => {
                        setShowSheet(true)
                    }}
                    style={{ paddingVertical: verticalScale(5) }}
                >
                    <Text style={appStyles?.smallTextPrimaryBold}>
                        Top up
                    </Text>
                </TouchableOpacity>

            </View>

            <SelectAmountPopup
                sheetTitle={"Top Up"}
                isVisible={showSheet}
                appStyles={appStyles}
                setShowSheet={setShowSheet}
                wallateBalance={userData?.wallet?.balance}
                handleOnRedirect={(data, amount) => { handleAddAmount(data, amount) }}
            />

            {/* <WithdrawPopUp
                sheetTitle={"Withdraw"}
                isVisible={showSheet}
                appStyles={appStyles}
                setShowSheet={setShowSheet}
                handleOnRedirect={handleWithdraw}
                buttonTitle="Withdraw"
                wallateBalance={userData?.wallet?.balance}
                action="withdraw"
            /> */}

        </WrapperContainer>
    )
}

export default UserWalletScreen