import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthRouteStrings, MainRouteStrings } from '../utils/Constents/RouteStrings';
import { screens } from '.';

const Stack = createNativeStackNavigator();
const UserRoutes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name={MainRouteStrings.BOTTOM_TAB_ROUTES} component={screens.BOTTOM_TAB_ROUTES} />
                <Stack.Screen name={MainRouteStrings.BECOME_PICKER} component={screens.BECOME_PICKER} />
                <Stack.Screen name={AuthRouteStrings.OTP_SCREEN} component={screens.OTP_SCREEN} />
                <Stack.Screen name={MainRouteStrings.VEHICLE_VERIFICATION} component={screens.VEHICLE_VERIFICATION} />
                <Stack.Screen name={MainRouteStrings.PICKER_ACCOUNT} component={screens.PICKER_ACCOUNT} />
                <Stack.Screen name={MainRouteStrings.TRAINING_SCREEN} component={screens.TRAINING_SCREEN} />
                <Stack.Screen name={MainRouteStrings.PICKER_DETAILS} component={screens.PICKER_DETAILS} />
                <Stack.Screen name={MainRouteStrings.ACTIVITY_SUMMERY} component={screens.ACTIVITY_SUMMERY} />
                <Stack.Screen name={MainRouteStrings.DISPUTE_SCREEN} component={screens.DISPUTE_SCREEN} />
                <Stack.Screen name={MainRouteStrings.PICKER_REVIEW_WHEN_CANCELLED} component={screens.PICKER_REVIEW_WHEN_CANCELLED} />
                <Stack.Screen name={MainRouteStrings.SET_DESTINATION} component={screens.SET_DESTINATION} />
                <Stack.Screen name={MainRouteStrings.ADDRESS_SCREEN} component={screens.ADDRESS_SCREEN} />
                <Stack.Screen name={MainRouteStrings.PAYMENT_METHOD} component={screens.PAYMENT_METHOD} />
                <Stack.Screen name={MainRouteStrings.RATING_AND_REVIEW} component={screens.RATING_AND_REVIEW} />
                <Stack.Screen name={MainRouteStrings.USER_KYC_SCREEN} component={screens.USER_KYC_SCREEN} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default UserRoutes