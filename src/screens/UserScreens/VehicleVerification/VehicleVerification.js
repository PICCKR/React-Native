import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import DocumentUpload from '../../../components/DocumentUpload/DocumentUpload'
import InputText from '../../../components/InputText/InputText'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Images } from '../../../assets/images'
import { uiColours } from '../../../utils/Styles/uiColors'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import CheckBox from '../../../components/CheckBox/CheckBox'
import styles from './Styles'
import { useSelector } from 'react-redux'

const VehicleVerification = ({ route }) => {
    const data = route?.params?.data
    const { appStyles } = useContext(AppContext)
    const userData = useSelector((state) => state?.userDataReducer?.userData)
    const navigation = useNavigation()

    const [buttonActive, setButtonActive] = useState(false)
    const [status, setStatus] = useState("unapproved")
    const [vehicleData, setVehicleData] = useState({
        insurance: "",
        insuranceFileName: "",
        registration: "",
        registrationFileName: "",
        bvn: userData?.bvn,
        check: false

    })

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
            vehicleData?.insurance !== '' &&
            vehicleData.registration !== "" &&
            vehicleData.bvn !== "" &&
            vehicleData.check
        ) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [vehicleData])

    return (
        <WrapperContainer
            centerTitle="Vehicle Verification"
            showBackButton
            buttonTitle={status === "unapproved" ? "Submit" : status === "waiting" ? "Next" : "Next"}
            handleButtonPress={() => { status === "unapproved" ? handleSubmit() : status === "waiting" ? setButtonActive(false) : handleNext() }}
            buttonActive={buttonActive}
            containerPadding={{}}
        >
            {status === "unapproved" && <ScrollView style={{ marginBottom: verticalScale(80) }}>

                <Text>
                    Additional documents
                </Text>

                <DocumentUpload
                    title={"Proof of insurance"}
                    placeHolder={vehicleData?.insuranceFileName ? vehicleData?.insuranceFileName : "Take a vehicle registration photo"}
                    document={vehicleData}
                    setDocument={setVehicleData}
                    documentType="insurance"
                    fileName="insuranceFileName"
                />
                <DocumentUpload
                    title={"Vehicle registration"}
                    placeHolder={vehicleData?.registrationFileName ? vehicleData?.registrationFileName : "Take a vehicle registration photo"}
                    document={vehicleData}
                    setDocument={setVehicleData}
                    documentType="registration"
                    fileName="registrationFileName"
                />

                <InputText
                    hasTitle
                    inputTitle="Bank Verification Number"
                    editable={false}
                    // placeholder="e.g. 1234 5678 9012 3456"
                    value={vehicleData?.bvn}
                    // maxLength={19}
                    inputContainer={{ marginTop: verticalScale(10) }}
                    inPutStyles={{ marginTop: verticalScale(4) }}
                // handleChange={(e) => {
                //     // Remove any non-digit characters
                //     const cleanedNumber = e.replace(/\D/g, '');

                //     // Define the format (adjust based on your needs)
                //     const formattedNumber = cleanedNumber.replace(/(\d{4})/g, '$1 ');

                //     // Remove trailing hyphen if present
                //     formattedNumber.replace(/-$/, '');

                //     setVehicleData({
                //         ...vehicleData,
                //         bvn: formattedNumber
                //     })
                //     if (e.length > 18) {
                //         setButtonActive(true)
                //     } else {
                //         setButtonActive(false)
                //     }
                // }}
                />

                <View style={styles.termsView}>
                    <CheckBox
                        handleCheck={() => {
                            setVehicleData({
                                ...vehicleData,
                                check: !vehicleData.check
                            })
                        }}
                        selected={vehicleData.check}
                    />
                    <Text style={appStyles.smallTextGray}>
                        I agree that I am over 21 years old
                    </Text>
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

export default VehicleVerification