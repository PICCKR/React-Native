import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { verticalScale } from 'react-native-size-matters'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { Images } from '../../../assets/images'
import styles from './Styles'
import AddAddressSheet from './AddAddressSheet'
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
import EditAddressSheet from './EditAddressSheet'

const AddressScreen = () => {
    const { appStyles, userData, isDark, setIsDark, setuserData } = useContext(AppContext)
    const navigation = useNavigation()
    const [showSheet, setShowSheet] = useState({
        add: false,
        edit: false
    })

    const [address, setAddress] = useState([])

    const [selectedAddress, setSelectedAddress] = useState(null)

    const handleAddressEdit = async (newAddress) => {
        console.log("newAddress", newAddress);

        setShowSheet({
            ...showSheet,
            edit: false
        })
        Actions.showLoader(true)
        apiPut(`${endPoints.ADD_ADDRESS}/${selectedAddress?._id}`, newAddress).then((res) => {
            console.log("resss=>", res?.data, res?.status);
            if (res?.status === 200) {
                getAddress()
                // setAddress((prev) => [...prev, res?.data?.data])
                showSuccessToast("You have successfully edited an address", isDark)
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

    const handleAddAddress = (newAddress) => {
        console.log("newAddress", newAddress);
        setShowSheet({
            ...showSheet,
            add: false
        })
        const newAddressData = { ...newAddress, userId: userData?._id }
        Actions.showLoader(true)
        apiPost(endPoints.ADD_ADDRESS, newAddressData).then((res) => {
            console.log("resss=>", res?.data, res?.status);
            if (res?.status === 201) {
                setAddress((prev) => [...prev, res?.data?.data])
                showSuccessToast("You have successfully added an address", isDark)
            } else {

            }
            Actions.showLoader(false)
        }).catch((error) => {
            Actions.showLoader(false)
            showGeneralError()
            console.log("error in add address", error);
        })
    }

    const getAddress = async () => {
        Actions.showLoader(true)
        apiGet(`${endPoints.GET_ADDRESS}/${userData?._id}`).then((res) => {
            console.log("get address res", res?.data, res?.status);
            if (res?.status === 200) {
                setAddress(res?.data?.data)
            } else {
                setAddress([])
            }
            Actions.showLoader(false)
        }).catch((error) => {
            Actions.showLoader(false)
            console.log("error in get address", error);
        })
    }

    useEffect(() => {
        getAddress()
    }, [])


    return (

        <WrapperContainer
            centerTitle="Address"
            showFooterButton={false}
            showBackButton
            handleBack={() => {
                navigation.goBack()
            }}
            containerPadding={{ paddingTop: verticalScale(16) }}
        >
            <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                <Text style={appStyles?.smallTextPrimaryBold}>
                    Saved address ({address.length}/3)
                </Text>
                {address.length < 3 && <TouchableOpacity
                    style={{ paddingVertical: verticalScale(5) }}
                    onPress={() => {
                        setShowSheet({
                            ...showSheet,
                            add: true
                        })
                    }}
                >
                    <Text style={appStyles?.smallTextPrimary}>Add address</Text>
                </TouchableOpacity>}
            </View>

            {address.length > 0 ? <FlatList
                data={address}
                keyExtractor={(item) => item?._id}
                style={{ marginTop: verticalScale(10) }}
                renderItem={({ item }) => {
                    return (
                        <View style={{ marginBottom: verticalScale(16) }}>
                            <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                                <View style={[commonStyles.flexRowAlnCtr, { flex: 1 }]}>
                                    {item?.type === "Home" ? <Image source={Images.home} style={[commonStyles.icon, { tintColor: uiColours.PRIMARY }]} /> : <Image source={Images.work} style={[commonStyles.icon, { tintColor: uiColours.PRIMARY }]} />}
                                    <View style={{ width: "84%" }}>
                                        <Text style={appStyles.smallTextPrimary}>
                                            {item?.type}
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            {item?.street_address}
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
                                        setSelectedAddress(item)
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
                    You don't have any address saved please add
                </Text>

            }

            <AddAddressSheet
                isVisible={showSheet?.add}
                setShowSheet={setShowSheet}
                handleAddAddress={handleAddAddress}
            />

            <EditAddressSheet
                isVisible={showSheet?.edit}
                setShowSheet={setShowSheet}
                handleEditAddress={handleAddressEdit}
                data={selectedAddress}
            />
        </WrapperContainer>
    )
}

export default AddressScreen