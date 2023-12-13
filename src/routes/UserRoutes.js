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
                {/* <Stack.Screen name={MainRouteStrings.BOTTOM_TAB_ROUTES} component={screens.BOTTOM_TAB_ROUTES} /> */}
                {/* <Stack.Screen name={MainRouteStrings.BECOME_PICKER} component={screens.BECOME_PICKER} /> */}
                {/* <Stack.Screen name={AuthRouteStrings.OTP_SCREEN} component={screens.OTP_SCREEN} /> */}
                <Stack.Screen name={MainRouteStrings.VEHICLE_VERIFICATION} component={screens.VEHICLE_VERIFICATION} />
                <Stack.Screen name={MainRouteStrings.PICKER_ACCOUNT} component={screens.PICKER_ACCOUNT} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default UserRoutes