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
    country
}) => {

    const { appStyles } = useContext(AppContext)
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

        const formattedNumber = `${cleanedNumber.slice(0, 3)} ${cleanedNumber.slice(3, 6)} ${cleanedNumber.slice(6)}`
        setMobileNumber(formattedNumber);
        handleChange(formattedNumber, selectedCountry)
    }

    const renderFlag = () => {
        switch (selectedCountry?.id) {
            case 1:
                return <Images.NigeriaFlags height={moderateScale(20)} width={moderateScale(35)} />
                break;
            case 2:
                return <Images.usFlags height={moderateScale(20)} width={moderateScale(35)} />
                break;
            case 3:
                return <Images.indianFlag height={moderateScale(20)} width={moderateScale(35)} />
                break;
            case 4:
                return <Images.pakFlag height={moderateScale(20)} width={moderateScale(35)} />
                break;
            case 5:
                return <Images.indonatiaFlag height={moderateScale(20)} width={moderateScale(35)} />
                break;
            case 6:
                return <Images.ukFlag height={moderateScale(20)} width={moderateScale(35)} />
                break;
            case 7:
                return <Images.canadaFlag height={moderateScale(20)} width={moderateScale(35)} />
                break;

            default:
                return <Images.canadaFlag height={moderateScale(20)} width={moderateScale(35)} />
                break;
        }

    }

    return (
        <>
            <InputText
                isRequired={isRequired}
                inputContainer={inputContainer}
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
                keyboardType="phone-pad"
                renderLeftView={() => {
                    return (
                        <TouchableOpacity
                            onPress={() => setShowSheet(true)}
                            style={Styles.countryView}
                        >
                            <View style={Styles.flagView}>
                                {selectedCountry?.flag ? <selectedCountry.flag height={moderateScale(20)} width={moderateScale(35)} /> :
                                    renderFlag()
                                }
                            </View>

                            <Text style={appStyles.smallTextBlack}>{selectedCountry?.code}</Text>
                            <Images.downArrow />
                        </TouchableOpacity>
                    )
                }}
            />

            <BottomSheet
                isVisible={showSheet}
                hasCloseIcon
                title="Choose Regi(onal Number"
                onBackdropPress={() => {
                    setShowSheet(false)
                }}
                handleRightClick={() => {
                    setShowSheet(false)
                }}
            >
                <View style={{ gap: verticalScale(16) }}>
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
                                            <Flag height={moderateScale(20)} width={moderateScale(35)} />
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