import { useColorScheme, Appearance, StyleSheet, Alert, AppState } from "react-native";
import React, { useCallback, useContext, useEffect, useMemo, useState, } from "react";
import { PermissionsAndroid, Platform } from 'react-native';
import { getLocalData } from "../helper/AsyncStorage";
import { storageKeys } from "../helper/AsyncStorage/storageKeys";
import { screenSize } from "../utils/Styles/CommonStyles";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { uiColours } from "../utils/Styles/uiColors";
import { useNavigation } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import Actions from "../redux/Actions";
import Geocoder from "react-native-geocoding";
import { GOOGLE_MAP_API_KEY } from "../configs/google_map_api_key";
import { io } from "socket.io-client";



export const AppContext = React.createContext();

export const useSocket = () => {
    const Socket = useContext(AppContext)
    // console.log("Socket", Socket);
    return Socket
}

const AppProvider = ({ children }) => {
    // const Socket = useMemo(() => io.connect("http://192.168.227.150:7071"), [])
    const Socket = useMemo(() => io.connect("https://dev.picckr.live", {
        path: "/sockets",
        secure: true,
        transports: ['websocket'],

    }), [])

    const getUserData = async () => {
        // to get user data
        const UserData = await getLocalData(storageKeys.userData)
        // to get new user status
        const newUser = await getLocalData(storageKeys.isNew)
        // check if user is new to the application
        // if we get undefined data the he is new user so set it to true else false
        if (newUser === undefined || newUser === null) {
            setisNew(true)
        } else {
            setisNew(false)
        }
        // if user data exist then set login to true to that user can directly
        // navigate to home screen
        if (UserData) {
            setuserData(UserData)
            if (UserData?.userRole[1]) {
                Socket.emit("driver-connect",
                    {
                        "userId": UserData?._id
                    }
                )
            } else {
                console.log("it is user");
            }

        }
    }

    const getCurrentLocation = async (user) => {
        try {
            Geolocation.getCurrentPosition((position) => {
                const latitude = position?.coords?.latitude
                const longitude = position?.coords?.longitude
                // convert lat lng to address
                Geocoder.init(GOOGLE_MAP_API_KEY);
                Geocoder.from(latitude, longitude)
                    .then(async json => {
                        const adddress = json.results[0]?.formatted_address
                        setCurrentLocation({
                            ...currentLocation,
                            location: adddress,
                            lat: latitude,
                            lng: longitude
                        })
                        if (user) {
                            await handleAppStateChange(user, latitude, longitude)
                        }

                    })
                    .catch((error) => {
                        console.log('errr', error);
                        // Alert.alert("", "Something went wrong please try again")
                    });

                // Actions.currentLoaction(position)
            },
                (error) => {
                    console.log('Error getting location:', error);
                },
            )
        } catch (error) {
            console.log("error===>", error);
        }

    }


    const handleAppStateChange = (user, lat, lng) => {
        // console.log("usersss", user?._id, lat, lng);
        Socket.emit("update-user-location", {
            "userId": user?._id,
            "longitude": lng,
            "latitude": lat
        })
    }

    useEffect(() => {
        getUserData()
        getCurrentLocation()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const UserData = await getLocalData(storageKeys.userData);
            await getCurrentLocation(UserData);
        };

        const intervalId = setInterval(fetchData, 15000);

        return () => {
            clearInterval(intervalId);
        };

    }, [])


    const handleUpdateLocationError = (data) => {
        console.log("handleUpdateLocationError", data);
    }

    const handleUpdateLocationSuccess = (data) => {
        // console.log("handleUpdateLocationSuccess", data);
    }

    const handleConnectDriversuccess = useCallback((data) => {
        // console.log("driver-connect-successfully", data);
    })



    useEffect(() => {
        Socket.on("driver-connect-successfully", handleConnectDriversuccess)
        Socket.on('update-user-location-error', handleUpdateLocationError)
        Socket.on("update-user-location-successfully", handleUpdateLocationSuccess)

        return () => {
            Socket.off("driver-connect-successfully", handleConnectDriversuccess)
            Socket.off('update-user-location-error', handleUpdateLocationError)
            Socket.off('update-user-location-successfully', handleUpdateLocationSuccess)
        }
    }, [Socket, handleUpdateLocationError, handleUpdateLocationSuccess, handleConnectDriversuccess])



    const isDarkSystem = useColorScheme() === "dark"

    useEffect(() => {
        setIsDark(isDarkSystem)
    }, [isDarkSystem])


    // socket listners


    // state variables
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setuserData] = useState(null)
    const [isNew, setisNew] = useState(null)
    const [isDark, setIsDark] = useState(isDarkSystem)
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const [vehicleType, setVehicleType] = useState([])
    const [fromGuestUserScreen, setFromGuestUserScreen] = useState(null)
    const [newRequest, setNewRequest] = useState([])
    const [bidPlaced, setBidPlaced] = useState(false)



    const [orderDeatils, setOrderDeatils] = useState({
        recipientData: {},
        pickUpData: {},
        itemsDetails: {}
    })

    const [destination, setDestination] = useState({
        lat: "",
        lng: "",
        location: ""
    })

    const [source, setSource] = useState({
        lat: "",
        lng: "",
        location: "Current location"
    })

    const [currentLocation, setCurrentLocation] = useState({
        lat: "",
        lng: "",
        location: ""
    })

    // commanly used appliaction styles
    const appStyles = {

        smallTextBlack: {
            color: isDark ? uiColours?.WHITE_TEXT : uiColours?.BLACK_TEXT,
            fontSize: scale(12),
            fontFamily: "Poppins-Regular"
        },
        smallTextBlackBold: {
            color: isDark ? uiColours?.WHITE_TEXT : uiColours?.BLACK_TEXT,
            fontSize: scale(12),
            fontFamily: "Poppins-Bold"
        },

        smallTextWhite: {
            color: uiColours?.WHITE_TEXT,
            fontSize: scale(12),
            fontFamily: "Poppins-Regular"
        },
        smallTextPrimary: {
            color: uiColours?.PRIMARY,
            fontSize: scale(12),
            fontFamily: "Poppins-Regular"
        },
        smallTextPrimaryBold: {
            color: uiColours?.PRIMARY,
            fontSize: scale(12),
            fontFamily: "Poppins-Bold"
        },

        smallTextGray: {
            color: uiColours?.GRAY_TEXT,
            fontSize: scale(12),
            fontFamily: "Poppins-Regular",
        },
        smallTextGrayBold: {
            color: uiColours?.GRAY_TEXT,
            fontSize: scale(12),
            fontFamily: "Poppins-Bold"
        },

        mediumTextBlack: {
            color: isDark ? uiColours?.WHITE_TEXT : uiColours?.BLACK_TEXT,
            fontSize: scale(14),
            fontFamily: "Poppins-Regular"
        },

        mediumTextWhite: {
            color: uiColours?.WHITE_TEXT,
            fontSize: scale(14),
            fontFamily: "Poppins-Regular"
        },

        mediumTextPrimary: {
            color: uiColours?.PRIMARY,
            fontSize: scale(14),
            fontFamily: "Poppins-Regular"
        },

        mediumTextBlackBold: {
            color: isDark ? uiColours?.WHITE_TEXT : uiColours?.BLACK_TEXT,
            fontSize: scale(14),
            fontFamily: "Poppins-Bold"
        },

        mediumTextBlackGray: {
            color: uiColours?.GRAY_TEXT,
            fontSize: scale(14),
            fontFamily: "Poppins-Regular"
        },

        mediumTextWhiteBold: {
            color: uiColours?.WHITE_TEXT,
            fontSize: scale(14),
            fontFamily: "Poppins-Bold"
        },

        mediumTextPrimaryBold: {
            color: uiColours?.PRIMARY,
            fontSize: scale(14),
            fontFamily: "Poppins-Bold"
        },

        largeTextBalck: {
            color: uiColours?.BLACK_TEXT,
            fontSize: scale(16),
            fontFamily: "Poppins-Regular"
        },

        largeTextWhite: {
            color: uiColours?.WHITE_TEXT,
            fontSize: scale(16),
            fontFamily: "Poppins-Regular"
        },

        largeTextBalckBold: {
            color: uiColours?.BLACK_TEXT,
            fontSize: scale(16),
            fontFamily: "Poppins-Bold"
        },
        largeTextGray: {
            color: uiColours?.GRAY_TEXT,
            fontSize: scale(16),
            fontFamily: "Poppins-Regular"
        },

        largeTextWhiteBold: {
            color: uiColours?.WHITE_TEXT,
            fontSize: scale(16),
            fontFamily: "Poppins-Bold"
        },

        extraLargeTexPrimary: {
            color: uiColours?.PRIMARY,
            fontSize: scale(32),
            fontFamily: "Poppins-Bold"
        },
        extraLargeTexWhite: {
            color: uiColours?.WHITE_TEXT,
            fontSize: scale(32),
            fontFamily: "Poppins-Bold"
        },
        extraLargeTexGray: {
            color: uiColours?.GRAY_TEXT,
            fontSize: scale(32),
            fontFamily: "Poppins-Bold"
        },

        container: {
            backgroundColor: isDark ? uiColours?.DARK_BG : uiColours.WHITE_TEXT,
            flex: 1,
            width: screenSize.width,
        },
        containerPadding: {
            backgroundColor: isDark ? uiColours?.DARK_BG : uiColours.WHITE_TEXT,
            paddingHorizontal: moderateScale(16),
            flex: 1,
        },
        bottomBorder: {
            borderBottomWidth: moderateScale(1),
            borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY,
        },
        borderColor: {
            borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY,
        }
    }

    // storing the color mode of the mobile 

    // setIsDark(isDark1)

    return (
        <AppContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                appStyles,
                setisNew,
                isNew,
                userData,
                setuserData,
                isDark,
                setIsDark,
                destination,
                setDestination,
                currentLocation,
                setCurrentLocation,
                source,
                setSource,
                selectedVehicle,
                setSelectedVehicle,
                vehicleType,
                setVehicleType,
                Socket,
                orderDeatils, setOrderDeatils,
                fromGuestUserScreen, setFromGuestUserScreen,
                newRequest, setNewRequest,
                bidPlaced, setBidPlaced
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
