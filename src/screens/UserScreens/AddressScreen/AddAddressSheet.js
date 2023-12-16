import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import { AppContext } from '../../../context/AppContext'
import SheetFooter from '../../../components/SheetFooter/SheetFooter'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import styles from './Styles'
import { commonStyles, screenSize } from '../../../utils/Styles/CommonStyles'
import { Images } from '../../../assets/images'
import Modal from 'react-native-modal'
import { uiColours } from '../../../utils/Styles/uiColors'
import Form from '../../../components/Form/Form'
import InputText from '../../../components/InputText/InputText'
import FullScreenModal from '../../../components/FullScreenModal/FullScreenModal'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_API_KEY } from '../../../configs/google_map_api_key'
import { RegEx } from '../../../utils/Constents/regulerexpressions'

const AddAddressSheet = ({
    isVisible,
    setShowSheet,
    handleAddAddress = () => {},
    setAddresData,
    addressData,
    handleEditAddress = () => {},
    action
}) => {
    const { appStyles, isDark } = useContext(AppContext)

    const [buttonActive, setButtonActive] = useState(false)

    const [showError, setShowError] = useState()

    const addresTypeData = [
        {
            id: "1",
            type: "Home",
            icon: Images.home
        },
        {
            id: "2",
            type: "Work",
            icon: Images.work
        },
    ]

    const addData = [
        {
            id: 1,
            title: 'Building name',
            placeHolder: "Input a building name",
            type: "buildingName",
            isRequired: true,
            errorMsg: "Enter valid Building name",
            validationString: RegEx.notEmpty

        },
        {
            id: 2,
            title: 'Home number',
            placeHolder: "e.g 456",
            type: "homeNumber",
            maxLenght: 100,
            errorMsg: "",
            isRequired: true,
            errorMsg: "Enter valid Home number",
            validationString: RegEx.notEmpty
        }
    ]

    useEffect(() => {
        if (
            addressData.addressType !== '' &&
            addressData?.buildingName !== "" &&
            addressData?.homeNumber !== "" &&
            addressData.location !== ""
        ) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [addressData]);

    return (
        <FullScreenModal
            isVisible={isVisible}
            buttonTitle={action === "add" ? "Add address" : "Save address"}
            leftTitle="Address"
            hasCloseIcon
            setShowModal={setShowSheet}
            buttonActive={buttonActive}
            handleButtonPress={() => {
                if (action === "add") {
                    handleAddAddress()
                } else {
                    handleEditAddress()
                }

            }}
        >
            <ScrollView style={{ marginBottom: verticalScale(75) }}>
                <View style={{ paddingBottom: verticalScale(16) }}>
                    <Text style={appStyles.smallTextBlack}>
                        Address type
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(10) }}>
                        {
                            addresTypeData.map((item) => {
                                // console.log("addressData.addressType", addressData?.addressType);
                                return (
                                    <TouchableOpacity key={item.id}
                                        style={{
                                            flexDirection: 'row',
                                            padding: moderateScale(9),
                                            gap: scale(5),
                                            borderWidth: moderateScale(1),
                                            borderRadius: moderateScale(6),
                                            borderColor: addressData?.addressType === item.type ? uiColours.PRIMARY : uiColours.LIGHT_GRAY,
                                            backgroundColor: addressData?.addressType === item.type ? "#F0E796" : uiColours.WHITE_TEXT,
                                        }}
                                        onPress={() => {
                                            setAddresData({
                                                ...addressData,
                                                addressType: item.type
                                            })
                                        }}
                                    >
                                        <Image source={item.icon} style={{
                                            height: moderateScale(20),
                                            width: moderateScale(20),
                                            tintColor: addressData?.addressType === item.type ? uiColours.PRIMARY : uiColours.GRAY_TEXT

                                        }} />
                                        <Text>{item.type}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>

                <Form
                    data={addData}
                    formData={addressData}
                    setFormData={setAddresData}
                    setShowError={setShowError}
                    ShowError={showError}
                />
                <View style={{ flex: 1, marginTop: verticalScale(16) }}>
                    <Text style={appStyles.smallTextBlack}>Set location</Text>


                    <GooglePlacesAutocomplete
                        value={addressData?.location}
                        placeholder="Set location"
                        keepResultsAfterBlur
                        onPress={(data, details = null) => {
                            // 'details' contains information about the selected place.
                            // console.log("ddd", data.description);
                            setAddresData({
                                ...addressData,
                                location: data.description
                            })
                        }}
                        query={{
                            key: GOOGLE_MAP_API_KEY,
                            language: 'en', // language of the results
                        }}
                        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        styles={{
                            textInputContainer: {
                                width: "100%",
                                borderWidth: moderateScale(1),
                                borderRadius: moderateScale(6),
                                borderColor: uiColours.LIGHT_GRAY,
                                marginTop: verticalScale(5),
                                paddingLeft: scale(20)
                            },
                            description: {
                                fontWeight: 'bold',
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                        }}
                    />
                    <View style={{ position: 'absolute', top: verticalScale(43), left: scale(10) }}>
                        <Images.locationPin />
                    </View>
                </View>

            </ScrollView>
        </FullScreenModal>
    )
}

export default AddAddressSheet