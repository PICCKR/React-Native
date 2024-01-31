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

const EditVehicleSheet = ({
    isVisible,
    setShowSheet,
    handleEditVehicle,
    data
}) => {
    // console.log(":dfataa", data);
    const { appStyles, isDark, vehicleType } = useContext(AppContext)
    const [buttonActive, setButtonActive] = useState(false)
    const [showError, setShowError] = useState()
    const [vehicleData, setVehicleData] = useState({
        vehicleType: data?.category,
        model_name: data?.model,
        palte_number: data?.plateNumber,
        year: data?.year,
        color: data?.color,
    })

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
            keyboardType: "default"
        }
    ]

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

    useEffect(() => {
        setVehicleData({
            ...vehicleData,
            vehicleType: data?.category,
            model_name: data?.model,
            palte_number: data?.plateNumber,
            year: data?.year,
            color: data?.color,
        })
    }, [])

    return (
        <FullScreenModal
            isVisible={isVisible}
            buttonTitle={"Save vehicle"}
            leftTitle="Vehicle"
            hasCloseIcon
            setShowModal={setShowSheet}

            buttonActive={buttonActive}
            handleButtonPress={() => {
                handleEditVehicle(vehicleData)
                setVehicleData({
                    ...vehicleData,
                    vehicleType: null,
                    model_name: "",
                    palte_number: "",
                    year: "",
                    color: "",
                })
            }}
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
                        value={vehicleData?.year}
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
                        value={vehicleData?.color}
                        handleChange={(e) => {
                            setVehicleData({
                                ...vehicleData,
                                color: e
                            })
                        }}
                    />
                </View>

            </ScrollView>

        </FullScreenModal>
    )
}

export default EditVehicleSheet