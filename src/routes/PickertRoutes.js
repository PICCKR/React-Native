import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainRouteStrings } from '../utils/Constents/RouteStrings';
import { screens } from '.';

const Stack = createNativeStackNavigator();

const PickertRoutes = () => {
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default PickertRoutes