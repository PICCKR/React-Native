import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import styles from './Styles'
import EditAction from './EditAction'
import EmailSheet from './EmailSheet'
import ShowAddressSheet from './ShowAddressSheet'
import AddAddressSheet from './AddAddressSheet'
import { showToast } from '../../../components/tostConfig/tostConfig'
import { tostMessagetypes } from '../../../utils/Constents/constentStrings'
import { AuthRouteStrings } from '../../../utils/Constents/RouteStrings'
import ChooseMediaTypeSheet from '../../../components/ChooseMediaTypeSheet/ChooseMediaTypeSheet'
import { chooseMedia, openCamara } from '../../../helper/imagePickerFunctions'
import ProfileView from '../../../components/PrifileView/ProfileView'
import useBackButton from '../../../customHooks/useBackButton'
import { apiPost } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import Actions from '../../../redux/Actions'
import { showGeneralError } from '../../../helper/showGeneralError'
import { setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'
import { showErrorToast } from '../../../helper/showErrorToast'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import { decodeToken } from '../../../helper/decodeToken'
import axios from 'axios'
import { deleteUser } from '@aws-amplify/auth'
// import jwt from 'jsonwebtoken';

const ProfileInformation = ({ route }) => {
    const data = route?.params?.data
    const { appStyles, isDark, userData, setuserData, setIsLoggedIn } = useContext(AppContext)
    // console.log("data ====>", data);
    const navigation = useNavigation()
    const [buttonActive, setButtonActive] = useState(false)
    const [showSheet, setShowSheet] = useState({
        email: false,
        showAddress: false,
        addAddress: false,
        mediaType: false,
        setLocation: false
    })

    const [profileInformation, setProfileInformation] = useState({
        profileImg: null,
        email: "",
        address: [],
    })
    const [addressData, setAddresData] = useState({
        title: "",
        coordinates: [],
        type: "",
        street_address: "",
        favorite: false,
        house_number: "",
        building_name: ""
    })

    const [action, setAction] = useState("add")

    const handleAddAddress = () => {
        setShowSheet({
            addAddress: false
        })
        setProfileInformation({
            ...profileInformation,
            address: [...profileInformation.address, addressData]
        })
        setAddresData({
            title: "",
            coordinates: [],
            type: "",
            street_address: "",
            favorite: false,
            house_number: "",
            building_name: ""
        })
        showSuccessToast("You have successfully added an address", isDark)
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
            title: "",
            coordinates: [],
            type: "",
            street_address: "",
            favorite: false,
            house_number: "",
            building_name: ""
        })
        showSuccessToast("You have successfully edited an address", isDark)
    }

    const handleSave = async (from) => {
        var formData = new FormData();
        formData.append("firstName", data?.firstName);
        formData.append("lastName", data?.lastName);
        if (profileInformation.profileImg) {
            formData.append("picture", {
                uri: profileInformation.profileImg?.uri,
                type: profileInformation.profileImg?.type,
                name: profileInformation.profileImg?.fileName,
                fileName: profileInformation.profileImg?.fileName
            });
        } else {
            formData.append("picture", "");
        }

        formData.append("email", profileInformation?.email);
        formData.append("addresses", JSON.stringify(profileInformation?.address));
        formData.append("cognitoId", data?.userId);
        formData.append("notificationToken", "");
        formData.append("phoneNumber", `${data?.selectedCountry?.code?.replace(/[()]/g, '')} ${data?.phoneNumber.replace(/\s+/g, '')}`);

        console.log(formData);
        // return
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        // return
        Actions.showLoader(true)
        try {
            const res = await axios.post(endPoints.CREATE_USER, formData, config)
            // const res = await apiPost(endPoints.CREATE_USER, createUserData)
            if (res?.status == 200) {
                const userInformaton = await decodeToken(res?.data?.data?.token)
                // after getting token store it in local storage and also set token in context
                setLocalData(storageKeys.userData, { ...userInformaton, token: res?.data?.data?.token })
                setuserData({ ...userInformaton, token: res?.data?.data?.token })
                if (from === "back") {
                    setIsLoggedIn(true)
                } else {
                    navigation.navigate(AuthRouteStrings.KYC_SCREEN, {
                        data: { ...data, ...profileInformation }
                    })
                }
            } else {
                showErrorToast(res?.data?.message, isDark)
            }
            console.log("res===>", res?.status, res?.data);
        } catch (error) {
            if (error?.response?.status < 500) {
                showErrorToast(error?.response?.data?.message, isDark)
            }else{
                showGeneralError(isDark)
            }
            
            console.log("error when creating user", error?.response?.status, error?.response?.data);
        } finally {
            Actions.showLoader(false)
        }
        return
    }


    useEffect(() => {
        if (
            profileInformation?.email !== ""
        ) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [profileInformation]);

    useBackButton(() => {
        handleSave("back")
        return true
    })

    return (
        <WrapperContainer
            centerTitle="Profile information"
            rightTitle="Skip"
            handlerRightViewPress={handleSave}
            // showBackButton
            buttonTitle={"Save"}
            handleBack={() => {
                handleSave()
                // navigation.navigate(AuthRouteStrings.USER_SIGN_UP)
            }}
            handleButtonPress={handleSave}
            buttonActive={buttonActive}
            containerPadding={{ paddingHorizontal: 0 }}
        >

            <ProfileView
                showEdit
                profileImg={profileInformation.profileImg?.uri}
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
                    val={profileInformation.email}
                />
                <EditAction
                    appStyles={appStyles}
                    handlePress={() => setShowSheet({
                        showAddress: true
                    })}
                    val={profileInformation.address?.length !== 0 && `${profileInformation.address?.length} Address`}
                    title="Address"
                />
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
                        title: "",
                        coordinates: [],
                        type: "",
                        street_address: "",
                        favorite: false,
                        house_number: "",
                        building_name: ""
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
                        coordinates: address?.coordinates,
                        street_address: address?.street_address,
                        house_number: address?.house_number,
                        building_name: address?.building_name,
                        type: address?.type
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
                handleSetLocationPress={() => {
                    setShowSheet({
                        ...showSheet,
                        addAddress: false,
                        setLocation: true
                    })
                }}
            />

            <ChooseMediaTypeSheet
                isVisible={showSheet.mediaType}
                setShowMode={setShowSheet}
                openCamara={async () => {
                    const res = await openCamara()
                    setProfileInformation({
                        ...profileInformation,
                        profileImg: res?.assets[0]
                    })
                    setShowSheet({
                        ...showSheet,
                        mediaType: false
                    })
                }}
                chooseMedia={async () => {
                    const res = await chooseMedia()
                    console.log("res===>", res);
                    setProfileInformation({
                        ...profileInformation,
                        profileImg: res?.assets[0]
                    })
                    setShowSheet({
                        ...showSheet,
                        mediaType: false
                    })
                }}
            />
        </WrapperContainer>
    )
}

export default ProfileInformation