import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import styles from './Styles'
import { commonStyles, screenSize } from '../../../utils/Styles/CommonStyles'
import Form from '../../../components/Form/Form'
import InputText from '../../../components/InputText/InputText'
import FullScreenModal from '../../../components/FullScreenModal/FullScreenModal'
import { RegEx } from '../../../utils/Constents/regulerexpressions'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { useSelector } from 'react-redux'
import Actions from '../../../redux/Actions'
import { apiPost, apiPut } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import { showErrorToast } from '../../../helper/showErrorToast'
import { showGeneralError } from '../../../helper/showGeneralError'
import { useNavigation } from '@react-navigation/native'

const AddVehicleScreen = ({ route }) => {

    const { appStyles, isDark, vehicleType } = useContext(AppContext)
    const userData = useSelector((state) => state?.userDataReducer?.userData)
    const vehicles = useSelector((state) => state?.vehicleDataReducer?.vehicleData)
    const navigation = useNavigation()
    const action = route?.params?.action
    const data = route?.params?.data

    const [vehicleData, setVehicleData] = useState({
        vehicleType: data?.category ? data?.category : "",
        model_name: data?.model ? data?.model : "",
        palte_number: data?.plateNumber ? data?.plateNumber : "",
        year: data?.year ? data?.year : "",
        color: data?.color ? data?.color : "",
    })

    const [buttonActive, setButtonActive] = useState(false)
    const [showError, setShowError] = useState()

    const addData = [
        {
            id: 1,
            title: 'Mode name',
            placeHolder: "Input a model name",
            type: "model_name",
            isRequired: true,
            errorMsg: "Enter valid Model name",
            validationString: RegEx.notEmpty,
            keyboardType: "default"

        },
        {
            id: 2,
            title: 'Plate number',
            placeHolder: "Input plate number",
            type: "palte_number",
            maxLenght: 100,
            errorMsg: "",
            isRequired: true,
            errorMsg: "Enter valid plate number",
            validationString: RegEx.notEmpty,
            keyboardType: "defaultdsds"
        }
    ]

    const handleAddVehicle = () => {
        const newVehicleData = {
            riderId: userData?._id,
            category: vehicleData?.vehicleType?._id,
            plateNumber: vehicleData?.palte_number,
            model: vehicleData?.model_name,
            year: vehicleData?.year,
            color: vehicleData?.color
        }
        Actions.showLoader(true)
        apiPost(endPoints.ADD_VEHICLE, newVehicleData).then((res) => {
            console.log("resss=>", res?.data, res?.status);
            if (res?.status === 201) {
                const data = res?.data?.data
                Actions.vehicleData([...vehicles, data])
                showSuccessToast("You have successfully added an vehicle", isDark)
                navigation.goBack()
            } else {
                showErrorToast(res?.data?.message, isDark)
            }
            Actions.showLoader(false)
        }).catch((error) => {
            Actions.showLoader(false)
            showGeneralError()
            console.log("error in add address", error);
        })
    }

    const handleEditVehicle = async (newVehicle) => {

        const newVehicleData = {
            riderId: userData?._id,
            category: vehicleData?.vehicleType?._id,
            plateNumber: vehicleData?.palte_number,
            model: vehicleData?.model_name,
            year: vehicleData?.year,
            color: vehicleData?.color
        }
        Actions.showLoader(true)
        apiPut(`${endPoints.EDIT_VEHICLE}/${data?._id}`, newVehicleData).then(async (res) => {
            // console.log("resss=>", res?.data, res?.status);
            if (res?.status === 200) {
                const updatedVehicles = await vehicles?.map((item) => {
                    if (item?._id === data?._id) {
                        return res?.data?.data
                    } else {
                        return item
                    }
                })
                Actions.vehicleData(updatedVehicles)
                showSuccessToast("You have successfully edited an vehicle", isDark)
                navigation.goBack()
            } else {
                showGeneralError()
            }
            Actions.showLoader(false)
        }).catch((error) => {
            Actions.showLoader(false)
            showGeneralError()
            console.log("error in edit address", error);
        })
    }



    useEffect(() => {
        if (
            vehicleData.vehicleType &&
            vehicleData.model_name !== "" &&
            vehicleData?.palte_number !== "" &&
            vehicleData.year !== "" &&
            vehicleData?.color !== ""
        ) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [vehicleData]);

    return (
        <WrapperContainer
            buttonTitle={"Add vehicle"}
            leftTitle="Vehicle"
            hasCloseIcon
            handlerRightViewPress={() => {
                navigation.goBack()
            }}
            handleButtonPress={() => {
                if (action === "add") {
                    handleAddVehicle()
                } else {
                    handleEditVehicle()
                }

            }}
            buttonActive={buttonActive}
        >
            <ScrollView
                style={{}}
                showsVerticalScrollIndicator={false}
            >

                <Text style={appStyles.smallTextBlack}>
                    Choose vehicle type
                </Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: verticalScale(5), marginVertical: verticalScale(10) }}>
                    {
                        vehicleType.map((item) => {
                            return (
                                <View key={item?._id} style={[styles.VehicleTypeView, {
                                    borderWidth: vehicleData?.vehicleType?._id === item?._id ? moderateScale(1) : 0
                                }]}>
                                    <View style={[styles.VehicleType]}>
                                        <TouchableOpacity
                                            style={styles.vehicleTypeIcon}
                                            onPress={() => {
                                                setVehicleData({
                                                    ...vehicleData,
                                                    vehicleType: item
                                                })
                                            }}
                                        >
                                            <Image source={{ uri: item?.catImage }} style={{
                                                height: moderateScale(24),
                                                width: moderateScale(24),
                                            }} />
                                        </TouchableOpacity>
                                        <Text style={appStyles.smallTextBlack}>
                                            {item.name}
                                        </Text>
                                    </View>

                                </View>
                            )
                        })
                    }
                </ScrollView>

                <Form
                    data={addData}
                    formData={vehicleData}
                    setFormData={setVehicleData}
                    setShowError={setShowError}
                    ShowError={showError}
                />

                <View style={[commonStyles.flexRowAlnCtrJutySpaceBetween, {
                    marginTop: verticalScale(14),
                    marginBottom: verticalScale(150),
                    alignItems: "flex-start"
                }]}>
                    <InputText
                        isRequired
                        inputTitle={"Year"}
                        inputContainer={{ width: "47%" }}
                        inPutStyles={{ bottom: verticalScale(10) }}
                        placeholder={"Input your year"}
                        ErrorMsg="Enter valid Year ex - 2023"
                        ShowError={showError?.year}
                        handleChange={(e) => {
                            setVehicleData({
                                ...vehicleData,
                                year: e
                            })
                        }}
                        keyboardType="numeric"
                        OnBlur={() => {
                            if (vehicleData.year.length < 4) {
                                setShowError({
                                    ...showError,
                                    year: true
                                })
                            } else {
                                setShowError({
                                    ...showError,
                                    year: false
                                })
                            }
                        }}
                    />
                    <InputText
                        isRequired
                        inputTitle={"Color"}
                        inputContainer={{ width: "45%" }}
                        inPutStyles={{ bottom: verticalScale(10) }}
                        placeholder={"Input your color"}
                        handleChange={(e) => {
                            setVehicleData({
                                ...vehicleData,
                                color: e
                            })
                        }}
                    />
                </View>

            </ScrollView>
        </WrapperContainer>
    )
}

export default AddVehicleScreen