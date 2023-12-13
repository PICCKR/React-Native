import { View, Text, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { commonStyles, screenSize } from '../../../utils/Styles/CommonStyles'
import { verticalScale } from 'react-native-size-matters'
import { uiColours } from '../../../utils/Styles/uiColors'
import { Images } from '../../../assets/images'
import { setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'

const ApprovalScreen = ({ route }) => {
    const data = route?.params?.data
    const { appStyles, isDark, setuserData } = useContext(AppContext)
    const navigation = useNavigation()

    const [buttonActive, setButtonActive] = useState(true)
    const [status, setStatus] = useState("approved")
    const handleTryAgain = () => {

    }
    const handleContinue = () => {
        const useData = { ...data, type: "user" }
        setLocalData(storageKeys.userData, useData)
        setuserData({ ...data, type: "user" })
    }
    return (
        <WrapperContainer
            centerTitle="KYC"
            showBackButton
            buttonTitle={status === "failed" ? "Try Again" : "Continue"}
            showFooterButton={status !== "waiting" ? true : false}
            handleButtonPress={() => {
                if (status === "failed") {
                    handleTryAgain()
                } else {
                    handleContinue()
                }
            }}
            buttonActive={buttonActive}
        >
            <View style={{ alignItems: "center", justifyContent: "center", height: "100%" }}>
                {status === "waiting" && <View style={{ alignItems: "center" }}>
                    <Text style={appStyles.smallTextPrimaryBold}>Waiting for Approval</Text>
                    <Text style={[appStyles.smallTextGray, { textAlign: 'center' }]}>Thank you for submitting the required documents! Your documents have been sent and are currently under review by our team.</Text>
                </View>}

                {status === "approved" && <View style={{ alignItems: "center", gap: verticalScale(10) }}>
                    <Images.success height={28} width={28} />
                    <Text style={[appStyles.smallTextPrimaryBold, { color: uiColours.GREEN }]}>Documents Approved!</Text>
                    <Text style={[appStyles.smallTextGray, { textAlign: 'center' }]}>Congratulations, your documents have successfully obtained approval. Thank you for your patience.</Text>
                </View>}

                {status === "failed" && <View style={{ alignItems: "center", gap: verticalScale(10) }}>
                    <Images.error height={28} width={28} />
                    <Text style={[appStyles.smallTextPrimaryBold, { color: uiColours.RED }]}>Documents Rejected!</Text>
                    <Text style={[appStyles.smallTextGray, { textAlign: 'center' }]}>Sorry, your request has been rejected. Please try again to upload the document.</Text>
                </View>}


            </View>

        </WrapperContainer>
    )
}

export default ApprovalScreen