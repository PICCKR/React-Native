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
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import Actions from '../../../redux/Actions'
import { apiPost, apiPut } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import { showErrorToast } from '../../../helper/showErrorToast'
import { showGeneralError } from '../../../helper/showGeneralError'

const AddBankAccount = ({ route }) => {
    const userData = useSelector((state) => state?.userDataReducer?.userData)
    const bacnkAccounts = useSelector((state) => state?.bankAccountReducer?.bankAccounts)
    const navigation = useNavigation()
    const action = route?.params?.action
    const data = route?.params?.data
    const { appStyles, isDark } = useContext(AppContext)
    const [buttonActive, setButtonActive] = useState(false)
    const [bankData, setBankData] = useState([])
    const [fullBankData, setFullBankData] = useState([])
    const [page, setPage] = useState(1);
    const [showError, setShowError] = useState()
    const [bacnkAccountData, setBacnkAccountData] = useState({
        bankName: data?.bankName,
        accountNumber: data?.accountNumber ? data?.accountNumber : "",
        bankCode: data?.bankCode ? data?.bankCode : "",
        country: data?.country
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

    const handleAddBackAccount = () => {
        Actions.showLoader(true)
        apiPost(endPoints.BANK_ACCOUNT, { ...bacnkAccountData, userId: userData?._id }).then((res) => {
            // console.log("resss=>", res?.data, res?.status);     
            if (res?.status === 201) {
                const data = res?.data?.data
                Actions.banckAccountData([...bacnkAccounts, res?.data?.data])
                showSuccessToast("You have successfully added an bank account", isDark)
                navigation.goBack()
            } else {
                showErrorToast(res?.data?.message, isDark)
            }
            Actions.showLoader(false)
        }).catch((error) => {
            Actions.showLoader(false)
            showGeneralError()
            console.log("error in add address", error);
        })
    }

    const handleUpdateBackAccount = async (accountData) => {
        Actions.showLoader(true)
        apiPut(`${endPoints.BANK_ACCOUNT}/${data?._id}`, bacnkAccountData).then(async (res) => {
            // console.log("resss=>", res?.data, res?.status);
            if (res?.status === 200) {
                const updatedAccounts = await bacnkAccounts?.map((item) => {
                    if (item?._id === data?._id) {
                        return res?.data?.data
                    } else {
                        return item
                    }
                })
                Actions.banckAccountData(updatedAccounts)
                showSuccessToast("You have successfully edited an banck account", isDark)
                navigation.goBack()
            } else {
                showGeneralError()
            }
            Actions.showLoader(false)
        }).catch((error) => {
            Actions.showLoader(false)
            showGeneralError()
            console.log("error in edit address", error);
        })
    }



    useEffect(() => {
        if (
            bacnkAccountData.bankName &&
            bacnkAccountData?.accountNumber &&
            bacnkAccountData.bankCode &&
            bacnkAccountData?.country
        ) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [bacnkAccountData]);

    return (
        <WrapperContainer
            buttonTitle={"Add bank account"}
            leftTitle="Account"
            hasCloseIcon
            handlerRightViewPress={() => {
                navigation.goBack()
            }}
            buttonActive={buttonActive}
            handleButtonPress={() => {
                if (action === "add") {
                    handleAddBackAccount()
                } else {
                    handleUpdateBackAccount()
                }
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
        </WrapperContainer>
    )
}

export default AddBankAccount