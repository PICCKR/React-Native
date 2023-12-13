import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../../../context/AppContext'
import { verticalScale } from 'react-native-size-matters'

const PickerAccount = ({ route }) => {
    const data = route?.params?.data
    const { appStyles } = useContext(AppContext)
    const navigation = useNavigation()

    const [buttonActive, setButtonActive] = useState(false)

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

    const handleNext = () => {

    }
    return (
        <WrapperContainer
            centerTitle="Vehicle Verification"
            showBackButton
            buttonTitle={"Next"}
            handleButtonPress={handleNext}
            buttonActive={buttonActive}
            containerPadding={{}}
        >

            <ScrollView style={{ marginBottom: verticalScale(65) }}>
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
                    <Text style={{ fontSize: scale(20), top: verticalScale(6), color: uiColours.GRAY_TEXT }}>/</Text>
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
                    inputContainer={{ width: scale(70) }}
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
        </WrapperContainer>
    )
}

export default PickerAccount