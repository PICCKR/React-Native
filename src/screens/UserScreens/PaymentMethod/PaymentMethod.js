import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import styles from './Styles';
import { Images } from '../../../assets/images';
import { commonStyles } from '../../../utils/Styles/CommonStyles';
import TopUpSheet from '../UserHomeScreen/TopUpSheet';
import AddTopUp from '../UserHomeScreen/AddTopUp';
import OtpPopUp from '../UserHomeScreen/OtpPopUp';
import { showToast } from '../../../components/tostConfig/tostConfig';
import { tostMessagetypes } from '../../../utils/Constents/constentStrings';
import ShowPaymentSheet from '../../AuthScreens/ProfileInformation/ShowPaymentSheet';
import AddPaymentMethodSheet from '../../AuthScreens/ProfileInformation/AddPaymentMethodSheet';
import ConfirmationSheet from '../../../components/ConfirmationSheet/ConfirmationSheet';

const PaymentMethod = () => {
    const { appStyles, userData, isDark, setIsDark, setuserData } = useContext(AppContext)
    // ("userData", userData);
    const navigation = useNavigation()
    const [showSheet, setShowSheet] = useState({
        showPayment: false,
        addPayment: false,
        Otp: false,
        addCard: false,
        deleteCard: false
    })
    const [topUpAmount, setTopUpAmount] = useState({
        price: "0"
    })
    const [paymentData, setPaymentData] = useState({
        id: "",
        cardType: "",
        cardHolderName: "",
        cardNumber: "",
        expiredDate: {
            mm: "",
            yy: ""
        },
        cvv: ""
    })
    const [action, setAction] = useState("add")
    const [selectedCard, setSelectedCrad] = useState(null)

    const [payments, setPayment] = useState(userData?.paymentMethod)

    const handleAddPayment = () => {

        const newPayment = {
            ...paymentData, id: userData?.paymentMethod.length + 1
        }
        setShowSheet({
            addCard: false,
        })
        // console.log("[...userData?.paymentMethod, paymentData]", [...userData?.paymentMethod, newPayment]);
        setuserData({
            ...userData,
            paymentMethod: [...userData?.paymentMethod, newPayment]
        })

        setPaymentData({
            ...paymentData,
            id: "",
            cardType: "",
            cardHolderName: "",
            cardNumber: "",
            expiredDate: {
                mm: "",
                yy: ""
            },
            cvv: ""
        })

        const toastMsgConfg = {
            isDark: isDark,
            msg: "You have successfully added an card details"
        }

        showToast(toastMsgConfg, tostMessagetypes.SUCCESS, isDark)
    }
    const handleDelete = async () => {
        setShowSheet({
            ...showSheet,
            deleteCard: false
        })
        const newPayment = await userData?.paymentMethod.filter((item) => {
            console.log("item?.id", item?.id, selectedCard);
            if (item?.id != selectedCard?.id) {
                return item
            }
        })
        console.log("newPayment", newPayment);

        setuserData({
            ...userData,
            paymentMethod: newPayment
        })
    }
    return (
        <WrapperContainer
            centerTitle="Payment Method"
            showFooterButton={false}
            showBackButton
            containerPadding={{ paddingHorizontal: 0 }}
        >
            <View style={{}}>
                {userData?.paymentMethod?.length === 0 ?
                    <Text style={[appStyles.smallTextGray, { width: '60%', textAlign: "center", alignSelf: 'center', paddingVertical: verticalScale(30) }]}>
                        You don’t have saved card.
                        Please add card first
                    </Text> :

                    <View style={{}}>

                        <View style={styles.walletCard}>
                            <Text style={appStyles.smallTextBlack}>
                                E-Wallet
                            </Text>
                            <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                                <View style={commonStyles.flexRowAlnCtr}>
                                    <Image source={Images.home} style={{
                                        height: moderateScale(20),
                                        width: moderateScale(20),
                                    }} />

                                    <View style={{ marginLeft: scale(10) }}>
                                        <Text style={appStyles.smallTextGray}>
                                            PicckRPay
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            ${topUpAmount.price}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={{ paddingVertical: verticalScale(5) }}
                                    onPress={() => {
                                        setShowSheet({
                                            ...showSheet,
                                            showPayment: true
                                        })
                                    }}
                                >
                                    <Text style={appStyles.smallTextPrimaryBold}>Top up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.savedCrad}>
                            <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                                <Text style={appStyles.smallTextBlack}>
                                    Saved card
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setPaymentData({
                                            id: "",
                                            cardType: "",
                                            cardHolderName: "",
                                            cardNumber: "",
                                            expiredDate: {
                                                mm: "",
                                                yy: ""
                                            },
                                            cvv: ""
                                        })
                                        setShowSheet({
                                            ...showSheet,
                                            addCard: true
                                        })
                                    }}
                                    style={{ paddingVertical: verticalScale(5) }}
                                >
                                    <Text style={appStyles.smallTextPrimaryBold}>
                                        Add card
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {userData?.paymentMethod?.map((item, index) => {
                                return (
                                    <View key={index.toString()} style={[commonStyles.flexRowAlnCtrJutySpaceBetween, styles.paymentCard]}>
                                        <View style={{ flexDirection: "row", alignItems: 'center', maxWidth: "90%" }}>
                                            <Images.cardIcon height={moderateScale(20)}
                                                width={moderateScale(20)} />

                                            <View style={{ marginLeft: scale(10) }}>
                                                <Text style={appStyles.smallTextBlack}>
                                                    American Express
                                                </Text>
                                                <Text style={appStyles.smallTextPrimary}>
                                                    {item?.cardType} {`(${item?.cardNumber?.slice(-4)})`}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.addresEditIcon}
                                            onPress={() => {
                                                setSelectedCrad(item)
                                                setShowSheet({
                                                    ...showSheet,
                                                    deleteCard: true
                                                })
                                            }}

                                        >
                                            <Images.delete />
                                        </TouchableOpacity>

                                    </View>
                                )
                            })}
                        </View>

                    </View>
                }
            </View>

            {/* sheets */}
            <TopUpSheet
                isVisible={showSheet.showPayment}
                handleCardClick={() => {
                    setShowSheet({
                        ...showSheet,
                        showPayment: false,
                        addPayment: true
                    })
                }}
            />

            <AddTopUp
                isVisible={showSheet.addPayment}
                appStyles={appStyles}
                setShowSheet={setShowSheet}
                topUpAmount={topUpAmount}
                setTopUpAmount={setTopUpAmount}
                handleAddTopUp={() => {
                    setShowSheet({
                        ...showSheet,
                        addPayment: false,
                        Otp: true
                    })
                }}

            />

            <OtpPopUp
                isVisible={showSheet.Otp}
                appStyles={appStyles}
                setShowSheet={setShowSheet}
                handleVerifyOtp={() => {
                    setShowSheet({
                        ...showSheet,
                        Otp: false
                    })
                    const toastMsgConfg = {
                        isDark: isDark,
                        msg: "You successfully top up your wallet"
                    }
                    showToast(toastMsgConfg, tostMessagetypes.SUCCESS, isDark)
                }}
            />

            <AddPaymentMethodSheet
                isVisible={showSheet.addCard}
                setShowSheet={setShowSheet}
                handleAddCard={handleAddPayment}
                paymentData={paymentData}
                setPaymentData={setPaymentData}
                action={action}
            />

            <ConfirmationSheet
                isVisible={showSheet.deleteCard}
                renderIcon={() => {
                    return (
                        <Images.delete height={moderateScale(35)} width={moderateScale(35)} />
                    )
                }}
                title="Are you sure you want to delete this card?"
                buttonTitle="Delete card"
                handleButtonClick={handleDelete}
            />
        </WrapperContainer>
    )
}

export default PaymentMethod