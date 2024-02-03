import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from './Styles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import PayWithFlutterwave from 'flutterwave-react-native'
import { AppContext } from '../../../context/AppContext'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import InputText from '../../../components/InputText/InputText'
import { uiColours } from '../../../utils/Styles/uiColors'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import DropDown from '../../../components/DropDown/DropDown'
import axios from 'axios'
import { apiGet } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'

const WithdrawPopUp = ({
    isVisible,
    setShowSheet,
    appStyles,
    sheetTitle,
    wallateBalance,
    withDrawData,
    setWithDrawData,
    handleConfirm
}) => {
    const { userData } = useContext(AppContext)
    const [fullBankData, setFullBankData] = useState([])
    const [page, setPage] = useState(1);
    const [buttonActive, setButtonActive] = useState(false)
    const [seletedAmount, setSelectedAmount] = useState("0")
    const [bankData, setBankData] = useState([])

    const [showError, setShowError] = useState({
        amount: false,
        accountNumber: false
    })


    const getAccountData = async () => {
        // Actions.showLoader(true)
        apiGet(`${endPoints.BANK_ACCOUNT}`).then((res) => {
            // console.log("get vehicle res ", res?.data, res?.status);
            if (res?.status === 200) {
                setBankData(res?.data?.data)
            } else {
                setBankData([])
            }
            // Actions.showLoader(false)
        }).catch((error) => {
            // Actions.showLoader(false)
            console.log("error in get address", error);
        })
    }

    useEffect(() => {
        getAccountData()
    }, [])

    useEffect(() => {
        if (parseInt(withDrawData?.amount) > 0 &&
            withDrawData?.account_bank
        ) {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }
    }, [withDrawData])



    return (
        <BottomSheet
            isVisible={isVisible}
            title={sheetTitle}
            hasCloseIcon
            setShowModal={setShowSheet}
            buttonActive={buttonActive}
            handleRightClick={() => {
                setShowSheet(false)
            }}
            onBackdropPress={() => {
                setShowSheet(false)
            }}
            handleButtonPress={() => {
                if (withDrawData?.amount > wallateBalance) {
                    setShowError({
                        ...showError,
                        amount: true
                    })
                } else {
                    setShowError({
                        ...showError,
                        amount: false
                    })
                    handleConfirm()
                }

            }}
            showFooterButton
            buttonTitle={"Confirm"}
        >
            <ScrollView style={{}}>
                <View style={{ gap: verticalScale(10) }}>
                    <Text style={[appStyles?.smallTextPrimaryBold]}>
                        Wallate balance ₦{wallateBalance}
                    </Text>

                    <InputText
                        hasTitle
                        inputTitle="Enter amount(₦)"
                        handleChange={(e) => {
                            setWithDrawData({
                                ...withDrawData,
                                amount: e
                            })
                        }}
                        keyboardType="numeric"
                        placeholder={withDrawData.amount}
                        value={withDrawData.amount}
                        inputContainer={{}}
                        ShowError={showError.amount}
                        ErrorMsg={`You can withdraw only ${wallateBalance}`}
                    />

                    <DropDown
                        data={bankData}
                        changeKey="bankName"
                        title="Bank Account"
                        palceholder={"Select Your Bank"}
                        handleSelectItem={(item) => {
                            setWithDrawData({
                                ...withDrawData,
                                account_bank: item
                            })
                        }}
                    />

                </View>

                <View style={{ marginTop: verticalScale(16) }}>
                    <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                        <Text style={appStyles.smallTextGray}>
                            Total Payment
                        </Text>
                        <Text style={appStyles.smallTextPrimary}>
                            ₦{withDrawData.amount ? withDrawData.amount : "0"}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </BottomSheet>
    )
}

export default WithdrawPopUp