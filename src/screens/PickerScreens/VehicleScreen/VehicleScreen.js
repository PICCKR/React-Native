import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { verticalScale } from 'react-native-size-matters'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { apiGet, apiPost, apiPut } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { showGeneralError } from '../../../helper/showGeneralError'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import Actions from '../../../redux/Actions'
import EditVehicleSheet from './EditVehicleSheet'
import { showErrorToast } from '../../../helper/showErrorToast'
import { useSelector } from 'react-redux'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'

const VehicleScreen = () => {
    const { appStyles, isDark } = useContext(AppContext)
    const userData = useSelector((state) => state?.userDataReducer?.userData)
    const vehicles = useSelector((state) => state?.vehicleDataReducer?.vehicleData)

    const navigation = useNavigation()

    const getVehicleData = async () => {
        Actions.showLoader(true)
        apiGet(`${endPoints.GET_VEHICLES}/${userData?._id}`).then((res) => {
            console.log("get vehicle res ", res?.data);
            if (res?.status === 200) {
                Actions.vehicleData(res?.data?.data)
            } else {
                Actions.vehicleData([])
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
                navigation.navigate(MainRouteStrings.ADD_VEHICLE, {
                    action: "add"
                })
            }}
            showBackButton
            handleBack={() => {
                navigation.goBack()
            }}
            containerPadding={{ paddingTop: verticalScale(10) }}
        >

            {vehicles?.length > 0 ? <FlatList
                data={vehicles}
                keyExtractor={(item) => item?._id}
                style={{ marginTop: verticalScale(10) }}
                renderItem={({ item }) => {
                    return (
                        <View style={{ marginBottom: verticalScale(16) }}>
                            <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                                <View style={commonStyles.flexRowAlnCtr}>
                                    <Image source={{ uri: item?.category?.catImage }} style={[commonStyles.icon]} />

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
                                        navigation.navigate(MainRouteStrings.ADD_VEHICLE, {
                                            action: "edit",
                                            data: item
                                        })
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

            {/* <AddVehicleSheet
                isVisible={showSheet?.add}
                setShowSheet={setShowSheet}
                handleAddVehicle={handleAddAddVehicle}
            /> */}

            {/* <EditVehicleSheet
                isVisible={showSheet?.edit}
                setShowSheet={setShowSheet}
                handleEditVehicle={handleEditVehicle}
                data={selectedVehicle}
            /> */}
        </WrapperContainer>
    )
}

export default VehicleScreen