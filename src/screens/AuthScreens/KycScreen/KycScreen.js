import { View, Text, TouchableOpacity, LayoutAnimation, Animated } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { AppContext } from '../../../context/AppContext'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { toggleAnimation } from '../../../animations/toggleAnimation'
import { scale, verticalScale } from 'react-native-size-matters'
import InputText from '../../../components/InputText/InputText'
import WhyBvnSheet from './WhyBvnSheet'
import { useNavigation } from '@react-navigation/native'
import { AuthRouteStrings } from '../../../utils/Constents/RouteStrings'
import useBackButton from '../../../customHooks/useBackButton'
import Actions from '../../../redux/Actions'
import { apiPost } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import { setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'
import { showGeneralError } from '../../../helper/showGeneralError'

const KycScreen = ({ route }) => {
    const data = route?.params?.data
    const { appStyles, isDark, setIsLoggedIn, userData, setuserData } = useContext(AppContext)
    const navigation = useNavigation()

    const [selectedCountry, setSelctedCountry] = useState({
        id: 1,
        flag: Images.NigeriaFlags,
        name: "Nigeria",
        code: "(+234)",
        country: 'NG'
    })
    const [buttonActive, setButtonActive] = useState(false)
    const [showSheet, setShowSheet] = useState(false)
    const [bvn, setBvn] = useState("")

    const countryData = [
        {
            id: 1,
            flag: Images.NigeriaFlags,
            name: "Nigeria",
            code: "(+234)",
            country: 'NG'
        }
        // ,
        // {
        //     id: 2,
        //     flag: Images.usFlags,
        //     name: "United States of America",
        //     code: "(+1)"
        // }
    ]

    const handleSave = async () => {
        // setuserData(userData)
        const apiData = {
            "country": selectedCountry?.country,
            "id_number": bvn,
            "userId": userData?._id
        }
        console.log("apiData==>", apiData);
        Actions.showLoader(true)
        apiPost(endPoints.VERIFY_KYC, apiData).then((res) => {
            console.log("res ===>", res?.data, res?.status);
            if (res?.status === 200) {
                showSuccessToast("verified successfully", isDark)
                setuserData({
                    ...userData, kyc: {
                        idNumber: bvn
                    }
                })
                setLocalData(storageKeys.userData, {
                    ...userData, kyc: {
                        idNumber: bvn
                    }
                })
                setIsLoggedIn(true)
            } else if (res?.status === 409) {
                showSuccessToast(res?.data?.message, isDark)
                setIsLoggedIn(true)
            } else {
                showGeneralError()
            }
            Actions.showLoader(false)
        }).catch((error) => {
            Actions.showLoader(false)
            showGeneralError()
            console.log("error kyc", error);
        })

        // setIsLoggedIn(true)
        // navigation.navigate(AuthRouteStrings.APPROVAL_SCREEN, {
        //     data: { ...data, bvn: bvn }
        // })
    }

    const animationController = useRef(new Animated.Value(0)).current
    useBackButton(() => {
        setIsLoggedIn(true)
        return true
    })
    return (
        <WrapperContainer
            centerTitle="KYC"
            rightTitle="Skip"
            handlerRightViewPress={() => {
                // setuserData({ ...userData, data })
                // setIsLoggedIn(true)
                navigation.goBack()
            }}
            // showBackButton
            buttonTitle={"Upload"}
            handleButtonPress={handleSave}
            buttonActive={buttonActive}
            handleBack={() => {
                navigation.goBack()
            }}
            containerPadding={{ paddingTop: verticalScale(16) }}
        >
            <View style={{ gap: verticalScale(20) }}>
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
                                            maxLength={19}
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
            </View>

            <WhyBvnSheet
                isVisible={showSheet}
                setShowSheet={setShowSheet}
                appStyles={appStyles}
            />


        </WrapperContainer>
    )
}

export default KycScreen