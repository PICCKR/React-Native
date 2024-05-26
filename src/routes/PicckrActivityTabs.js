import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { screens } from '.';
import { StyleSheet } from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { uiColours } from '../utils/Styles/uiColors';
import { MainRouteStrings } from '../utils/Constents/RouteStrings';

const Tab = createMaterialTopTabNavigator();

function PicckrActivityTabs() {
    const { appStyles, isDark } = useContext(AppContext)
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarContentContainerStyle: {},
                tabBarLabelStyle: [appStyles.smallTextBlackBold, { textTransform: 'none' }],
                tabBarIndicatorStyle: { backgroundColor: uiColours.PRIMARY },
                tabBarShowLabel: true,
                tabBarStyle: {
                    backgroundColor: isDark ? uiColours?.DARK_BG : uiColours.WHITE_TEXT,
                },

            }}
        >
            <Tab.Screen name={MainRouteStrings.REQUEST_TAB} component={screens.REQUEST_TAB} />
            <Tab.Screen name={MainRouteStrings.PICKER_ON_GOING_TRIPS} component={screens.PICKER_ON_GOING_TRIPS} />
            <Tab.Screen name={MainRouteStrings.PICKER_RECENT_TRIPS} component={screens.PICKER_RECENT_TRIPS} />
        </Tab.Navigator >
    );
}
const styles = StyleSheet.create({
    tabBarLabelStyle: {
        textTransform: 'none',
        fontSize: scale(12),
        fontFamily: "Poppins-Regular",
        color: '#000',
    },
    tabBarStyle: {
        elevation: 1
    },
})

export default PicckrActivityTabs