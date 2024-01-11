import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '../../../assets/images'
import styles from './Styles'
import InputText from '../../../components/InputText/InputText'
import { uiColours } from '../../../utils/Styles/uiColors'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
// import AddAddressSheet from "../AddressScreen/AddAddressSheet"
import { setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import SetLocationModal from '../../../components/SetLocationModal/SetLocationModal'
import { GOOGLE_MAP_API_KEY } from '../../../configs/google_map_api_key'
import { uiStrings } from '../../../utils/Constents/uiStrings'
import SheetFooter from '../../../components/SheetFooter/SheetFooter'
import AddAddressSheet from '../../UserScreens/AddressScreen/AddAddressSheet'


const PickerFindDestination = () => {
    const {
        appStyles,
        isDark,
        userData,
        setuserData,
        source,
        setSource,
        destination,
        setDestination,
        currentLocation
    } = useContext(AppContext)
    const navigation = useNavigation()

    // console.log("userData", userData);

    const [showSheet, setShowSheet] = useState({
        addAddress: false,
        setLocation: false
    })
    const [addressData, setAddresData] = useState({
        id: "",
        addressType: "",
        buildingName: "",
        homeNumber: "",
        location: "",
    })
    const [action, setAction] = useState("")
    const [buttonActive, setButtonActive] = useState(false)
    const recentDestinationData = [
        {
            title: "Harvard University",
            details: 'Massachusetts Hall, Cambridge, MA 02138',
            lat: 12.30536215259088,
            lng: 76.65516416694614
        },
        {
            title: "Houghton Library",
            details: 'Quincy Street &, Harvard St, Cambridge, MA 02138',
            lat: 12.30536215259088,
            lng: 76.65516416694614
        },
        {
            title: "Cambridge Historical Tours",
            details: '1400 Massachusetts Ave, Cambridge, MA 02138',
            lat: 12.30536215259088,
            lng: 76.65516416694614
        },
        {
            title: "John Harvard Statue",
            details: 'Harvard Yard, 1, Cambridge, MA 02138',
            lat: 12.30536215259088,
            lng: 76.65516416694614
        }
    ]

    const handleAddAddress = async () => {
        const newAddress = {
            id: userData.address.length + 1,
            addressType: addressData?.addressType,
            buildingName: addressData?.buildingName,
            homeNumber: addressData?.homeNumber,
            location: addressData?.location,
        }

        setuserData({ ...userData, address: [...userData?.address, newAddress] })
        setLocalData(storageKeys.userData, { ...userData, address: [...userData?.address, newAddress] })
        setShowSheet(false)
    }


    const handleSelectLocation = async (data, details = null) => {
        // console.log("DDD", data);
        if (data && data.place_id) {
            try {
                const placeId = data.place_id;
                const apiKey = GOOGLE_MAP_API_KEY;
                const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
                const response = await fetch(detailsUrl);
                const json = await response.json();

                if (json.status === 'OK' && json.result && json.result.geometry) {
                    const { lat, lng } = json.result.geometry.location;
                    if (action === "source") {
                        setSource({
                            lat: lat,
                            lng: lng,
                            location: data?.description
                        })
                    } else {
                        setDestination({
                            lat: lat,
                            lng: lng,
                            location: data?.description
                        })
                        navigation.goBack()
                    }

                    // Use lat and lng in your application as needed
                } else {
                    if (action === "source") {
                        setSource({
                            lat: "",
                            lng: "",
                            location: data?.description
                        })
                    } else if (action === "destination") {
                        setDestination({
                            lat: "",
                            lng: "",
                            location: data?.description
                        })
                    }
                }
                setShowSheet({
                    ...showSheet,
                    setLocation: false
                })
            } catch (error) {
                console.error('Error fetching place details:', error);
                Alert.alert("", uiStrings.commonError)
            }
        }

    }

    useEffect(() => {
        if (destination.location !== "" && source?.location !== "") {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }
    }, [destination, source])


    return (
        <SafeAreaView
            style={[appStyles?.container, { paddingVertical: verticalScale(16) }]}
        >
            <ScrollView>
                <View style={[styles.header, {
                    borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                }]}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Images.backArrow height={moderateScale(20)} width={moderateScale(20)} />
                    </TouchableOpacity>

                    <View>
                        <View style={[styles.inputContainer, {
                            borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                        }]}>
                            <View style={[styles.inputView]}>
                                <Images.source height={moderateScale(16)} width={moderateScale(16)} />
                                <TouchableOpacity
                                    style={[styles.locationView, commonStyles.bottomBorder,{
                                        borderColor:isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                                    }]}
                                    onPress={() => {
                                        setAction("source")
                                        setShowSheet({
                                            ...showSheet,
                                            setLocation: true
                                        })
                                    }}
                                >
                                    <Text style={appStyles.smallTextBlack}>
                                        {currentLocation.location === source.location ? "Current location" : source.location}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputView}>
                                <Images.locationPinRed height={moderateScale(16)} width={moderateScale(16)} />
                                <TouchableOpacity
                                    style={[styles.locationView]}
                                    onPress={() => {
                                        setAction("destination")
                                        setShowSheet({
                                            ...showSheet,
                                            setLocation: true
                                        })
                                    }}
                                >
                                    <Text style={appStyles.smallTextBlack}>
                                        {destination.location ? destination.location : "Find a destination"}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                </View>
                <View style={styles.savedLocationsView}>
                    <Text style={[appStyles.mediumTextBlack, {
                        paddingHorizontal: scale(16)
                    }]}>
                        Saved places
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: verticalScale(10) }}>
                        <View style={commonStyles.flexRowAlnCtr}>
                            <TouchableOpacity
                                style={[styles.AddButton, {
                                     marginLeft: scale(16),
                                     borderColor:isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                                    }]}
                                onPress={() => {
                                    setShowSheet({
                                        ...showSheet,
                                        addAddress: true
                                    })
                                }}
                            >
                                <Images.add height={moderateScale(12)} width={moderateScale(12)} />
                                <View>
                                    <Text style={appStyles.smallTextBlackBold}>
                                        Add New Address
                                    </Text>
                                    <Text style={appStyles.smallTextGray}>
                                        Save your favourite places
                                    </Text>
                                </View>

                            </TouchableOpacity>
                            <View style={{ paddingRight: scale(16), flexDirection: "row", gap: scale(10) }}>
                                {
                                    userData?.address?.map((item) => {
                                        // console.log("dsdsdsad", item);
                                        return (
                                            <TouchableOpacity
                                                key={item?.id}
                                                style={[styles.AddButton,{
                                                    borderColor:isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                                                }]}
                                                onPress={() => {
                                                    setDestination({
                                                        ...destination,
                                                        location: item?.location
                                                    })
                                                }}
                                            >
                                                {
                                                    item?.addressType === "Home" ? <Image source={Images.home} style={commonStyles.icon} /> :
                                                        <Image source={Images.work} style={commonStyles.icon} />
                                                }

                                                <View>
                                                    <Text style={appStyles.smallTextBlackBold}>
                                                        {item?.addressType}
                                                    </Text>
                                                    <Text ellipsizeMode="tail" numberOfLines={1} style={appStyles.smallTextGray}>
                                                        {item?.buildingName}
                                                    </Text>
                                                </View>

                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>

                        </View>

                    </ScrollView>
                </View>

                <View style={styles.recentDestinationView}>
                    <Text style={appStyles.mediumTextBlack}>Recent destination</Text>
                    {
                        recentDestinationData.map((item) => {
                            return (
                                <TouchableOpacity
                                    key={item.title}
                                    style={{ flexDirection: 'row', gap: scale(8) }}
                                    onPress={() => {
                                        setDestination({
                                            ...destination,
                                            lat: item.lat,
                                            location: item?.title,
                                            lng: item.lng
                                        })
                                    }}
                                >
                                    <Images.locationPinRed height={moderateScale(20)} width={moderateScale(20)} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={appStyles.smallTextBlackBold}>
                                            {item?.title}
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            {item?.details}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
            <AddAddressSheet
                isVisible={showSheet.addAddress}
                setShowSheet={setShowSheet}
                handleAddAddress={handleAddAddress}
                addressData={addressData}
                setAddresData={setAddresData}
                action={"add"}
            />
            <SetLocationModal
                setShowModal={setShowSheet}
                isVisible={showSheet.setLocation}

                handleSelectFromMap={() => {
                    setShowSheet({
                        ...showSheet,
                        setLocation: false
                    })
                    // console.log("sorce", source);
                    if (action === "destination" && (destination?.lat === "" || destination?.lng === "")) {
                        setDestination({
                            ...destination,
                            lat: source?.lat,
                            lng: source?.lng,
                            location: source?.location
                        })
                    }

                    // return
                    navigation.navigate(MainRouteStrings.SELECT_ADDRRESS_FROM_MAP, {
                        toScreen: MainRouteStrings.PICKER_HOME_SCREEN,
                        action:action,
                        geometry: (destination?.lat && destination?.lng) ? destination : source
                    })
                }}
                placeholder={action === "source" ? "Input source location" : "Input destination location"}
                handleSelectLocation={handleSelectLocation}
            />

            <SheetFooter
                buttonActive={buttonActive}
                buttonTitle="Set route"
                handleButtonPress={() => {
                    navigation.goBack()
                }}
            />
        </SafeAreaView>

    )
}

export default PickerFindDestination
