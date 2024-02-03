import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import styles from './Styles'
import { commonStyles, screenSize } from '../../../utils/Styles/CommonStyles'
import Form from '../../../components/Form/Form'
import InputText from '../../../components/InputText/InputText'
import FullScreenModal from '../../../components/FullScreenModal/FullScreenModal'
import { RegEx } from '../../../utils/Constents/regulerexpressions'
import DropDown from '../../../components/DropDown/DropDown'
import axios from 'axios'

const AddAccount = ({
    isVisible,
    setShowSheet,
    handleAddBackAccount,
}) => {
    const { appStyles, isDark } = useContext(AppContext)
    const [buttonActive, setButtonActive] = useState(false)
    const [bankData, setBankData] = useState([])
    const [fullBankData, setFullBankData] = useState([])
    const [page, setPage] = useState(1);
    const [showError, setShowError] = useState()
    const [bacnkAccountData, setBacnkAccountData] = useState({
        bankName: null,
        accountNumber: "",
        bankCode: "",
        country: null
    })

    const addData = [
        {
            id: 1,
            title: 'Account number',
            placeHolder: "Input your account number",
            type: "accountNumber",
            isRequired: true,
            errorMsg: "Enter valid Account number",
            validationString: RegEx.notEmpty,
        },
        {
            id: 2,
            title: 'Bank code',
            placeHolder: "Input Bank code",
            type: "bankCode",
            maxLenght: 100,
            errorMsg: "",
            isRequired: true,
            errorMsg: "Enter valid Bank code",
            validationString: RegEx.notEmpty,
        }
    ]

    const countryData = [
        {
            id: "1",
            code: "GH",
            name: "Ghana",
        },
        {
            id: "2",
            name: "Kenya",
            code: "KE"
        },
        {
            id: "3",
            name: "Nigeria",
            code: "NG"
        },
        {
            id: "4",
            name: "South Africa",
            code: "ZA"
        },
        {
            id: "5",
            name: "Uganda",
            code: "UG"
        },
        {
            id: "6",
            name: "Zambia",
            code: "ZM"
        }
    ]

    const getBackData = async () => {

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
            // console.log("resss", res?.status);

        }).catch((error) => {
            console.log("error", error);
        })
    }

    useEffect(() => {
        getBackData()
    }, [])

    const loadMoreItems = () => {
        const nextPage = page + 1;
        const endIndex = nextPage * 20;
        const newData = fullBankData.slice(0, endIndex);
        setBankData(newData);
        setPage(nextPage);
    };

    useEffect(() => {
        if (
            bacnkAccountData.bankName !== "" &&
            bacnkAccountData?.accountNumber !== "" &&
            bacnkAccountData.bankCode !== "" &&
            bacnkAccountData?.country !== ""
        ) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [bacnkAccountData]);

    return (
        <FullScreenModal
            isVisible={isVisible}
            buttonTitle={"Add bck account"}
            leftTitle="Account"
            hasCloseIcon
            setShowModal={setShowSheet}
            buttonActive={buttonActive}
            handleButtonPress={() => {
                handleAddBackAccount(bacnkAccountData)
                setBacnkAccountData({
                    ...bacnkAccountData,
                    bankName: "",
                    accountNumber: "",
                    bankCode: "",
                    country: ""
                })
            }}
        >
            <ScrollView
                style={{}}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ gap: verticalScale(20) }}>
                    <DropDown
                        data={bankData}
                        changeKey="name"
                        title="Bank"
                        palceholder={"Select Your Bank"}
                        handleSelectItem={(item) => {
                            // console.log("item", item);
                            setBacnkAccountData({
                                ...bacnkAccountData,
                                bankName: item?.name
                            })
                        }}
                        loadMoreItems={loadMoreItems}
                    />

                    <Form
                        data={addData}
                        formData={bacnkAccountData}
                        setFormData={setBacnkAccountData}
                        setShowError={setShowError}
                        ShowError={showError}
                    />

                    <DropDown
                        data={countryData}

                        changeKey="name"
                        title="Country"
                        palceholder={"Select Your country"}
                        handleSelectItem={(item) => {
                            // console.log("item", item);
                            setBacnkAccountData({
                                ...bacnkAccountData,
                                country: item?.name
                            })
                        }}
                        loadMoreItems={loadMoreItems}
                    />
                </View>
                <View style={{ marginBottom: verticalScale(50) }}>

                </View>
            </ScrollView>

        </FullScreenModal>
    )
}

export default AddAccount