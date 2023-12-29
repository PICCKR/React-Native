import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import styles from './Styles'
import { Images } from '../../../assets/images'
import Form from '../../../components/Form/Form'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CheckBox from '../../../components/CheckBox/CheckBox'
import { AppContext } from '../../../context/AppContext'
import { RegEx } from '../../../utils/Constents/regulerexpressions'
import { useNavigation } from '@react-navigation/native'
import { AuthRouteStrings, MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import PrifileView from '../../../components/PrifileView/ProfileView'
import DocumentUpload from '../../../components/DocumentUpload/DocumentUpload'
import { uiColours } from '../../../utils/Styles/uiColors'
import InputText from '../../../components/InputText/InputText'

const BecomePicker = () => {
    const { appStyles, userData, isDark } = useContext(AppContext)
    console.log("userData", userData);
    const navigation = useNavigation()

    const [buttonActive, setButtonActive] = useState(false)
    const [status, setStatus] = useState("unapproved")
    const [pickerData, setPickerData] = useState({
        insurance: "",
        insuranceFileName: "",
        registration: "",
        registrationFileName: "",
        bvn: userData?.bvn,
        check: false
    })
    const [ShowError, setShowError] = useState({})


    const handleSubmit = () => {
        setStatus("waiting")
        setButtonActive(false)
        setTimeout(() => {
            setStatus("approved")
            setButtonActive(true)
        }, 2000);
    }

    const handleNext = () => {
        navigation.navigate(MainRouteStrings.TRAINING_SCREEN)
    }

    useEffect(() => {
        if (
            pickerData?.insurance !== '' &&
            pickerData.registration !== "" &&
            pickerData.check
        ) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [pickerData]);

    return (
        <WrapperContainer
            centerTitle="Vehicle Verification"
            showBackButton
            handleBack={()=>{
                navigation.goBack()
            }}
            buttonTitle={status === "unapproved" ? "Submit" : status === "waiting" ? "Next" : "Next"}
            handleButtonPress={() => { status === "unapproved" ? handleSubmit() : status === "waiting" ? setButtonActive(false) : handleNext() }}
            buttonActive={buttonActive}
            containerPadding={{ paddingHorizontal: 0 }}
        >
            {status === "unapproved" && <ScrollView style={{}}>

                <View style={[styles.profileSection,{
                    borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                }]}>
                    <PrifileView
                        profileViewStyles={{}}
                        profileImg={userData?.profileImg}
                    />
                    <Text style={appStyles.mediumTextPrimaryBold}>
                        {userData?.firstName} {userData?.lastName}
                    </Text>
                    <Text style={appStyles.smallTextGray}>
                        {userData?.email}
                    </Text>
                    <Text style={appStyles.smallTextGray}>
                        {userData?.selectedCountry?.code} {userData?.phoneNumber}
                    </Text>
                </View>

                <View style={{ paddingHorizontal: scale(16) }}>
                    <DocumentUpload
                        title={"Proof of insurance"}
                        placeHolder={pickerData?.insuranceFileName ? pickerData?.insuranceFileName : "Take a vehicle registration photo"}
                        document={pickerData}
                        setDocument={setPickerData}
                        documentType="insurance"
                        fileName="insuranceFileName"
                    />
                    <DocumentUpload
                        title={"Vehicle registration"}
                        placeHolder={pickerData?.registrationFileName ? pickerData?.registrationFileName : "Take a vehicle registration photo"}
                        document={pickerData}
                        setDocument={setPickerData}
                        documentType="registration"
                        fileName="registrationFileName"
                    />

                    <InputText
                        hasTitle
                        inputTitle="Bank Verification Number"
                        editable={false}
                        value={pickerData?.bvn}
                        inputContainer={{ marginTop: verticalScale(10) }}
                        inPutStyles={{ marginTop: verticalScale(4) }}
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
                </View>

            </ScrollView>}

            {status === "waiting" &&
                <View style={{ alignItems: "center", marginTop: "50%" }}>
                    <Text style={appStyles.smallTextPrimaryBold}>Waiting for Approval</Text>
                    <Text style={[appStyles.smallTextGray, { textAlign: 'center' }]}>The vehicle need to undergo a comprehensive inspection to ensure it meets PicckR's safety and quality standards.</Text>
                </View>}

            {status === "approved" &&
                <View style={{ alignItems: "center", gap: verticalScale(10), marginTop: "50%" }}>
                    <Images.success height={moderateScale(28)} width={moderateScale(28)} />
                    <Text style={[appStyles.smallTextPrimaryBold, { color: uiColours.GREEN }]}>Documents Approved!</Text>
                    <Text style={[appStyles.smallTextGray, { textAlign: 'center' }]}>Congratulations, your documents have successfully obtained approval. Thank you for your patience.</Text>
                </View>}


        </WrapperContainer>
    )
}

export default BecomePicker