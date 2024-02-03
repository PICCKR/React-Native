import { View, Text, TouchableOpacity, LayoutAnimation, Animated } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { AppContext } from '../../../context/AppContext'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { toggleAnimation } from '../../../animations/toggleAnimation'
import { scale, verticalScale } from 'react-native-size-matters'
import InputText from '../../../components/InputText/InputText'
import { useNavigation } from '@react-navigation/native'
import { AuthRouteStrings } from '../../../utils/Constents/RouteStrings'
import useBackButton from '../../../customHooks/useBackButton'
import WhyBvnSheet from '../../AuthScreens/KycScreen/WhyBvnSheet'
import { apiPost } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import Actions from '../../../redux/Actions'
import { showGeneralError } from '../../../helper/showGeneralError'
import { showErrorToast } from '../../../helper/showErrorToast'
import DropDown from '../../../components/DropDown/DropDown'
import { useSelector } from 'react-redux'

const UserKycScreen = ({ route }) => {

    const data = route?.params?.data
    const { appStyles, isDark, setIsLoggedIn, setuserData } = useContext(AppContext)
    const userData = useSelector((state) => state?.userDataReducer?.userData)
    const navigation = useNavigation()

    const [selectedCountry, setSelctedCountry] = useState(null)
    const [sectedIdType, setSelectedIdType] = useState(null)

    const [kycData, setKycData] = useState({
        selectedCountry: null,
        sectedIdType: null,
        idNumber: ""
    })

    const [buttonActive, setButtonActive] = useState(false)
    const [showSheet, setShowSheet] = useState(false)
    const [bvn, setBvn] = useState("")

    const countryData = [
        {
            id: "1",
            code: "GH",
            name: "Ghana",
            idTypes: [
                {
                    id: "1",
                    type: `Driver's License`,
                    Regex: /^[a-zA-Z0-9!]{6,18}$/i,
                    val: "DRIVERS_LICENSE"
                },
                {
                    id: "2",
                    type: `Passport`,
                    Regex: /^[A-Z][0-9]{7,9}$/i,
                    val: "PASSPORT"
                },
                {
                    id: "3",
                    type: `SSNIT`,
                    Regex: /^[a-zA-Z]{1}[a-zA-Z0-9]{12,14}$/i,
                    val: 'SSNIT'
                },
                {
                    id: "4",
                    type: `Voter's ID`,
                    Regex: /^[0-9]{10,12}$/,
                    val: 'VOTER_ID'
                },
                {
                    id: "5",
                    type: `New Voter's ID`,
                    Regex: /^[0-9]{10,12}$/,
                    val: 'NEW_VOTER_ID'
                }
            ]
        },
        {
            id: "2",
            name: "Kenya",
            code: "KE",
            idTypes: [
                {
                    id: "1",
                    type: `Alien Card`,
                    Regex: /^[0-9]{6,9}$/,
                    val: "ALIEN_CARD"
                },
                {
                    id: "2",
                    type: `Driver's License`,
                    Regex: /^[0-9]{1,9}$/,
                    val: "DRIVERS_LICENSE"
                },
                {
                    id: "3",
                    type: `KRA Pin`,
                    Regex: /^[a-zA-Z0-9!]{6,18}$/i,
                    val: "KRA_PIN"
                },
                {
                    id: "4",
                    type: `National ID`,
                    Regex: /^[0-9]{1,9}$/,
                    val: "NATIONAL_ID"
                },
                {
                    id: "5",
                    type: `National ID (without Photo)`,
                    Regex: /^[0-9]{1,9}$/,
                    val: "NATIONAL_ID_NO_PHOTO"
                },
                {
                    id: "6",
                    type: `Passport`,
                    Regex: /^[A-Z0-9]{7,9}$/,
                    val: "PASSPORT"
                }
            ]
        },
        {
            id: "3",
            name: "Nigeria",
            code: "NG",
            idTypes: [
                {
                    id: "1",
                    type: `Bank Account`,
                    Regex: /^[0-9]{10}$/,
                    val: "BANK_ACCOUNT"
                },
                {
                    id: "2",
                    type: `BVN`,
                    Regex: /^[0-9]{11}$/,
                    val: "BVN"
                },
                {
                    id: "3",
                    type: `Driver's License`,
                    Regex: /^[a-zA-Z]{3}([ -]{1})?[A-Z0-9]{6,12}$/i,
                    val: "DRIVERS_LICENSE"
                },
                {
                    id: "4",
                    type: `NIN V2`,
                    Regex: /^[0-9]{11}$/,
                    val: "NIN_V2"
                },
                {
                    id: "5",
                    type: `NIN Slip`,
                    Regex: /^[0-9]{11}$/,
                    val: "NIN_V2"
                },
                {
                    id: "6",
                    type: `V_NIN (Virtual NIN)`,
                    Regex: /^[a-zA-Z0-9]{16}$/,
                    val: "V_NIN"
                },
                {
                    id: "7",
                    type: `Phone Number`,
                    Regex: /^[0-9]{11}$/,
                    val: "PHONE_NUMBER"
                },
                {
                    id: "8",
                    type: `Voter's ID`,
                    Regex: /^(INC[A-Za-z0-9]{17}|[A-Za-z0-9]{19,20})$/,
                    val: "VOTER_ID"
                }
            ]
        },
        {
            id: "4",
            name: "South Africa",
            code: "ZA",
            idTypes: [
                {
                    id: "1",
                    type: `National ID`,
                    Regex: /^[0-9]{13}$/,
                    val: "NATIONAL_ID"
                },
                {
                    id: "2",
                    type: `National ID (without Photo)`,
                    Regex: /^[0-9]{13}$/,
                    val: "NATIONAL_ID_NO_PHOTO"
                }
            ]
        },
        {
            id: "5",
            name: "Uganda",
            code: "UG",
            idTypes: [
                {
                    id: "1",
                    type: `National ID (without Photo)`,
                    Regex: /^[A-Z0-9]{14}$/i,
                    val: "NATIONAL_ID_NO_PHOTO"
                }
            ]
        },
        {
            id: "6",
            name: "Zambia",
            code: "ZM",
            idTypes: [
                {
                    id: "1",
                    type: `Bank Account`,
                    Regex: /.*/,
                    val: "BANK_ACCOUNT"
                }
            ]
        }
    ]

    const handleSave = async () => {
        if (kycData?.sectedIdType?.Regex.test(kycData?.idNumber)) {
            const apiData = {
                "country": kycData?.selectedCountry?.code,
                "id_number": kycData?.idNumber,
                "userId": userData?._id,
                "id_type": kycData?.sectedIdType?.val
            }
            // console.log("apiData", apiData);
            Actions.showLoader(true)
            apiPost(endPoints.VERIFY_KYC, apiData).then((res) => {
                console.log("error kyc", res?.data);

                if (res?.status === 200) {
                    showSuccessToast("verified successfully", isDark)
                    Actions.userData({
                        ...userData, kyc: {
                            idNumber: bvn
                        }
                    })
                    // setuserData({
                    //     ...userData, kyc: {
                    //         idNumber: bvn
                    //     }
                    // })

                    setLocalData(storageKeys.userData, {
                        ...userData, kyc: {
                            idNumber: bvn
                        }
                    })
                    navigation.goBack()
                } else if (res?.status === 409) {
                    showSuccessToast(res?.data?.message, isDark)
                    navigation.goBack()
                } else if (res?.status === 203) {
                    showErrorToast(res?.data?.message, isDark)
                }
                else {

                    showErrorToast(res?.data?.message, isDark)
                }
                Actions.showLoader(false)
            }).catch((error) => {
                showGeneralError()
                Actions.showLoader(false)
                console.log("error kyc", error);
            })
            // console.log("pass");
        } else {
            showErrorToast(`Enter valid ${kycData?.sectedIdType?.type}`, isDark)
        }
    }

    const animationController = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (kycData?.sectedIdType && kycData?.selectedCountry && kycData?.idNumber) {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }
    }, [kycData])

    return (
        <WrapperContainer
            centerTitle="KYC"
            showBackButton
            buttonTitle={"Verify"}
            handleButtonPress={handleSave}
            buttonActive={buttonActive}
            handleBack={() => {
                navigation.goBack()
            }}
            containerPadding={{ paddingTop: verticalScale(16) }}
        >
            {/* <View style={{ gap: verticalScale(20) }}>
                {
                    countryData.map((item) => {
                        const Flag = item.flag
                        return (
                            <View key={item?.id.toString()}>
                                <View
                                    style={styles.listItems}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(10) }}>
                                        <Flag />
                                        <Text style={appStyles.smallTextBlack}>{item?.name} {item?.code}</Text>
                                    </View>

                                    <TouchableOpacity
                                        activeOpacity={0.6}
                                        onPress={() => {

                                            const configs = {
                                                duration: 300,
                                                toValue: selectedCountry?.id === item?.id ? 0 : 1,
                                                useNativeDriver: true
                                            }
                                            Animated.timing(animationController, configs).start()
                                            LayoutAnimation.configureNext(toggleAnimation)
                                            setSelctedCountry(item)
                                        }}
                                        style={styles.uncheck}
                                    >
                                        {selectedCountry?.id === item?.id && <View style={styles.check}>

                                        </View>}
                                    </TouchableOpacity>
                                </View>
                                {selectedCountry?.id === item?.id &&
                                    <View style={{ marginTop: verticalScale(16) }}>
                                        <Text style={appStyles.smallTextGray}>Confirming your BVN helps us verify your identity.</Text>
                                        <InputText
                                            hasTitle
                                            inputTitle="Bank Verification Number"
                                            placeholder="e.g. 1234 5678 9012 3456"
                                            value={bvn}
                                            keyboardType="numeric"
                                            maxLength={11}
                                            inputContainer={{ marginTop: verticalScale(10) }}
                                            handleChange={(e) => {
                                                setBvn(e)
                                                if (e.length > 10) {
                                                    setButtonActive(true)
                                                } else {
                                                    setButtonActive(false)
                                                }
                                            }}
                                        />
                                        <TouchableOpacity
                                            style={styles.whyNeed}
                                            onPress={() => {
                                                setShowSheet(true)
                                            }}
                                        >
                                            <Images.info />
                                            <Text style={appStyles.smallTextPrimary}>Why we need your BVN?</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>

                        )
                    })
                }
            </View> */}
            <DropDown
                title={"select country"}
                data={countryData}
                palceholder="Selecte your country"
                changeKey={"name"}
                dropDownPress={() => {
                    setKycData({
                        ...kycData,
                        sectedIdType: null
                    })
                }}
                handleSelectItem={(item) => {
                    // console.log("item", item);
                    setKycData({
                        ...kycData,
                        selectedCountry: item
                    })
                }}
            />
            <DropDown
                title={"selecte id type"}
                palceholder="Selecte your id type"
                data={kycData.selectedCountry?.idTypes ? kycData.selectedCountry?.idTypes : []}
                changeKey={"type"}
                Value={kycData?.sectedIdType}
                handleSelectItem={(item) => {
                    // console.log("item", item);
                    setKycData({
                        ...kycData,
                        sectedIdType: item
                    })
                }}

            />

            <InputText
                hasTitle
                inputTitle="Enter id number"
                placeholder="Enter id number"
                value={kycData?.idNumber}
                keyboardType="numeric"
                maxLength={11}
                inputContainer={{ marginTop: verticalScale(10) }}
                handleChange={(e) => {
                    setKycData({
                        ...kycData,
                        idNumber: e

                    })
                }}
            />

            <WhyBvnSheet
                isVisible={showSheet}
                setShowSheet={setShowSheet}
                appStyles={appStyles}
            />


        </WrapperContainer>
    )
}

export default UserKycScreen