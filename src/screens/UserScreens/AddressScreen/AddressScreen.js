import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useContext, useState } from 'react'
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

const AddressScreen = () => {
    const { appStyles, userData, isDark, setIsDark, setuserData } = useContext(AppContext)
    const navigation = useNavigation()
    const [showSheet, setShowSheet] = useState()

    const [addressData, setAddresData] = useState({
        id: "",
        addressType: "",
        buildingName: "",
        homeNumber: "",
        location: "",
    })
    const [action, setAction] = useState("add")

    const handleAddressEdit = async () => {
        setShowSheet(false)

        var addresss = userData.address

        const newAddress = await addresss.map((item) => {
            // console.log(item.id, addressData.id);
            if (item.id === addressData.id) {
                return addressData
            } else {
                return item
            }
        })

        setuserData({
            ...userData,
            address: newAddress
        })
        setAddresData({
            id: "",
            addressType: "",
            buildingName: "",
            homeNumber: "",
            location: "",
        })
        const toastMsgConfg = {
            isDark: isDark,
            msg: "You have successfully edited an address"
        }
        showToast(toastMsgConfg, tostMessagetypes.SUCCESS, isDark)
    }

    const handleAddAddress = () =>{
        setShowSheet(false)

        const newAddress = {
            id: userData.address.length + 1,
            addressType: addressData?.addressType,
            buildingName: addressData?.buildingName,
            homeNumber: addressData?.homeNumber,
            location: addressData?.location,
        }

        // console.log("[...profileInformation.address, ...newAddress]", [...userData.address, newAddress]);
        setuserData({
            ...userData,
            address: [...userData.address, newAddress]
        })
        // setLocalData()
        setAddresData({
            id: "",
            addressType: "",
            buildingName: "",
            homeNumber: "",
            location: "",
        })
        const toastMsgConfg = {
            isDark: isDark,
            msg: "You have successfully added an address"
        }
        showToast(toastMsgConfg, tostMessagetypes.SUCCESS, isDark)
    }

    return (

        <WrapperContainer
            centerTitle="Address"
            showFooterButton={false}
            showBackButton
            handleBack={()=>{
                navigation.goBack()
            }}
            containerPadding={{ paddingTop: verticalScale(16) }}
        >
            <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                <Text style={appStyles?.smallTextPrimaryBold}>
                    Saved address ({userData?.address?.length}/3)
                </Text>
               {userData?.address.length < 3 && <TouchableOpacity
                style={{paddingVertical:verticalScale(5)}}
                onPress={()=>{
                    setAction("add")
                    setAddresData({
                        id: "",
                        addressType: "",
                        buildingName: "",
                        homeNumber: "",
                        location: "",
                    })
                    setShowSheet(true)
                }}
                >
                    <Text style={appStyles?.smallTextPrimary}>Add address</Text>
                </TouchableOpacity>}
            </View>

            <FlatList
                data={userData?.address}
                keyExtractor={(item) => item?.id}
                style={{ marginTop: verticalScale(10) }}
                renderItem={({ item }) => {
                    return (
                        <View style={{marginBottom:verticalScale(16)}}>
                            <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                                <View style={[commonStyles.flexRowAlnCtr, { flex: 1 }]}>
                                    {item?.addressType === "Home" ? <Image source={Images.home} style={[commonStyles.icon,{tintColor:uiColours.PRIMARY}]} /> : <Image source={Images.work} style={[commonStyles.icon,{tintColor:uiColours.PRIMARY}]} />}
                                    <View style={{ width: "84%" }}>
                                        <Text style={appStyles.smallTextPrimary}>
                                            {item?.addressType}
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            {item?.location}
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={styles.addresEditIcon}
                                    onPress={() => {
                                        setAction("edit")
                                        setShowSheet(true)
                                        setAddresData({
                                            id: item?.id,
                                            addressType: item?.addressType,
                                            buildingName: item?.buildingName,
                                            homeNumber: item?.homeNumber,
                                            location: item?.location,
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

            </FlatList>

            <AddAddressSheet
                isVisible={showSheet}
                setShowSheet={setShowSheet}
                handleAddAddress={handleAddAddress}
                addressData={addressData}
                setAddresData={setAddresData}
                action={action}
                handleEditAddress={handleAddressEdit}
            />
        </WrapperContainer>
    )
}

export default AddressScreen