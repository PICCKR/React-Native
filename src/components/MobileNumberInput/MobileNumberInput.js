import { View, Text, TouchableOpacity, TextInput, Image, LayoutAnimation } from 'react-native'
import React, { useContext, useState } from 'react'
import Styles from "./Styles"
import InputText from '../InputText/InputText'
import { commonStyles, screenSize } from '../../utils/Styles/CommonStyles'
import { Images } from '../../assets/images'
import { AppContext } from '../../context/AppContext'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import BottomSheet from '../BottomSheet/BottomSheet'
import RadioButton from '../RadioButton/RadioButton'
import { toggleAnimation } from '../../animations/toggleAnimation'
import { uiColours } from '../../utils/Styles/uiColors'

const MobileNumberInput = ({
    handleChange,
    inputContainer,
    isRequired,
    handleBlur,
    ErrorMsg,
    onPressIn,
    ShowError,
    setFormData,
    formData,
    value,
    country,
    inPutStyles,
    editable = true
}) => {

    const { appStyles, isDark } = useContext(AppContext)
    const [showSheet, setShowSheet] = useState(false)
    const [mobileNumber, setMobileNumber] = useState("")
    const [selectedCountry, setSelctedCountry] = useState(
        formData?.selectedCountry ? formData?.selectedCountry :
            {
                id: 1,
                flag: Images.NigeriaFlags,
                name: "Nigeria",
                code: "(+234)"
            })

    const countryData = [
        {
            id: 1,
            flag: Images.NigeriaFlags,
            name: "Nigeria",
            code: "(+234)"
        },
        {
            id: 2,
            flag: Images.usFlags,
            name: "United States of America",
            code: "(+1)"
        },
        {
            id: 3,
            flag: Images.indianFlag,
            name: "India",
            code: "(+91)"
        },
        {
            id: 4,
            flag: Images.pakFlag,
            name: "Pakistan",
            code: "(+92)"
        },
        {
            id: 5,
            flag: Images.indonatiaFlag,
            name: "Indonesia",
            code: "(+62)"
        },
        {
            id: 6,
            flag: Images.ukFlag,
            name: "United Kingdom",
            code: "(+44)"
        },
        {
            id: 7,
            flag: Images.canadaFlag,
            name: "Canada",
            code: "(+1)"
        }
    ]

    const handleMobileNumberChange = (phoneNumber) => {
        const cleanedNumber = phoneNumber.replace(/\D/g, '');
        // console.log('Cleaned Number:', cleanedNumber);

        // const formattedNumber = `${cleanedNumber.slice(0, 3)} ${cleanedNumber.slice(3, 6)} ${cleanedNumber.slice(6)}`
        setMobileNumber(cleanedNumber);
        handleChange(cleanedNumber, selectedCountry)
    }

    const renderFlag = () => {
        // console.log("selectedCountry===>", selectedCountry);
        switch (selectedCountry.code) {
            case "+234":
                return <Image source={Images.NigeriaFlags} style={{ height: moderateScale(20), width: moderateScale(35) }} />
                break;
            case "+1":
                return <Image source={Images.usFlags} style={{ height: moderateScale(20), width: moderateScale(35) }} />
                break;
            case "+91":
                return <Image source={Images.indianFlag} style={{ height: moderateScale(20), width: moderateScale(35) }} />
                break;
            case "+92":
                return <Image source={Images.pakFlag} style={{ height: moderateScale(20), width: moderateScale(35) }} />
                break;
            case "+62":
                return <Image source={Images.indonatiaFlag} style={{ height: moderateScale(20), width: moderateScale(35) }} />
                break;
            case "+44":
                return <Image source={Images.ukFlag} style={{ height: moderateScale(20), width: moderateScale(35) }} />
                break;
            case "+1":
                return <Image source={Images.canadaFlag} style={{ height: moderateScale(20), width: moderateScale(35) }} />
                break;

            default:
                return <Image source={Images.NigeriaFlags} style={{ height: moderateScale(20), width: moderateScale(35) }} />
                break;
        }

    }

    return (
        <>
            <InputText
                isRequired={isRequired}
                inputContainer={[inputContainer]}
                inPutStyles={[{
                    paddingRight: scale(120),
                    backgroundColor: (editable && !isDark) ? uiColours.WHITE_TEXT : (editable && isDark) ? uiColours.DARK_BG : uiColours.LIGHT_GRAY,
                }, inPutStyles]}
                textBox={{ color: (editable && !isDark) ? uiColours.BLACK_TEXT : (editable && isDark) ? uiColours.GRAY_TEXT : uiColours.GRAY_TEXT }}
                hasTitle
                inputTitle="Phone Number"
                handleChange={handleMobileNumberChange}
                placeholder="Input phone number"
                value={value}
                OnBlur={handleBlur}
                ShowError={ShowError}
                ErrorMsg={ErrorMsg}
                onPressIn={onPressIn}
                hasLeftView
                editable={editable}
                keyboardType="phone-pad"
                renderLeftView={() => {
                    return (
                        <TouchableOpacity
                            disabled={!editable}
                            onPress={() => {
                                setShowSheet(true)
                            }}
                            style={[Styles.countryView, {
                                borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY,

                            }]}
                        >
                            <View style={Styles.flagView}>
                                {selectedCountry?.flag ? <Image source={selectedCountry?.flag} style={{ height: moderateScale(20), width: moderateScale(35) }} /> :
                                    renderFlag()
                                }
                            </View>

                            <Text style={[appStyles.smallTextBlack, {
                                color: (editable && !isDark) ? uiColours.BLACK_TEXT : (editable && isDark) ? uiColours.GRAY_TEXT : uiColours.GRAY_TEXT
                            }]}>{selectedCountry?.code}</Text>
                            {!isDark ? <Images.downArrow /> : <Images.downArrowWhite />}
                        </TouchableOpacity>
                    )
                }}
            />

            <BottomSheet
                isVisible={showSheet}
                hasCloseIcon
                title="Choose Regional Number"
                onBackdropPress={() => {
                    setShowSheet(false)
                }}
                handleRightClick={() => {
                    setShowSheet(false)
                }}
            >
                <View style={{ gap: verticalScale(16), paddingBottom: verticalScale(16) }}>
                    {
                        countryData.map((item) => {
                            const Flag = item.flag
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() => {
                                        LayoutAnimation.configureNext(toggleAnimation)
                                        setFormData({
                                            ...formData,
                                            selectedCountry: item
                                        });
                                        setSelctedCountry(item)
                                        setShowSheet(false)
                                    }}
                                    key={item.id.toString()}
                                    style={Styles.listItems}
                                >
                                    <View
                                        style={{ flexDirection: 'row', alignItems: 'center', gap: scale(10) }}
                                    >
                                        <View style={Styles.flagView}>
                                            <Image source={Flag} style={{ height: moderateScale(20), width: moderateScale(35) }} />
                                            {/* <Flag height={moderateScale(20)} width={moderateScale(35)} /> */}
                                        </View>
                                        <Text style={appStyles.smallTextBlack}>{item.name} {item.code}</Text>
                                    </View>

                                    <View
                                        style={Styles.uncheck}
                                    >
                                        {selectedCountry.id === item.id && <View style={Styles.check}>

                                        </View>}
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

            </BottomSheet>
        </>

    )
}

export default MobileNumberInput