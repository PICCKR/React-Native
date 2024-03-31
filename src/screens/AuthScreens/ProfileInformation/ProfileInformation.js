import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import styles from './Styles'
import EditAction from './EditAction'
import EmailSheet from './EmailSheet'
import ShowAddressSheet from './ShowAddressSheet'
import { showToast } from '../../../components/tostConfig/tostConfig'
import { tostMessagetypes } from '../../../utils/Constents/constentStrings'
import { AuthRouteStrings, MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import ChooseMediaTypeSheet from '../../../components/ChooseMediaTypeSheet/ChooseMediaTypeSheet'
import { chooseMedia, openCamara } from '../../../helper/imagePickerFunctions'
import ProfileView from '../../../components/PrifileView/ProfileView'
import useBackButton from '../../../customHooks/useBackButton'
import { endPoints } from '../../../configs/apiUrls'
import Actions from '../../../redux/Actions'
import { showGeneralError } from '../../../helper/showGeneralError'
import { setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'
import { showErrorToast } from '../../../helper/showErrorToast'
import axios from 'axios'
import { useSelector } from 'react-redux'

const ProfileInformation = ({ route }) => {
    const data = route?.params?.data
    const { appStyles, isDark, setIsLoggedIn, fromGuestUserScreen, setFromGuestUserScreen, profileInformation, setProfileInformation } = useContext(AppContext)
    const userData = useSelector((state) => state?.userDataReducer?.userData)
    const navigation = useNavigation()
    const [buttonActive, setButtonActive] = useState(false)
    const [showSheet, setShowSheet] = useState({
        showAddress: false,
        mediaType: false,
    })

    const handleSave = async (from) => {
        // if(profileInformation.profileImg){

        // }
        var formData = new FormData();
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

        formData.append("addresses", JSON.stringify(profileInformation?.address));

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userData?.token}`,
            },
        };

        console.log("formData", formData);

        // return
        Actions.showLoader(true)
        try {
            const res = await axios.put(`${endPoints.UPDATE_PROFILE}/${userData?._id}`, formData, config)
            // const res = await apiPost(endPoints.CREATE_USER, createUserData)
            if (res?.status == 200) {
                // after getting token store it in local storage and also set token in context
                // console.log("res?.data?.data", res?.data?.data)
                // return
                setLocalData(storageKeys.userData, { ...userData, addresses: res?.data?.data?.addresses, picture: res?.data?.data?.picture })
                Actions.userData({ ...userData, addresses: res?.data?.data?.addresses, picture: res?.data?.data?.picture })
                navigation.navigate(AuthRouteStrings.KYC_SCREEN, {
                    data: { ...data, ...profileInformation }
                })
            } else {
                showErrorToast(res?.data?.message, isDark)
            }
        } catch (error) {
            if (error?.response?.status < 500) {
                showErrorToast(error?.response?.data?.message, isDark)
            } else {
                showGeneralError(isDark)
            }

            console.log("error when creating user", error?.response?.status, error?.response?.data);
        } finally {
            Actions.showLoader(false)
        }
        return
    }
    // console.log("profileInformation?.address", profileInformation?.address?.length);

    useEffect(() => {
        if (
            profileInformation?.profileImg || profileInformation?.address.length > 0
        ) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [profileInformation]);

    useBackButton(() => {
        if (fromGuestUserScreen) {
            navigation.navigate(fromGuestUserScreen)
            setFromGuestUserScreen(null)
        } else {
            Actions.isLoggedIn(true)
        }
        return true
    })

    return (
        <WrapperContainer
            centerTitle="Profile information"
            rightTitle="Skip"
            handlerRightViewPress={() => {
                navigation.navigate(AuthRouteStrings.KYC_SCREEN)
            }}
            buttonTitle={"Save"}
            handleBack={() => {
                if (fromGuestUserScreen) {
                    navigation.navigate(fromGuestUserScreen)
                    setFromGuestUserScreen(null)
                } else {
                    setIsLoggedIn(true)
                }
            }}
            handleButtonPress={handleSave}
            buttonActive={buttonActive}
            containerPadding={{ paddingHorizontal: 0 }}
        >

            <ProfileView
                showEdit
                profileImg={profileInformation.profileImg?.uri}
                userData={{ ...userData, email: userData?.email === " " ? "" : userData?.email }}
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
                        showAddress: true
                    })}
                    val={profileInformation.address?.length !== 0 && `${profileInformation.address?.length} Address`}
                    title="Address"
                />
            </View>

            {/* <EmailSheet
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
            /> */}

            <ShowAddressSheet
                isVisible={showSheet.showAddress}
                setShowSheet={setShowSheet}
                profileInformation={profileInformation}
                handleAddAddress={() => {
                    setShowSheet({
                        showAddress: false
                    })
                    navigation.navigate(MainRouteStrings.ADD_ADDRESS, {
                        action: "add",
                        from: AuthRouteStrings.PROFILE_INFORMATION
                    })

                }}

                handleAddressEdit={(address) => {
                    setShowSheet({
                        showAddress: false
                    })

                    navigation.navigate(MainRouteStrings.ADD_ADDRESS, {
                        action: "edit",
                        from: AuthRouteStrings.PROFILE_INFORMATION,
                        data: {
                            coordinates: address?.coordinates,
                            street_address: address?.street_address,
                            house_number: address?.house_number,
                            building_name: address?.building_name,
                            type: address?.type
                        }
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
                    // console.log("res===>", res);
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