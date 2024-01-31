import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { verticalScale } from 'react-native-size-matters'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { showToast } from '../../../components/tostConfig/tostConfig'
import { tostMessagetypes } from '../../../utils/Constents/constentStrings'
import { setLocalData } from '../../../helper/AsyncStorage'
import { uiColours } from '../../../utils/Styles/uiColors'
import axios from 'axios'
import { apiGet, apiPost, apiPut } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { showGeneralError } from '../../../helper/showGeneralError'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import Actions from '../../../redux/Actions'
import AddVehicleSheet from './AddVehicleSheet'
import EditVehicleSheet from './EditVehicleSheet'
import { showErrorToast } from '../../../helper/showErrorToast'

const VehicleScreen = () => {
    const { appStyles, userData, isDark } = useContext(AppContext)
    const navigation = useNavigation()
    const [showSheet, setShowSheet] = useState({
        add: false,
        edit: false
    })

    const [vehicles, setVehicles] = useState([])

    const [selectedVehicle, setSelectedVehicle] = useState(null)

    const handleEditVehicle = async (newVehicle) => {

        const newVehicleData = {
            riderId: userData?._id,
            category: newVehicle?.vehicleType?._id,
            plateNumber: newVehicle?.palte_number,
            model: newVehicle?.model_name,
            year: newVehicle?.year,
            color: newVehicle?.color
        }
        setShowSheet({
            ...showSheet,
            edit: false
        })

        Actions.showLoader(true)
        apiPut(`${endPoints.EDIT_VEHICLE}/${selectedVehicle?._id}`, newVehicleData).then((res) => {
            // console.log("resss=>", res?.data, res?.status);
            if (res?.status === 200) {
                getVehicleData()
                showSuccessToast("You have successfully edited an vehicle", isDark)
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

    const handleAddAddVehicle = (newVehicle) => {

        // console.log("newAddress", newVehicle);
        setShowSheet({
            ...showSheet,
            add: false
        })
        const newVehicleData = {
            riderId: userData?._id,
            category: newVehicle?.vehicleType?._id,
            plateNumber: newVehicle?.palte_number,
            model: newVehicle?.model_name,
            year: newVehicle?.year,
            color: newVehicle?.color
        }
        Actions.showLoader(true)
        apiPost(endPoints.ADD_VEHICLE, newVehicleData).then((res) => {
            // console.log("resss=>", res?.data, res?.status);

            if (res?.status === 201) {
                const data = res?.data?.data
                setVehicles((prev) => [...prev, res?.data?.data])
                showSuccessToast("You have successfully added an vehicle", isDark)
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

    const getVehicleData = async () => {
        Actions.showLoader(true)
        apiGet(`${endPoints.GET_VEHICLES}/${userData?._id}`).then((res) => {
            // console.log("get vehicle res ", res?.data, res?.status);
            if (res?.status === 200) {
                setVehicles(res?.data?.data)
            } else {
                setVehicles([])
            }
            Actions.showLoader(false)
        }).catch((error) => {
            Actions.showLoader(false)
            console.log("error in get address", error);
        })
    }

    useEffect(() => {
        getVehicleData()
    }, [])


    return (

        <WrapperContainer
            centerTitle="Vehicles"
            showFooterButton={false}
            rightTitle="Add vehicle"
            handlerRightViewPress={() => {
                setShowSheet({
                    ...showSheet,
                    add: true
                })
            }}
            showBackButton
            handleBack={() => {
                navigation.goBack()
            }}
            containerPadding={{ paddingTop: verticalScale(10) }}
        >

            {vehicles.length > 0 ? <FlatList
                data={vehicles}
                keyExtractor={(item) => item?._id}
                style={{ marginTop: verticalScale(10) }}
                renderItem={({ item }) => {
                    return (
                        <View style={{ marginBottom: verticalScale(16) }}>
                            <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                                <View style={commonStyles.flexRowAlnCtr}>
                                    <Image source={Images.home} style={[commonStyles.icon]} />

                                    <View style={{ width: "84%" }}>
                                        <Text style={appStyles.smallTextPrimary}>
                                            {item?.category?.name}
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            <Text style={appStyles.smallTextGrayBold}> Plate Number :  </Text> {item?.plateNumber}
                                        </Text>

                                        <Text style={appStyles.smallTextGray}>
                                            <Text style={appStyles.smallTextGrayBold}> Model : </Text> {item?.model}
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            <Text style={appStyles.smallTextGrayBold}> Color :</Text> {item?.color}
                                        </Text>
                                    </View>

                                </View>
                                <TouchableOpacity
                                    style={styles.addresEditIcon}
                                    onPress={() => {
                                        setShowSheet({
                                            ...showSheet,
                                            edit: true
                                        })
                                        setSelectedVehicle(item)
                                    }}
                                >
                                    <Images.edit />
                                </TouchableOpacity>

                            </View>



                        </View>
                    )
                }}
            >

            </FlatList> :
                <Text style={[appStyles.mediumTextBlack, {
                    alignSelf: "center",
                    marginTop: '50%',
                    textAlign: 'center'
                }]}>
                    You don't have any vehicles saved please add
                </Text>

            }

            <AddVehicleSheet
                isVisible={showSheet?.add}
                setShowSheet={setShowSheet}
                handleAddVehicle={handleAddAddVehicle}
            />

            <EditVehicleSheet
                isVisible={showSheet?.edit}
                setShowSheet={setShowSheet}
                handleEditVehicle={handleEditVehicle}
                data={selectedVehicle}
            />
        </WrapperContainer>
    )
}

export default VehicleScreen