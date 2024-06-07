import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import styles from './Styles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { AppContext } from '../../../context/AppContext'
import Header from '../../../components/Header/Header'
import { Images } from '../../../assets/images'
import { uiColours } from '../../../utils/Styles/uiColors'
import { GOOGLE_MAP_API_KEY } from '../../../configs/google_map_api_key'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import { uiStrings } from '../../../utils/Constents/uiStrings'
import { screenSize } from '../../../utils/Styles/CommonStyles'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'

const SetLocationScreen = ({
    route
}) => {

    const from = route?.params?.from

    const navigation = useNavigation()

    const { appStyles, isDark, setSource, setDestination, destination, source } = useContext(AppContext)
    const inputRef = useRef(null);

    const handleSelectFromMap = () => {
        if (from === "destination" && (destination?.lat === "" || destination?.lng === "")) {
            setDestination({
                ...destination,
                lat: source?.lat,
                lng: source?.lng,
                location: source?.location
            })
        }

        // return
        navigation.navigate(MainRouteStrings.SELECT_ADDRRESS_FROM_MAP, {
            toScreen: from === "source" ? MainRouteStrings.FIND_DESTINATON : MainRouteStrings.SET_DESTINATION,
            geometry: (destination?.lat && destination?.lng) ? destination : source,
        })
    }

    const handleSelectLocation = async (data, details = null) => {
        if (data && data.place_id) {
            try {
                const placeId = data.place_id;
                const apiKey = GOOGLE_MAP_API_KEY;
                const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
                const response = await fetch(detailsUrl);
                const json = await response.json();

                if (json.status === 'OK' && json.result && json.result.geometry) {
                    const { lat, lng } = json.result.geometry.location;
                    if (from === "source") {
                        setSource({
                            lat: lat,
                            lng: lng,
                            location: data?.description
                        })
                        navigation.navigate(MainRouteStrings.FIND_DESTINATON)
                    } else {
                        setDestination({
                            lat: lat,
                            lng: lng,
                            location: data?.description
                        })
                        navigation.navigate(MainRouteStrings.SET_DESTINATION)
                    }

                    // Use lat and lng in your application as needed
                }

            } catch (error) {
                console.error('Error fetching place details:', error);
                Alert.alert("", uiStrings.commonError)
            }
        }

    }

    return (
        <WrapperContainer
            centerTitle="Select your location"
            headerContainer={{ alignSelf: "center", }}
            showBackButton
            showFooterButton={false}
            handleBack={() => {
                navigation.goBack()
            }}
        >
            <GooglePlacesAutocomplete
                textInputProps={{
                    autoFocus: true,
                }}
                renderLeftButton={() =>
                    <View style={{ right: scale(10) }}>
                        <Images.locationPin />
                    </View>
                }
                inbetweenCompo={
                    <TouchableOpacity
                        style={styles.selectMap}
                        onPress={handleSelectFromMap}
                    >
                        <Images.selectMap />
                        <Text>
                            Select via map
                        </Text>
                    </TouchableOpacity>
                }
                listLoaderComponent={<ActivityIndicator ></ActivityIndicator>}
                placeholder={from === "source" ? "Enter your source location" : "Enter your destination"}
                keepResultsAfterBlur
                ref={inputRef}
                onPress={handleSelectLocation}

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
                        borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY,
                        marginTop: verticalScale(5),
                        paddingLeft: scale(20),
                        alignItems: "center"
                    },
                    textInput: {
                        backgroundColor: isDark ? uiColours.DARK_BG : null,
                    },
                    row: {
                        backgroundColor: isDark ? uiColours.DARK_BG : null,
                    },
                    description: {
                        fontWeight: 'bold',
                    },
                    poweredContainer: {
                        backgroundColor: isDark ? uiColours.DARK_BG : null,
                    },
                    predefinedPlacesDescription: {
                        backgroundColor: isDark ? uiColours.DARK_BG : null,
                        color: '#1faadb',
                    },
                }}
            />
        </WrapperContainer>
    )
}

export default SetLocationScreen