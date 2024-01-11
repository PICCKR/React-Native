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

const WithdrawPopUp = ({
    isVisible,
    setShowSheet,
    appStyles,
    sheetTitle,
    wallateBalance
}) => {
    const { userData } = useContext(AppContext)
    const [withDrawData, setWithDrawData] = useState({
        account_bank: "",
        account_number: "",
        amount: "0",
    })
    const [fullBankData, setFullBankData] = useState([])
    const [page, setPage] = useState(1);
    const [buttonActive, setButtonActive] = useState(false)
    const [seletedAmount, setSelectedAmount] = useState("0")
    const [bankData, setBankData] = useState([])
    const [showError, setShowError] = useState({
        amount: false,
        accountNumber: false
    })



    const loadMoreItems = () => {
        const nextPage = page + 1;
        const endIndex = nextPage * 20;
        const newData = fullBankData.slice(0, endIndex);
        setBankData(newData);
        setPage(nextPage);
    };

    const getBackData = async () => {
        // const data = {
        //     account_bank: withDrawData?.account_bank,
        //     account_number: withDrawData?.account_number,
        //     amount: parseInt(withDrawData?.amount),
        //     narration: "withdraw",
        //     currency: "NGN",
        //     reference: generateTransactionReference(),
        //     callback_url: "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
        //     debit_currency: "NGN",
        //     meta: [
        //         {
        //             sender: "picker",
        //             firstName: "Example",
        //             lastName: "User",
        //             email: "user@example.com",
        //             beneficiary_country: "NG",
        //             mobile_number: "+2348131133933",
        //             merchant_name: "Spotify"
        //         }]
        // }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer FLWSECK_TEST-SANDBOXDEMOKEY-X`,
            },
        };
        axios.get("https://api.flutterwave.com/v3/banks/NG", config).then((res) => {
            if (res?.status === 200) {
                const sortedData = res?.data?.data?.sort((a, b) => {
                    const nameA = a.name.toUpperCase(); // Convert names to uppercase for case-insensitive sorting
                    const nameB = b.name.toUpperCase();
        
                    if (nameA < nameB) {
                        return -1; // nameA comes before nameB
                    }
                    if (nameA > nameB) {
                        return 1; // nameA comes after nameB
                    }
                    return 0; // names are equal
                });
                setFullBankData(sortedData)
                const newData = sortedData.slice(0, 50);
                setBankData(newData)
            }
            console.log("resss", res?.status);

        }).catch((error) => {
            console.log("error", error);
        })
    }

    useEffect(() => {
        getBackData()
    }, [])

    useEffect(() => {
        if (parseInt(withDrawData?.amount) > 0 &&
            withDrawData?.account_number &&
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
            showFooterButton
            buttonTitle={"Withdraw"}
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
                        changeKey="name"
                        title="Bank"
                        palceholder={"Select Your Bank"}
                        handleSelectItem={(item) => {
                            setWithDrawData({
                                ...withDrawData,
                                account_bank: item
                            })
                        }}
                        loadMoreItems={loadMoreItems}
                    />

                    <InputText
                        hasTitle
                        inputTitle="Account number"
                        handleChange={(e) => {
                            setWithDrawData({
                                ...withDrawData,
                                account_number: e
                            })
                        }}
                        keyboardType="numeric"
                        placeholder={"Input your account number"}
                        value={withDrawData?.account_number}
                        inputContainer={{}}
                        ShowError={showError.accountNumber}
                        ErrorMsg={`Enter account number`}
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