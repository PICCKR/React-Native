import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import Modal from 'react-native-modal'
import { AppContext } from '../../context/AppContext'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import styles from './Styles'
import { Images } from '../../assets/images'
import { GOOGLE_MAP_API_KEY } from '../../configs/google_map_api_key'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { uiColours } from '../../utils/Styles/uiColors'
import Header from '../Header/Header'
import { screenSize } from '../../utils/Styles/CommonStyles'

const SetLocationModal = ({
    setShowModal,
    isVisible,
    handleSelectFromMap,
    placeholder,
    handleSelectLocation,
    showSelectfromMap = true
}) => {
    const { appStyles, isDark } = useContext(AppContext)
    const inputRef = useRef(null);

    return (
        <Modal
            isVisible={isVisible}
            style={{ margin: 0 }}
            animationIn="fadeInUp"
            animationOut="fadeOut"
            onBackdropPress={() => {
                setShowModal(false)
            }}
        >
            <SafeAreaView style={[appStyles?.container, { width: screenSize.width }]}>
                <View style={[appStyles?.containerPadding, { width: screenSize.width }]}>
                    <Header
                        centerTitle="Select your location"
                        headerContainer={{ alignSelf: "center", }}
                        hasCloseIcon
                        handlerRightViewPress={() => {
                            setShowModal(false)
                        }}
                    />
                    {/* <View style={{ position: "absolute", top: verticalScale(70), left: scale(25) }}>
                        <Images.locationPin />
                    </View> */}
                    <GooglePlacesAutocomplete
                        textInputProps={{
                            autoFocus: true,
                        }}
                        renderLeftButton={() =>
                            <View style={{ right: scale(10) }}>
                                <Images.locationPin />
                            </View>
                        }
                        inbetweenCompo={showSelectfromMap ?
                            <TouchableOpacity
                                style={styles.selectMap}
                                onPress={handleSelectFromMap}
                            >
                                <Images.selectMap />
                                <Text>
                                    Select via map
                                </Text>
                            </TouchableOpacity> :
                            <View></View>
                        }
                        listLoaderComponent={<ActivityIndicator ></ActivityIndicator>}
                        placeholder={placeholder}
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
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default SetLocationModal