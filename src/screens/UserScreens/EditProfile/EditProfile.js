import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { useNavigation } from '@react-navigation/native'
import PrifileView from '../../../components/PrifileView/ProfileView'
import styles from './Styles'
import { editProfileData } from '../../../json/editProfileData'
import { RegEx } from '../../../utils/Constents/regulerexpressions'
import Form from '../../../components/Form/Form'
import { scale, verticalScale } from 'react-native-size-matters'
import ChooseMediaTypeSheet from '../../../components/ChooseMediaTypeSheet/ChooseMediaTypeSheet'
import { chooseMedia, openCamara } from '../../../helper/imagePickerFunctions'
import { getLocalData, setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'
import { AuthRouteStrings, MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import { showGeneralErrorToast, showToast } from '../../../components/tostConfig/tostConfig'
import { tostMessagetypes } from '../../../utils/Constents/constentStrings'
import { apiPost, apiPut } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import axios from 'axios'
import Actions from '../../../redux/Actions'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import { showGeneralError } from '../../../helper/showGeneralError'
import InputText from '../../../components/InputText/InputText'
import { uiColours } from '../../../utils/Styles/uiColors'
import { useSelector } from 'react-redux'

const EditProfile = ({ route }) => {
    const from = route?.params?.from
    const { appStyles, isDark, setIsDark, setuserData } = useContext(AppContext)
    const userData = useSelector((state) => state?.userDataReducer?.userData)

    // console.log("userData =========>", userData, getLocalData(storageKeys.userData));
    const navigation = useNavigation()
    const [buttonActive, setButtonActive] = useState(false)
    const [ShowError, setShowError] = useState({})
    const [showMediaSheet, setShowMediaSheet] = useState(false)

    const [formData, setFormData] = useState({
        profileImg: null,
        profileImgUri: userData?.picture,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        email: userData?.email,
        phoneNumber: userData?.phoneNumber,
        // selectedCountry: getContryCode()
    })

    const getContryCode = () => {
        return {
            id: 1,
            flag: Images.NigeriaFlags,
            name: "Nigeria",
            code: userData?.phoneNumber?.split(" ")[0]
        }
    }

    const handleSave = () => {
        if (!RegEx.email__regEx.test(formData?.email)) {
            setShowError({
                ...ShowError,
                email: true
            })
        } else if (!RegEx.name__regEx.test(formData?.firstName)) {
            setShowError({
                ...ShowError,
                firstName: true
            })
        } else if (!RegEx.name__regEx.test(formData?.lastName)) {
            setShowError({
                ...ShowError,
                lastName: true
            })
        }
        // else if (formData?.email !== userData?.email) {
        //     navigation.navigate(AuthRouteStrings.OTP_SCREEN, {
        //         from: MainRouteStrings.EDIT_PROFILE,
        //         data: formData,
        //     })
        // } 
        else {
            var editFormdata = new FormData();
            editFormdata.append("firstName", formData?.firstName);
            editFormdata.append("lastName", formData?.lastName);
            editFormdata.append("email", formData?.email);
            if (formData?.profileImgUri !== userData?.picture) {
                editFormdata.append("picture", {
                    uri: formData.profileImg?.uri,
                    type: formData.profileImg?.type,
                    name: formData.profileImg?.fileName,
                    fileName: formData.profileImg?.fileName
                });
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userData?.token}`,
                },
            };

            Actions.showLoader(true)
            axios.put(`${endPoints.UPDATE_PROFILE}/${userData?._id}`, editFormdata, config).then((res) => {
                if (res?.status === 200) {
                    setLocalData(storageKeys.userData, { ...res?.data?.data, token: userData?.token })
                    Actions.userData({ ...res?.data?.data, token: userData?.token })
                    // setuserData({ ...res?.data?.data, token: userData?.token })
                    if (from === MainRouteStrings.PICKER_PROFILE) {
                        navigation.navigate(MainRouteStrings.PICKER_PROFILE)
                    } else {
                        navigation.navigate(MainRouteStrings.USER_PROFILE_SCREEN)
                    }

                    showSuccessToast("You have updated your profile", isDark)
                } else {
                    showGeneralError()
                }
                // console.log("update profile res", res?.data?.data, res?.status);
                Actions.showLoader(false)
            }).catch((err) => {
                Actions.showLoader(false)
                showGeneralError()
                // console.log("update profile error", err);
            })
            // apiPut(`${endPoints.UPDATE_PROFILE}/${userData?._id}`, editFormdata).
            // setLocalData(storageKeys.userData, { ...userData, ...formData })
            // const toastMsgConfg = {
            //     isDark: isDark,
            //     msg: "You have updated your profile"
            // }
            // showToast(toastMsgConfg, tostMessagetypes.SUCCESS, isDark)
            // navigation.navigate(MainRouteStrings.USER_PROFILE_SCREEN)
        }

    }

    useEffect(() => {
        if (
            formData?.email !== userData?.email ||
            formData?.lastName !== userData?.lastName ||
            formData?.firstName !== userData?.firstName ||
            formData?.phoneNumber !== userData?.phoneNumber ||
            formData?.profileImgUri !== userData?.picture ||
            formData?.selectedCountry !== userData?.selectedCountry
        ) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [formData]);
    return (
        <WrapperContainer
            centerTitle="Edit Profile"
            showBackButton
            handleBack={() => {
                navigation.goBack()
            }}
            buttonTitle={"Save changes"}
            handleButtonPress={handleSave}
            buttonActive={buttonActive}
            containerPadding={{ paddingHorizontal: 0, paddingBottom: verticalScale(70) }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <PrifileView
                    showEdit
                    profileImg={formData.profileImgUri}
                    handleEdit={() => {
                        setShowMediaSheet(true)
                    }}
                />
                <View style={styles.formView}>
                    <Form
                        data={editProfileData}
                        formData={formData}
                        setFormData={setFormData}
                        ShowError={ShowError}
                        setShowError={setShowError}
                    />
                    <InputText
                        hasTitle
                        inputTitle="Phone number"
                        value={formData.phoneNumber}
                        editable={false}
                        inPutStyles={{ backgroundColor: uiColours.LIGHT_GRAY }}
                        inputContainer={{ marginTop: verticalScale(10) }}
                    />
                    <Text style={[appStyles.smallTextGray, {
                        paddingHorizontal: scale(16),
                        marginBottom: verticalScale(70)
                    }]}>
                        To change your phone number, you need to contact the email
                        <Text style={appStyles.smallTextPrimary}>
                            {` support@picckr.com`}
                        </Text>
                    </Text>
                </View>

            </ScrollView>
            <ChooseMediaTypeSheet
                isVisible={showMediaSheet}
                setShowMode={setShowMediaSheet}
                openCamara={async () => {
                    const res = await openCamara()
                    setFormData({
                        ...formData,
                        profileImg: res?.assets[0],
                        profileImgUri: res?.assets[0]?.uri,
                    })
                    setShowMediaSheet(false)
                }}
                chooseMedia={async () => {
                    const res = await chooseMedia()
                    setFormData({
                        ...formData,
                        profileImg: res?.assets[0],
                        profileImgUri: res?.assets[0]?.uri,
                    })
                    setShowMediaSheet(false)
                }}
            />
        </WrapperContainer>
    )
}

export default EditProfile