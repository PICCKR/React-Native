import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from './Styles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import PayWithFlutterwave from 'flutterwave-react-native'
import { AppContext } from '../../../context/AppContext'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import InputText from '../../../components/InputText/InputText'
import { uiColours } from '../../../utils/Styles/uiColors'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import DropDown from '../../../components/DropDown/DropDown'
import axios from 'axios'
import { apiGet } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'

const ConfirmPaymentPopUp = ({
    isVisible,
    setShowSheet,
    appStyles,
    sheetTitle,
    withdrawData,
    handleWithdraw
}) => {

    // console.log("withDrawData", withdrawData);

    return (
        <BottomSheet
            isVisible={isVisible}
            title={sheetTitle}
            buttonActive
            hasCloseIcon
            setShowModal={setShowSheet}
            handleButtonPress={handleWithdraw}
            handleRightClick={() => {
                setShowSheet(false)
            }}
            onBackdropPress={() => {
                setShowSheet(false)
            }}
            showFooterButton
            buttonTitle={"confirm withdraw"}
        >
            <ScrollView style={{}}>
                <View style={{ gap: verticalScale(10) }}>
                    <Text style={appStyles?.smallTextBlackBold}>
                        Bank details
                    </Text>
                    <Text style={appStyles.smallTextGray}>
                        {withdrawData?.account_bank?.bankName}
                    </Text>

                    <Text style={appStyles.smallTextGray}>
                        <Text style={appStyles.smallTextGrayBold}> Account Number : </Text> {withdrawData?.account_bank?.accountNumber}
                    </Text>
                    <Text style={appStyles.smallTextGray}>
                        <Text style={appStyles.smallTextGrayBold}> Bank Code :</Text>
                        {withdrawData?.account_bank?.bankCode}
                    </Text>

                </View>

                <View style={{ marginTop: verticalScale(16) }}>
                    <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                        <Text style={appStyles.smallTextGray}>
                            Total Payment
                        </Text>
                        <Text style={appStyles.smallTextPrimary}>
                            ₦{withdrawData?.amount}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </BottomSheet>
    )
}

export default ConfirmPaymentPopUp