import React, { useCallback, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthRouteStrings, MainRouteStrings } from '../utils/Constents/RouteStrings';
import { screens } from '.';
import { getLocalData } from '../helper/AsyncStorage';
import { storageKeys } from '../helper/AsyncStorage/storageKeys';
import Geolocation from '@react-native-community/geolocation';
import Actions from '../redux/Actions';
import { useSocket } from '../context/AppContext';

const Stack = createNativeStackNavigator();

const PickertRoutes = () => {
    const { Socket } = useSocket()

    const getCurrentLocation = async (user) => {
        try {
            Geolocation.getCurrentPosition((position) => {
                const latitude = position?.coords?.latitude
                const longitude = position?.coords?.longitude
                Actions.currentLoaction({
                    latitude: latitude,
                    longitude: longitude
                })
                handleAppStateChange(user, latitude, longitude)
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
        // setTimeout(() => {
        const fetchData = async () => {
            const UserData = await getLocalData(storageKeys.userData);
            await getCurrentLocation(UserData);
        };
        const intervalId = setInterval(fetchData, 10000);
        return () => {
            clearInterval(intervalId);
        };

        // }, 2000);

    }, [])

    const handleUpdateLocationError = (data) => {
        console.log("update-user-location-error", data);
    }

    const handleUpdateLocationSuccess = (data) => {
        // console.log("'update-user-location-successfully", data);
    }


    useEffect(() => {
        Socket.on('update-user-location-error', handleUpdateLocationError)
        Socket.on("update-user-location-successfully", handleUpdateLocationSuccess)


        return () => {
            Socket.off('update-user-location-error', handleUpdateLocationError)
            Socket.off('update-user-location-successfully', handleUpdateLocationSuccess)

        }
    }, [Socket, handleUpdateLocationError, handleUpdateLocationSuccess])
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name={MainRouteStrings.PICKER_BOTTOM_ROUTES} component={screens.PICKER_BOTTOM_ROUTES} />
                <Stack.Screen name={MainRouteStrings.PICKER_FIND_DESTINATION} component={screens.PICKER_FIND_DESTINATION} />
                <Stack.Screen name={MainRouteStrings.SELECT_ADDRRESS_FROM_MAP} component={screens.SELECT_ADDRRESS_FROM_MAP} />
                <Stack.Screen name={MainRouteStrings.PICKER_ORDER_HISTORY} component={screens.PICKER_ORDER_HISTORY} />
                <Stack.Screen name={MainRouteStrings.WALLET_SCREEN} component={screens.WALLET_SCREEN} />
                <Stack.Screen name={MainRouteStrings.ADDRESS_SCREEN} component={screens.ADDRESS_SCREEN} />
                <Stack.Screen name={MainRouteStrings.PICKKER_RATING_AND_REVIEW} component={screens.PICKKER_RATING_AND_REVIEW} />
                <Stack.Screen name={MainRouteStrings.MANAGE_ACCOUNT} component={screens.MANAGE_ACCOUNT} />
                <Stack.Screen name={MainRouteStrings.EDIT_PROFILE} component={screens.EDIT_PROFILE} />
                <Stack.Screen name={MainRouteStrings.PICKUP_SCREEN} component={screens.PICKUP_SCREEN} />
                <Stack.Screen name={MainRouteStrings.WRITE_USER_REVIEW} component={screens.WRITE_USER_REVIEW} />
                <Stack.Screen name={MainRouteStrings.TRIP_DETAILS_SCREEN} component={screens.TRIP_DETAILS_SCREEN} />
                <Stack.Screen name={AuthRouteStrings.OTP_SCREEN} component={screens.OTP_SCREEN} />
                <Stack.Screen name={MainRouteStrings.PICKER_MESSAGES_SCREEN} component={screens.PICKER_MESSAGES_SCREEN} />
                <Stack.Screen name={MainRouteStrings.BECOME_PICKER} component={screens.BECOME_PICKER} />
                <Stack.Screen name={MainRouteStrings.TRAINING_SCREEN} component={screens.TRAINING_SCREEN} />
                <Stack.Screen name={MainRouteStrings.VEHICLE_SCREEN} component={screens.VEHICLE_SCREEN} />
                <Stack.Screen name={MainRouteStrings.BANK_ACCOUNT} component={screens.BANK_ACCOUNT} />
                <Stack.Screen name={MainRouteStrings.USER_REVIEW_WHEN_CANCELLED} component={screens.USER_REVIEW_WHEN_CANCELLED} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default PickertRoutes