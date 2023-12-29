import { View, Text, TouchableOpacity, LayoutAnimation, Animated } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { AppContext } from '../../../context/AppContext'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { toggleAnimation } from '../../../animations/toggleAnimation'
import { scale, verticalScale } from 'react-native-size-matters'
import InputText from '../../../components/InputText/InputText'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import DropDown from '../../../components/DropDown/DropDown'
import WhyBvnSheet from './WhyBvnSheet'
import { useNavigation } from '@react-navigation/native'
import { AuthRouteStrings } from '../../../utils/Constents/RouteStrings'
import useBackButton from '../../../customHooks/useBackButton'

const KycScreen = ({route}) => {
    const data = route?.params?.data
    const { appStyles, isDark } = useContext(AppContext)
    const navigation = useNavigation()

    const [selectedCountry, setSelctedCountry] = useState(null)
    const [buttonActive, setButtonActive] = useState(false)
    const [showSheet, setShowSheet] = useState(false)
    const [bvn, setBvn] = useState("")

    const countryData = [
        {
            id: 1,
            flag: Images.NigeriaFlags,
            name: "Nigeria",
            code: "(+234)"
        }
        ,
        {
            id: 2,
            flag: Images.usFlags,
            name: "United States of America",
            code: "(+1)"
        }
    ]

    const handleSave = () => {
        navigation.navigate(AuthRouteStrings.APPROVAL_SCREEN,{
            data:{...data, bvn:bvn}
        })
    }

    const animationController = useRef(new Animated.Value(0)).current
    useBackButton(()=>{
        navigation.goBack()
        return true
    })
    return (
        <WrapperContainer
            centerTitle="KYC"
            // rightTitle="Skip"
            showBackButton
            buttonTitle={"Upload"}
            handleButtonPress={handleSave}
            buttonActive={buttonActive}
            handleBack={()=>{
                navigation.goBack()
            }}
            containerPadding={{paddingTop:verticalScale(16)}}
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
                                                // Remove any non-digit characters
                                                const cleanedNumber = e.replace(/\D/g, '');

                                                // Define the format (adjust based on your needs)
                                                const formattedNumber = cleanedNumber.replace(/(\d{4})/g, '$1 ');

                                                // Remove trailing hyphen if present
                                                formattedNumber.replace(/-$/, '');

                                                setBvn(formattedNumber)
                                                if (e.length > 18) {
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