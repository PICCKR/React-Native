import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import InputText from '../InputText/InputText'
import styles from './Styles'
import { moderateScale, scale } from 'react-native-size-matters'
import MobileNumberInput from '../MobileNumberInput/MobileNumberInput'
import { screenSize } from '../../utils/Styles/CommonStyles'
import { Images } from '../../assets/images'

const Form = ({
    formData,
    setFormData,
    data,
    ShowError = {},
    setShowError,
    style,
    // handleOnBlur = () => {},
    textChange = () => { }
}) => {

    const [showPassword, setShowPassword] = useState(false)

    const handleTextChange = (e, item, selectedCountry) => {
        const { type, validationString, isRequired } = item
        setFormData(prevState => ({
            ...prevState,
            [type]: e
        }));
        if (selectedCountry) {
            setFormData({
                ...formData,
                selectedCountry: {
                    code: selectedCountry?.code,
                    name: selectedCountry?.name
                },
                phoneNumber: e

            });
        }
        textChange(e, item, selectedCountry)
    }

    const handleOnBlur = (item) => {

        const { type, validationString, isRequired, errorMsg } = item
        // console.log("validationString", validationString, type, errorMsg);
        // return
        if (!validationString?.test(formData[type])) {
            setShowError((prevState) => ({
                ...prevState,
                [type]: true
            }))

        } else {
            setShowError((prevState) => ({
                ...prevState,
                [type]: false
            }))
        }
    }


    return (
        <View style={[styles.inputConatiner, style]}>
            {
                data.map((item, index) => {
                    return (
                        <View key={index.toString()} >
                            {item.type === "phoneNumber" ?

                                <MobileNumberInput
                                    handleChange={(e, selectedCountry) => handleTextChange(e, item, selectedCountry)}
                                    isRequired={item?.isRequired}
                                    inputContainer={{ width: screenSize.width - scale(32) }}
                                    handleBlur={() => handleOnBlur(item)}
                                    ErrorMsg={item?.errorMsg}
                                    ShowError={ShowError[item?.type]}
                                    setFormData={setFormData}
                                    formData={formData}
                                />
                                :

                                <InputText
                                    isRequired={item?.isRequired}
                                    hasTitle
                                    onPressIn={() => {
                                        setShowError(prevState => ({
                                            ...prevState,
                                            [item?.type]: false
                                        }));
                                    }}
                                    inputTitle={item?.title}
                                    inputContainer={{}}
                                    key={item?.id.toString()}
                                    placeholder={item?.placeHolder}
                                    value={formData[item.type]}
                                    handleChange={(e) => handleTextChange(e, item)}
                                    ShowError={ShowError[item?.type]}
                                    ErrorMsg={item?.errorMsg}
                                    OnBlur={() => handleOnBlur(item)}
                                    secureTextEntry={item.type === "password" ? !showPassword : false}
                                    maxLength={item?.maxLenght}
                                    showRenderRightView={
                                        item.type === "password" ? true : false
                                    }
                                    renderRightView={() => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setShowPassword(!showPassword)
                                                }}
                                            >
                                                {!showPassword ? <Images.eyeOpen height={moderateScale(25)} width={moderateScale(25)} /> :
                                                    <Images.eyeClose height={moderateScale(25)} width={moderateScale(25)} />
                                                }
                                            </TouchableOpacity>
                                        )
                                    }}

                                />
                            }
                        </View>
                    )
                })
            }

        </View>
    )
}

export default Form