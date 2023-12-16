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
                <Stack.Screen name={MainRouteStrings.PICKER_HOME_SCREEN} component={screens.PICKER_HOME_SCREEN} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default PickertRoutes