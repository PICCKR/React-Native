import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import InputText from '../InputText/InputText'
import styles from './Styles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
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
    setErrorMsg,
    errorMsg,
    // handleOnBlur = () => {},
    textChange = () => { },
}) => {
    // console.log("formData", formData);

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
                selectedCountry: selectedCountry,
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
                                    editable={item?.readOnly ? false : true}
                                    handleChange={(e, selectedCountry) => handleTextChange(e, item, selectedCountry)}
                                    isRequired={item?.isRequired}
                                    inPutStyles={{ marginTop: verticalScale(-5) }}
                                    inputContainer={{ width: screenSize.width - scale(32) }}
                                    handleBlur={() => handleOnBlur(item)}
                                    ErrorMsg={errorMsg ? errorMsg[item?.type] : item?.errorMsg}
                                    ShowError={ShowError[item?.type]}
                                    setFormData={setFormData}
                                    formData={formData}
                                    value={formData[item.type]}
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
                                    
                                    keyboardType={item?.keyboardType ? item?.keyboardType : "default"}
                                    inPutStyles={{ marginTop: verticalScale(-5) }}
                                    inputTitle={item?.title}
                                    inputContainer={{}}
                                    key={item?.id.toString()}
                                    placeholder={item?.placeHolder}
                                    value={formData[item.type]}
                                    handleChange={(e) => handleTextChange(e, item)}
                                    ShowError={ShowError[item?.type]}
                                    ErrorMsg={errorMsg ? errorMsg[item?.type] : item?.errorMsg}
                                    OnBlur={() => handleOnBlur(item)}
                                    secureTextEntry={item.type === "password" ? !showPassword : false}
                                    maxLength={item?.maxLenght}
                                    showRenderRightView={
                                        item.type === "password" ? true : false
                                    }
                                    editable={item?.editable ? item?.editable : true}
                                    renderRightView={() => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setShowPassword(!showPassword)
                                                }}
                                            >
                                                {showPassword ? <Images.eyeOpen height={moderateScale(25)} width={moderateScale(25)} /> :
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