import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from './Styles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import InputText from '../../../components/InputText/InputText'
import FullScreenModal from '../../../components/FullScreenModal/FullScreenModal'
import { Images } from '../../../assets/images'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { uiColours } from '../../../utils/Styles/uiColors'

const AddTopUp = ({
    isVisible,
    setShowSheet,
    appStyles,
    handleAddTopUp = () =>{},
    topUpAmount,
    setTopUpAmount 
}) => {
    const [buttonActive, setButtonActive] = useState(false)

    const priceData = [
        {
            id: "1",
            price: "10"
        },
        {
            id: "2",
            price: "35"
        },
        {
            id: "3",
            price: "50"
        },
        {
            id: "4",
            price: "75"
        },
        {
            id: "5",
            price: "100"
        },
        {
            id: "6",
            price: "500"
        }
    ]
    return (
        <FullScreenModal
            isVisible={isVisible}
            buttonTitle={"Top Up"}
            leftTitle="Top Up"
            hasCloseIcon
            setShowModal={setShowSheet}
            buttonActive={buttonActive}
            handleButtonPress={handleAddTopUp}
        >
            <ScrollView style={{paddingTop:verticalScale(16)}}>
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent:'space-between' }}>
                    {
                        priceData.map((item) => {
                            const selected = topUpAmount?.id === item.id
                            return (
                                <TouchableOpacity
                                    style={[styles.priceCard, {
                                        borderColor: selected ? uiColours.PRIMARY : uiColours.LIGHT_GRAY
                                    }]}
                                    onPress={() => {
                                        setButtonActive(true)
                                        setTopUpAmount(item)
                                    }}
                                >
                                    <Text style={[appStyles?.largeTextGray, {
                                        color: selected ? uiColours.PRIMARY : uiColours.GRAY_TEXT
                                    }]}>
                                        ${item.price}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                <InputText
                    hasTitle
                    inputTitle="Enter amount"
                    handleChange={(e) => {
                        if (e > 0) {
                            setButtonActive(true)
                        }
                        setTopUpAmount({
                            ...topUpAmount,
                            price: `${e}`
                        })
                    }}
                    placeholder={topUpAmount?.price}
                    value={topUpAmount?.price}
                    inputContainer={{ marginVertical: verticalScale(10) }}
                />

                <Text style={[appStyles?.smallTextBlack, { marginVertical: verticalScale(10) }]}>Payment details</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(8) }}>
                    <Images.cardIcon height={moderateScale(13)} width={moderateScale(20)} />
                    <View>
                        <Text style={appStyles?.smallTextBlack}>
                            American Express
                        </Text>
                        <Text style={appStyles.smallTextGray}>
                            Credit card (*1234)
                        </Text>
                    </View>
                </View>

                <View style={{ marginTop: verticalScale(20) }}>
                    <Text style={appStyles?.smallTextBlack}>
                        Total
                    </Text>
                    <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                        <Text style={appStyles.smallTextGray}>
                            Total Payment
                        </Text>
                        <Text style={appStyles.smallTextPrimary}>
                            ${topUpAmount?.price}
                        </Text>
                    </View>

                </View>

            </ScrollView>
        </FullScreenModal>
    )
}

export default AddTopUp