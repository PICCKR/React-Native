import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { uiColours } from '../../../utils/Styles/uiColors'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import SheetFooter from '../../../components/SheetFooter/SheetFooter'
import Actions from '../../../redux/Actions'
import { apiGet, apiPost } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import { useSelector } from 'react-redux'


const FindDestination = () => {

    const {
        appStyles,
        isDark,
        source,
        setSource,
        destination,
        setDestination,
    } = useContext(AppContext)
    const navigation = useNavigation()

    const userData = useSelector((state) => state?.userDataReducer?.userData)

    const [buttonActive, setButtonActive] = useState(false)
    const [recentDestinationData, setRecentDestinationData] = useState([])


    const getLasbookings = () => {
        apiGet(`${endPoints.GET_LAST_FIVE_BOOKINGS}/${userData?._id}`).then((res) => {
            // console.log("res in 5 booking", res?.data, res?.status);
            if (res?.status === 200) {
                setRecentDestinationData(res?.data?.data)
            }
        }).catch((error) => {
            console.log("error in last 5 bookins", error);
        })
    }

    useEffect(() => {
        if (destination.location !== "" && source?.location !== "") {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }
    }, [destination, source])

    useEffect(() => {
        if ((recentDestinationData.length <= 0 && userData?.token)) {
            getLasbookings()
        }

    }, [])


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
                                    style={[styles.locationView, commonStyles.bottomBorder, {
                                        borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                                    }]}
                                    onPress={() => {
                                        navigation.navigate(MainRouteStrings.SET_LOCATION_SCREEN, {
                                            from: "source"
                                        })
                                    }}
                                >
                                    <Text style={appStyles.smallTextBlack}>
                                        {source.location ? source.location : "Select your source location"}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputView}>
                                <Images.locationPinRed height={moderateScale(16)} width={moderateScale(16)} />
                                <TouchableOpacity
                                    style={[styles.locationView]}
                                    onPress={() => {
                                        navigation.navigate(MainRouteStrings.SET_LOCATION_SCREEN, {
                                            from: "destination"
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
                {userData?.token && <View style={styles.savedLocationsView}>
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
                            {userData?.addresses?.length < 3 && <TouchableOpacity
                                style={[styles.AddButton, {
                                    marginLeft: scale(16),
                                    borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                                }]}
                                onPress={() => {
                                    // setShowSheet({
                                    //     ...showSheet,
                                    //     addAddress: true
                                    // })
                                    navigation.navigate(MainRouteStrings.ADD_ADDRESS, {
                                        action: "add",

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

                            </TouchableOpacity>}
                            <View style={{ paddingRight: scale(16), flexDirection: "row", gap: scale(10) }}>
                                {
                                    userData?.addresses?.map((item) => {
                                        // console.log("dsdsdsad", item);
                                        return (
                                            <TouchableOpacity
                                                key={item?._id}
                                                style={[styles.AddButton, {
                                                    borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                                                }]}
                                                onPress={() => {
                                                    setDestination({
                                                        ...destination,
                                                        lat: item?.coordinates[0],
                                                        lng: item?.coordinates[1],
                                                        location: item?.street_address
                                                    })
                                                }}
                                            >
                                                {
                                                    item?.type === "Home" ? <Image source={Images.home} style={commonStyles.icon} /> :
                                                        <Image source={Images.work} style={commonStyles.icon} />
                                                }

                                                <View style={{ width: '90%' }}>
                                                    <Text style={appStyles.smallTextBlackBold}>
                                                        {item?.type}
                                                    </Text>
                                                    <Text ellipsizeMode="tail" numberOfLines={1} style={appStyles.smallTextGray}>
                                                        {item?.street_address}
                                                    </Text>
                                                </View>

                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>

                        </View>

                    </ScrollView>
                </View>}

                {userData?.token && <View style={styles.recentDestinationView}>
                    <Text style={appStyles.mediumTextBlack}>Recent destination</Text>
                    {
                        recentDestinationData.map((item) => {
                            return (
                                <TouchableOpacity
                                    key={item._id}
                                    style={{ flexDirection: 'row', gap: scale(8) }}
                                    onPress={() => {
                                        // console.log("item?.dropOffLocation[0]", item?.dropOffLocation?.coordinates[0]);
                                        setDestination({
                                            ...destination,
                                            lat: item?.dropOffLocation?.coordinates[0],
                                            location: item?.dropOffAddress,
                                            lng: item?.dropOffLocation?.coordinates[1]
                                        })
                                    }}
                                >
                                    <Images.locationPinRed height={moderateScale(20)} width={moderateScale(20)} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={appStyles.smallTextBlackBold}>
                                            {item?.dropOffAddress}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>}
            </ScrollView>

            <SheetFooter
                buttonActive={buttonActive}
                buttonTitle="Next"
                handleButtonPress={() => {
                    navigation.navigate(MainRouteStrings.SET_DESTINATION)
                }}
            />
        </SafeAreaView>

    )
}

export default FindDestination
