import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthRouteStrings, MainRouteStrings } from '../utils/Constents/RouteStrings';
import { screens } from '.';
import { AppContext } from '../context/AppContext';
const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
    const {isNew} = useContext(AppContext)

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                {isNew && <Stack.Screen name={AuthRouteStrings.ON_BOARDING} component = {screens.ON_BOARDING} />}
                <Stack.Screen name={AuthRouteStrings.WELCOME_SCREEN} component={screens.WELCOME_SCREEN} />
                <Stack.Screen name={AuthRouteStrings.LOGIN_SCREEN} component={screens.LOGIN_SCREEN} />
                <Stack.Screen name={AuthRouteStrings.FORGOT_PASSWORD} component={screens.FORGOT_PASSWORD} />
                <Stack.Screen name={AuthRouteStrings.USER_SIGN_UP} component={screens.USER_SIGN_UP} />
                <Stack.Screen name={AuthRouteStrings.OTP_SCREEN} component={screens.OTP_SCREEN} />
                <Stack.Screen name={AuthRouteStrings.CHANGE_PASSWORD} component={screens.CHANGE_PASSWORD} />
                <Stack.Screen name={AuthRouteStrings.PROFILE_INFORMATION} component={screens.PROFILE_INFORMATION} />
                <Stack.Screen name={AuthRouteStrings.KYC_SCREEN} component={screens.KYC_SCREEN} />
                <Stack.Screen name={AuthRouteStrings.APPROVAL_SCREEN} component={screens.APPROVAL_SCREEN} />
                <Stack.Screen name={MainRouteStrings.SELECT_ADDRRESS_FROM_MAP} component={screens.SELECT_ADDRRESS_FROM_MAP} />
              
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthRoutes