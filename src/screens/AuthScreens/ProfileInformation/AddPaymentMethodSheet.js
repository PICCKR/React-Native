import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import { AppContext } from '../../../context/AppContext'
import SheetFooter from '../../../components/SheetFooter/SheetFooter'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import styles from './Styles'
import { commonStyles, screenSize } from '../../../utils/Styles/CommonStyles'
import { Images } from '../../../assets/images'
import Modal from 'react-native-modal'
import { uiColours } from '../../../utils/Styles/uiColors'
import Form from '../../../components/Form/Form'
import InputText from '../../../components/InputText/InputText'
import FullScreenModal from '../../../components/FullScreenModal/FullScreenModal'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_API_KEY } from '../../../configs/google_map_api_key'
import { RegEx } from '../../../utils/Constents/regulerexpressions'

const AddPaymentMethodSheet = ({
    isVisible,
    setShowSheet,
    handleAddCard,
    setPaymentData,
    paymentData,
}) => {
    const { appStyles, isDark } = useContext(AppContext)

    const [buttonActive, setButtonActive] = useState(false)

    const [showError, setShowError] = useState()

    const paymentTypeData = [
        {
            id: "1",
            type: "Debit Card",
        },
        {
            id: "2",
            type: "Credit Card",
        },
    ]

    const addData = [
        {
            id: 1,
            title: 'Card holder name',
            placeHolder: "Input your card holder name",
            type: "cardHolderName",
            isRequired: true,
            errorMsg: "Enter holder name number",
            validationString: RegEx.notEmpty

        },
        {
            id: 2,
            title: 'Card number',
            placeHolder: "Ex: 1234 5678 9012 3456",
            type: "cardNumber",
            maxLenght: 19,
            isRequired: true,
            errorMsg: "Enter valid Card number",
            validationString: RegEx.length19
        },

    ]

    const handleOnBlur = (item) => {
        const { type } = item
        if (paymentData[item.type] === "") {
            setShowError({
                ...showError,
                [type]: true
            })
        } else {
            if (type === "cardHolderName" && !RegEx.name__regEx.test(paymentData[item.type])) {
                setShowError({
                    ...showError,
                    [type]: true
                })
            } else if (type === "cardNumber" && paymentData[item.type].length < 16) {
                setShowError({
                    ...showError,
                    [type]: true
                })

            } else {
                setShowError({
                    ...showError,
                    [type]: false
                })
            }
        }

    }

    const handleTextChange = (cardNumber, item) => {
        const { type } = item
        if (type === "cardNumber") {
            // Remove any non-digit characters
            const cleanedNumber = cardNumber.replace(/\D/g, '');

            // Check if the cleaned number is empty or not a valid number
            if (!cleanedNumber || isNaN(cleanedNumber)) {
                return 'Invalid card number';
            }

            // Define the format (adjust based on your needs)
            const formattedNumber = cleanedNumber.replace(/(\d{4})/g, '$1-');

            // Remove trailing hyphen if present
            formattedNumber.replace(/-$/, '');
            setPaymentData({
                ...paymentData,
                cardNumber: formattedNumber
            })
        }
    }

    useEffect(() => {
        if (
            paymentData.cardType !== '' &&
            paymentData?.cardHolderName !== "" &&
            paymentData?.cardNumber.length > 18 &&
            paymentData.expiredDate.mm !== "" &&
            paymentData.expiredDate.yy !== "" &&
            paymentData?.cvv.length == 3
        ) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [paymentData]);

    return (
        <FullScreenModal
            isVisible={isVisible}
            buttonTitle={"Add Card"}
            leftTitle="Add payment method"
            leftViewStyles={{ width: "50%" }}
            centerViewStyles={{ width: 0 }}
            righyViewStyles={{ width: "22%" }}
            hasCloseIcon
            setShowModal={setShowSheet}
            buttonActive={buttonActive}
            // containerPadding={{he}}

            handleButtonPress={handleAddCard}
        >
            <ScrollView style={{ marginBottom: verticalScale(80), paddingTop:verticalScale(16) }}>
                <View style={{ paddingBottom: verticalScale(16) }}>
                    <Text style={appStyles.smallTextBlack}>
                        Card Type
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(10) }}>
                        {
                            paymentTypeData.map((item) => {
                                return (
                                    <TouchableOpacity key={item.id}
                                        style={{
                                            flexDirection: 'row',
                                            padding: moderateScale(9),
                                            gap: scale(5),
                                            borderWidth: moderateScale(1),
                                            borderRadius: moderateScale(6),
                                            borderColor: paymentData?.cardType === item.type ? uiColours.PRIMARY : uiColours.LIGHT_GRAY,
                                            backgroundColor: paymentData?.cardType === item.type ? "#F0E796" : uiColours.WHITE_TEXT,
                                        }}
                                        onPress={() => {
                                            setPaymentData({
                                                ...paymentData,
                                                cardType: item.type
                                            })
                                        }}
                                    >
                                        <Text>{item.type}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>

                <Form
                    data={addData}
                    formData={paymentData}
                    setFormData={setPaymentData}
                    setShowError={setShowError}
                    ShowError={showError}
                    handleOnBlur={handleOnBlur}
                    textChange={handleTextChange}

                />


                <Text style={[appStyles.smallTextBlack, { marginTop: verticalScale(16) }]}>
                    Expired date
                </Text>
                <View style={styles.paymentExpairy}>
                    <InputText
                        inputContainer={{ width: scale(70) }}
                        placeholder="mm"
                        maxLength={2}
                        textBox={{ paddingLeft: scale(7) }}
                        keyboardType={"number-pad"}
                        handleChange={(text) => {
                            setPaymentData(
                                {
                                    ...paymentData,
                                    expiredDate: {
                                        mm: text
                                    },
                                }
                            )
                        }}
                    />
                    <Text style={{ fontSize: scale(20), color: uiColours.GRAY_TEXT }}>/</Text>
                    <InputText
                        inputContainer={{ width: scale(70) }}
                        placeholder="yy"
                        maxLength={2}
                        textBox={{ paddingLeft: scale(15) }}
                        keyboardType={"number-pad"}
                        handleChange={(text) => {
                            setPaymentData(
                                {
                                    ...paymentData,
                                    expiredDate: {
                                        yy: text
                                    },
                                }
                            )
                        }}
                    />
                </View>


                <InputText
                    hasTitle
                    inputTitle="CVV"
                    inputContainer={{ width: scale(70), marginTop:verticalScale(10)}}
                    placeholder="123"
                    maxLength={3}
                    textBox={{ paddingLeft: scale(10) }}
                    keyboardType={"number-pad"}
                    handleChange={(text) => {
                        setPaymentData(
                            {
                                ...paymentData,
                                cvv: text
                            }
                        )
                    }}
                />


            </ScrollView>
        </FullScreenModal>
    )
}

export default AddPaymentMethodSheet