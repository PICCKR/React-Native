import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import styles from './Styles'
import { Images } from '../../../assets/images'
import Form from '../../../components/Form/Form'
import { becomePickerData } from '../../../json/becomePickerData'
import { verticalScale } from 'react-native-size-matters'
import HyperlinkView from './HyperlinkView'
import CheckBox from '../../../components/CheckBox/CheckBox'
import { AppContext } from '../../../context/AppContext'
import { RegEx } from '../../../utils/Constents/regulerexpressions'
import { useNavigation } from '@react-navigation/native'
import { AuthRouteStrings, MainRouteStrings } from '../../../utils/Constents/RouteStrings'

const BecomePicker = () => {
    const { appStyles } = useContext(AppContext)
    const navigation = useNavigation()

    const [buttonActive, setButtonActive] = useState(false)
    const [pickerData, setPickerData] = useState({
        profileImg: null,
        email: "",
        name: "",
        phoneNumber: "",
        selectedCountry: {},
        check: false
    })
    const [ShowError, setShowError] = useState({})

    const handleNext = () => {
        navigation.navigate(AuthRouteStrings.OTP_SCREEN, {
            data: pickerData,
            from: MainRouteStrings.BECOME_PICKER
        })
    }
    useEffect(() => {
        if (
            pickerData?.name !== '' &&
            RegEx.email__regEx.test(pickerData?.email) &&
            pickerData?.phoneNumber !== "" &&
            pickerData?.check === true
        ) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [pickerData]);

    return (
        <WrapperContainer
            centerTitle="Become PicckR"
            showBackButton
            buttonTitle={"Next"}
            handleButtonPress={handleNext}
            buttonActive={buttonActive}
            containerPadding={{ paddingHorizontal: 0 }}
        >
            <ScrollView style={{ marginBottom: verticalScale(60) }}>

                <View style={styles.profileSection}>
                    <View style={styles.profileView}>
                        {pickerData.profileImg ? <Image source={{ uri: pickerData.profileImg }} /> : <Images.profile />}
                    </View>
                </View>

                <Form
                    style={{ marginTop: verticalScale(16) }}
                    data={becomePickerData}
                    formData={pickerData}
                    setFormData={setPickerData}
                    ShowError={ShowError}
                    setShowError={setShowError}
                />

                <View style={styles.termsView}>
                    <CheckBox
                        handleCheck={() => {
                            setPickerData({
                                ...pickerData,
                                check: !pickerData.check
                            })
                        }}
                        selected={pickerData.check}
                    />
                    <Text style={appStyles.smallTextGray}>
                        I agree that I am over 21 years old
                    </Text>
                </View>

            </ScrollView>


        </WrapperContainer>
    )
}

export default BecomePicker