import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, Alert } from 'react-native'
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
import SetLocationModal from '../../../components/SetLocationModal/SetLocationModal'
import { uiStrings } from '../../../utils/Constents/uiStrings'

const EditAddressSheet = ({
    isVisible,
    setShowSheet,
    handleEditAddress,
    data
}) => {

    const { appStyles, isDark } = useContext(AppContext)
    const [buttonActive, setButtonActive] = useState(false)
    const [showError, setShowError] = useState()
    const [showSetLocationModal, setShowSetLocationModal] = useState(false)
    const [addressData, setAddresData] = useState({
        title: "",
        coordinates: [],
        type: "",
        street_address: "",
        favorite: false,
        house_number: "",
        building_name: ""
    })

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
            type: "building_name",
            isRequired: true,
            errorMsg: "Enter valid Building name",
            validationString: RegEx.notEmpty,
            keyboardType: "default"

        },
        {
            id: 2,
            title: 'Home number',
            placeHolder: "e.g 456",
            type: "house_number",
            maxLenght: 100,
            errorMsg: "",
            isRequired: true,
            errorMsg: "Enter valid Home number",
            validationString: RegEx.notEmpty,
            keyboardType: "numeric"
        }
    ]

    useEffect(() => {
        setAddresData({
            coordinates: data?.coordinates,
            type: data?.type,
            street_address: data?.street_address,
            house_number: data?.house_number,
            building_name: data?.building_name
        })
    }, [data])


    useEffect(() => {
        if (
            addressData.type !== '' &&
            addressData.building_name !== "" &&
            addressData?.house_number !== "" &&
            addressData.street_address !== ""
        ) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [addressData]);

    return (
        <FullScreenModal
            isVisible={isVisible}
            buttonTitle={"Save address"}
            leftTitle="Address"
            hasCloseIcon
            setShowModal={setShowSheet}
            buttonActive={buttonActive}
            handleButtonPress={() => {
                handleEditAddress(addressData)
                setAddresData({
                    ...addressData,
                    title: "",
                    coordinates: [],
                    type: "",
                    street_address: "",
                    favorite: false,
                    house_number: "",
                    building_name: ""
                })
            }}
        >
            <ScrollView style={{}}>
                <View style={{ paddingBottom: verticalScale(16) }}>
                    <Text style={appStyles.smallTextBlack}>
                        Address type
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(10) }}>
                        {
                            addresTypeData.map((item) => {
                                const selected = addressData?.type === item.type
                                return (
                                    <TouchableOpacity key={item.id}
                                        style={{
                                            flexDirection: 'row',
                                            padding: moderateScale(9),
                                            gap: scale(5),
                                            borderWidth: moderateScale(1),
                                            borderRadius: moderateScale(6),
                                            borderColor: (selected && !isDark) ? uiColours.PRIMARY : (!selected && isDark) ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY,
                                            backgroundColor: selected ? uiColours.GOLDEN_LIGHT : null
                                        }}
                                        onPress={() => {
                                            setAddresData({
                                                ...addressData,
                                                type: item.type
                                            })
                                        }}
                                    >
                                        <Image source={item.icon} style={{
                                            height: moderateScale(20),
                                            width: moderateScale(20),
                                            tintColor: selected ? uiColours.PRIMARY : uiColours.GRAY_TEXT

                                        }} />
                                        <Text style={appStyles.smallTextGray}>{item.type}</Text>
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

                <View style={{ flex: 1, marginTop: verticalScale(16), marginBottom: verticalScale(60) }}>
                    <Text style={appStyles.smallTextBlack}>Set location</Text>
                    <TouchableOpacity
                        style={styles.setAddress}
                        onPress={() => {
                            setShowSetLocationModal(true)
                        }}
                    >
                        <View style={{}}>
                            <Images.locationPin />
                        </View>
                        <Text>
                            {addressData?.street_address ? addressData?.street_address : "Set location"}
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <SetLocationModal
                isVisible={showSetLocationModal}
                setShowModal={setShowSetLocationModal}
                showSelectfromMap={false}
                handleSelectFromMap={() => {

                }}
                handleSelectLocation={async (data, details = null) => {
                    if (data && data.place_id) {
                        try {
                            setShowSetLocationModal(false)
                            const placeId = data.place_id;
                            const apiKey = GOOGLE_MAP_API_KEY;
                            const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
                            const response = await fetch(detailsUrl);
                            const json = await response.json();
                            if (json.status === 'OK' && json.result && json.result.geometry) {
                                const { lat, lng } = json.result.geometry.location;
                                setAddresData({
                                    ...addressData,
                                    street_address: data?.description,
                                    coordinates: [lat, lng]
                                })
                            }

                        } catch (error) {
                            console.error('Error fetching place details:', error);
                            showGeneralError(isDark)
                        }
                    }
                }}
            />
        </FullScreenModal>
    )
}

export default EditAddressSheet