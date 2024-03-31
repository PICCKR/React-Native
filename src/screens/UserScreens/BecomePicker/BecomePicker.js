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
import axios from 'axios'
import { endPoints } from '../../../configs/apiUrls'
import { showGeneralError } from '../../../helper/showGeneralError'
import Actions from '../../../redux/Actions'
import { showErrorToast } from '../../../helper/showErrorToast'
import { fetchAuthSession } from '@aws-amplify/auth'
import { decodeToken } from '../../../helper/decodeToken'
import { setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'
import { useSelector } from 'react-redux'

const BecomePicker = ({ route }) => {
    const from = route?.params?.from
    const { appStyles, isDark, vehicleType, setuserData } = useContext(AppContext)
    const userData = useSelector((state) => state?.userDataReducer?.userData)
    // console.log("userData", userData);
    const navigation = useNavigation()

    const [buttonActive, setButtonActive] = useState(false)
    const [status, setStatus] = useState("unapproved")
    const [pickerData, setPickerData] = useState({
        vehicleType: null,
        insuranceFileType: "",
        insuranceFileName: "",
        insuranceFileUri: "",
        registrationFileType: "",
        registrationFileName: "",
        registrationFileUri: "",
        bvn: userData?.bvn,
        check: false
    })
    const [ShowError, setShowError] = useState({})


    const handleSubmit = () => {
        console.log("pickerData", pickerData);
        var formData = new FormData();
        formData.append("userId", userData?._id);
        formData.append("registrationProofDocs", {
            uri: pickerData?.registrationFileUri,
            type: pickerData?.registrationFileType,
            name: pickerData?.registrationFileName,
            fileName: pickerData?.registrationFileName
        });
        formData.append("insuranceProofDocs", {
            uri: pickerData?.insuranceFileUri,
            type: pickerData?.insuranceFileType,
            name: pickerData?.insuranceFileName,
            fileName: pickerData?.insuranceFileName
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userData.token}`,
            },
        };

        console.log("formData==>", formData?._parts);
        Actions.showLoader(true)

        axios.post(endPoints.BECOME_PICKER, formData, config).then((res) => {
            console.log("res in become picker", res?.data);
            if (res?.status === 201) {
                handleGetAccesToken()
            } else {
                showErrorToast(res?.data?.message, isDark)
            }
            Actions.showLoader(false)
        }).catch((error) => {
            Actions.showLoader(false)
            console.log("error in become picker", error?.response?.data);
            showGeneralError()
        })


        // setButtonActive(false)
        // setTimeout(() => {
        //     setStatus("approved")
        //     setButtonActive(true)
        // }, 2000);
    }

    const handleGetAccesToken = async () => {
        try {
            // get idToken from cognito
            const { idToken } = (await fetchAuthSession()).tokens ?? {};
            // console.log("idToken.toString()", idToken.toString());
            // pass this to in headers to get jwt token
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken.toString()}`,
                },
            };

            axios.post(endPoints.GET_TOKEN, {}, config)
                .then(async (result) => {
                    const { data, status } = result;
                    if (status == 200) {
                        const userInformaton = await decodeToken(data?.token)
                        // after getting token store it in local storage and also set token in context
                        setLocalData(storageKeys.userData, { ...userInformaton, token: data?.token })
                        Actions.userData({ ...userInformaton, token: data?.token })
                        // setuserData({ ...userInformaton, token: data?.token })
                        setButtonActive(false)
                        setStatus("waiting")

                    } else {

                    }
                    Actions.showLoader(false)
                })
                .catch(async (error) => {
                    showGeneralError(isDark)
                    Actions.showLoader(false)
                    console.log("error while getting access token", error);
                });
        } catch (err) {
            showGeneralError(isDark)
            Actions.showLoader(false)
            console.log(err);
        }
    }

    const handleNext = () => {
        navigation.navigate(MainRouteStrings.TRAINING_SCREEN, {
            from: from
        })
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
            handleBack={() => {
                navigation.goBack()
            }}
            buttonTitle={status === "unapproved" ? "Submit" : status === "waiting" ? "Next" : "Next"}
            handleButtonPress={() => { status === "unapproved" ? handleSubmit() : status === "waiting" ? setButtonActive(false) : handleNext() }}
            buttonActive={buttonActive}
            containerPadding={{ paddingHorizontal: 0 }}
        >
            {status === "unapproved" && <ScrollView style={{}}>

                <PrifileView
                    userData={{ ...userData, email: userData?.email === " " ? "" : userData?.email }}
                    profileImg={userData?.picture}
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%', paddingHorizontal: scale(16) }}>

                    <DocumentUpload
                        title={"Proof of insurance"}
                        placeHolder={pickerData?.insuranceFileName ? pickerData?.insuranceFileName : "Take a vehicle insurance photo"}
                        document={pickerData}
                        setDocument={setPickerData}
                        documentType="insuranceFileType"
                        fileName="insuranceFileName"
                        fileUri="insuranceFileUri"
                    />
                    <DocumentUpload
                        title={"Vehicle registration"}
                        placeHolder={pickerData?.registrationFileName ? pickerData?.registrationFileName : "Take a vehicle registration photo"}
                        document={pickerData}
                        setDocument={setPickerData}
                        documentType="registrationFileType"
                        fileName="registrationFileName"
                        fileUri="registrationFileUri"
                    />
                </View>
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