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
import { verticalScale } from 'react-native-size-matters'
import ChooseMediaTypeSheet from '../../../components/ChooseMediaTypeSheet/ChooseMediaTypeSheet'
import { chooseMedia, openCamara } from '../../../helper/imagePickerFunctions'
import { setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import { showToast } from '../../../components/tostConfig/tostConfig'
import { tostMessagetypes } from '../../../utils/Constents/constentStrings'

const EditProfile = () => {
    const { appStyles, userData, isDark, setIsDark, setuserData } = useContext(AppContext)
    const navigation = useNavigation()
    const [buttonActive, setButtonActive] = useState(false)
    const [ShowError, setShowError] = useState({})
    const [showMediaSheet, setShowMediaSheet] = useState(false)

    const [formData, setFormData] = useState({
        profileImg: userData?.profileImg,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        email: userData?.email,
        phoneNumber: userData?.phoneNumber,
        selectedCountry: userData?.selectedCountry
    })

    const handleSave = () => {
        if (!RegEx.email__regEx.test(formData?.email)) {
            setShowError({
                ...ShowError,
                email: true
            })
        } else if(!RegEx.name__regEx.test(formData?.firstName)){
            setShowError({
                ...ShowError,
                firstName: true
            })
        } else if(!RegEx.name__regEx.test(formData?.lastName)){
            setShowError({
                ...ShowError,
                lastName: true
            })
        }else {
            setuserData({ ...userData, ...formData })
            setLocalData(storageKeys.userData, { ...userData, ...formData })
            const toastMsgConfg = {
                isDark: isDark,
                msg: "You have updated your profile"
            }
            showToast(toastMsgConfg, tostMessagetypes.SUCCESS, isDark)
            navigation.navigate(MainRouteStrings.USER_PROFILE_SCREEN)
        }

    }

    useEffect(() => {
        if (
            formData?.email !== userData?.email ||
            formData?.lastName !== userData?.lastName ||
            formData?.firstName !== userData?.firstName ||
            formData?.phoneNumber !== userData?.phoneNumber ||
            formData?.profileImg !== userData?.profileImg ||
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
            <ScrollView >
                <PrifileView
                    showEdit
                    profileImg={formData?.profileImg}
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
                </View>

            </ScrollView>
            <ChooseMediaTypeSheet
                isVisible={showMediaSheet}
                setShowMode={setShowMediaSheet}
                openCamara={async () => {
                    const res = await openCamara()
                    setFormData({
                        ...formData,
                        profileImg: res?.assets[0]?.uri
                    })
                    setShowMediaSheet(false)
                }}
                chooseMedia={async () => {
                    const res = await chooseMedia()
                    setFormData({
                        ...formData,
                        profileImg: res?.assets[0]?.uri
                    })
                    setShowMediaSheet(false)
                }}
            />
        </WrapperContainer>
    )
}

export default EditProfile