import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import styles from './Styles'
import { Images } from '../../../assets/images'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { moderateScale } from 'react-native-size-matters'
import EditAction from './EditAction'
import EmailSheet from './EmailSheet'
import ShowAddressSheet from './ShowAddressSheet'
import AddAddressSheet from './AddAddressSheet'
import { showToast } from '../../../components/tostConfig/tostConfig'
import { tostMessagetypes } from '../../../utils/Constents/constentStrings'
import ShowPaymentSheet from './ShowPaymentSheet'
import AddPaymentMethodSheet from './AddPaymentMethodSheet'
import { AuthRouteStrings } from '../../../utils/Constents/RouteStrings'
import ChooseMediaTypeSheet from '../../../components/ChooseMediaTypeSheet/ChooseMediaTypeSheet'
import { chooseMedia, openCamara } from '../../../helper/imagePickerFunctions'
import ProfileView from '../../../components/PrifileView/ProfileView'

const ProfileInformation = ({ route }) => {
    const data = route?.params?.data

    const { appStyles, isDark } = useContext(AppContext)

    const navigation = useNavigation()
    const [buttonActive, setButtonActive] = useState(false)
    const [showSheet, setShowSheet] = useState({
        email: false,
        showAddress: false,
        addAddress: false,
        mediaType: false,
    })

    const [profileInformation, setProfileInformation] = useState({
        profileImg: null,
        email: "",
        address: [],
        paymentMethod: []
    })
    const [addressData, setAddresData] = useState({
        id: "",
        addressType: "",
        buildingName: "",
        homeNumber: "",
        location: "",
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


    const handleAddAddress = () => {
        setShowSheet({
            addAddress: false
        })
        const newAddress = {
            id: profileInformation.address.length + 1,
            addressType: addressData?.addressType,
            buildingName: addressData?.buildingName,
            homeNumber: addressData?.homeNumber,
            location: addressData?.location,
        }

        // console.log("[...profileInformation.address, ...newAddress]", [...profileInformation.address, newAddress]);
        setProfileInformation({
            ...profileInformation,
            address: [...profileInformation.address, newAddress]
        })
        setAddresData({
            id: "",
            addressType: "",
            buildingName: "",
            homeNumber: "",
            location: "",
        })
        const toastMsgConfg = {
            isDark: isDark,
            msg: "You have successfully added an address"
        }
        showToast(toastMsgConfg, tostMessagetypes.SUCCESS, isDark)
    }

    const handleEditAddress = async () => {
        setShowSheet({
            addAddress: false
        })

        var addresss = profileInformation.address

        const newAddress = await addresss.map((item) => {
            // console.log(item.id, addressData.id);
            if (item.id === addressData.id) {
                return addressData
            } else {
                return item
            }
        })

        setProfileInformation({
            ...profileInformation,
            address: newAddress
        })
        setAddresData({
            id: "",
            addressType: "",
            buildingName: "",
            homeNumber: "",
            location: "",
        })
        const toastMsgConfg = {
            isDark: isDark,
            msg: "You have successfully edited an address"
        }
        showToast(toastMsgConfg, tostMessagetypes.SUCCESS, isDark)
    }

    const handleAddPayment = () => {

        // console.log("sdjsgd");

        setShowSheet({
            addPayment: false,
        })

        setProfileInformation({
            ...profileInformation,
            paymentMethod: [...profileInformation?.paymentMethod, paymentData]

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

    const handleSave = () => {
        // console.log("...data, profileInformation", {...data, ...profileInformation});
        // return
        navigation.navigate(AuthRouteStrings.KYC_SCREEN, {
            data: { ...data, ...profileInformation }
        })
    }


    useEffect(() => {
        if (
            profileInformation?.email !== "" &&
            profileInformation?.address.length > 0
        ) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [profileInformation]);

    return (
        <WrapperContainer
            centerTitle="Profile information"
            rightTitle="Skip"
            showBackButton
            buttonTitle={"Save"}
            handleButtonPress={handleSave}
            buttonActive={buttonActive}
            containerPadding={{ paddingHorizontal: 0 }}
        >

            <ProfileView
                showEdit
                profileImg={profileInformation.profileImg}
                userData={data}
                handleEdit={() => {
                    setShowSheet({
                        ...showSheet,
                        mediaType: true
                    })
                }}
            />

            <View style={styles.contentView}>
                <Text style={appStyles.mediumTextBlackBold}>
                    Other Information
                </Text>

                <EditAction
                    appStyles={appStyles}
                    handlePress={() => setShowSheet({
                        email: true
                    })}
                    title="Email Address"
                />
                <EditAction
                    appStyles={appStyles}
                    handlePress={() => setShowSheet({
                        showAddress: true
                    })}
                    addressVal={profileInformation.address?.length !== 0 && `${profileInformation.address?.length} Address`}
                    title="Address"
                />
                {/* <EditAction
                    appStyles={appStyles}
                    title="Payment Method"
                    addressVal={ profileInformation.paymentMethod?.length !== 0 && `${profileInformation.paymentMethod?.length} Card`}
                    handlePress={() => setShowSheet({
                        showPayment: true
                    })}
                /> */}
            </View>

            <EmailSheet
                isVisible={showSheet.email}
                setShowSheet={setShowSheet}
                setProfileInformation={setProfileInformation}
                profileInformation={profileInformation}
                handleAddEmail={() => {
                    const toastMsgConfg = {
                        isDark: isDark,
                        msg: "You have successfully added your email"
                    }
                    showToast(toastMsgConfg, tostMessagetypes.SUCCESS, isDark)
                }}
            />

            <ShowAddressSheet
                isVisible={showSheet.showAddress}
                setShowSheet={setShowSheet}
                profileInformation={profileInformation}
                setAction={setAction}
                handleAddAddress={() => {
                    setAction("add")
                    setAddresData({
                        id: "",
                        addressType: "",
                        buildingName: "",
                        homeNumber: "",
                        location: "",
                    })
                    setShowSheet({
                        addAddress: true,
                        showAddress: false
                    })
                }}

                handleAddressEdit={(address) => {
                    setAction("edit")
                    setShowSheet({
                        addAddress: true,
                        showAddress: false
                    })
                    setAddresData({
                        id: address?.id,
                        addressType: address?.addressType,
                        buildingName: address?.buildingName,
                        homeNumber: address?.homeNumber,
                        location: address?.location,
                    })
                }}
            />

            <AddAddressSheet
                isVisible={showSheet.addAddress}
                setShowSheet={setShowSheet}
                profileInformation={profileInformation}
                setProfileInformation={setProfileInformation}
                handleAddAddress={handleAddAddress}
                addressData={addressData}
                setAddresData={setAddresData}
                action={action}
                handleEditAddress={handleEditAddress}
            />

            <ChooseMediaTypeSheet
                isVisible={showSheet.mediaType}
                setShowMode={setShowSheet}
                openCamara={async () => {
                    const res = await openCamara()
                    console.log("source", res?.assets[0]?.uri);
                    setProfileInformation({
                        ...profileInformation,
                        profileImg: res?.assets[0]?.uri
                    })
                    setShowSheet({
                        ...showSheet,
                        mediaType: false
                    })
                }}
                chooseMedia={async () => {
                    const res = await chooseMedia()
                    setProfileInformation({
                        ...profileInformation,
                        profileImg: res?.assets[0]?.uri
                    })
                    setShowSheet({
                        ...showSheet,
                        mediaType: false
                    })
                }}
            />

            {/* i have kept this for future refrence */}
            {/* <ShowPaymentSheet
                isVisible={showSheet.showPayment}
                setShowSheet={setShowSheet}
                profileInformation={profileInformation}
                setAction={setAction}
                handleAddPayment={() => {
                    setAction("add")
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
                        addPayment: true,
                        showPayment: false
                    })
                }}
            /> */}

            {/* <AddPaymentMethodSheet
                isVisible={showSheet.addPayment}
                setShowSheet={setShowSheet}
                profileInformation={profileInformation}
                setProfileInformation={setProfileInformation}
                handleAddCard={handleAddPayment}
                paymentData={paymentData}
                setPaymentData={setPaymentData}
                action={action}
            /> */}

        </WrapperContainer>
    )
}

export default ProfileInformation