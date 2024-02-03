import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Alert, Text } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { screens } from ".";
import { Images } from "../assets/images";
import { AppContext } from "../context/AppContext";
import { MainRouteStrings } from "../utils/Constents/RouteStrings";
import { uiColours } from "../utils/Styles/uiColors";

const Tab = createBottomTabNavigator();


const PickerBottomTabRoutes = () => {

    const { appStyles, isDark } = useContext(AppContext)

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name={MainRouteStrings.PICKER_HOME_SCREEN} component={screens.PICKER_HOME_SCREEN}
                options={{

                    tabBarStyle: { backgroundColor: isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT },
                    tabBarIcon: ({ focused }) => (
                        focused ? <Images.ExploreFill width={moderateScale(20)} height={moderateScale(20)} /> : <Images.search width={moderateScale(20)} height={moderateScale(20)} />
                    ),

                    tabBarLabel: ({ focused, color, size }) => (
                        <Text
                            style={[focused ? appStyles.smallTextPrimary : appStyles.smallTextGray, { fontSize: scale(10) }]}
                        >
                            Explore
                        </Text>
                    ),

                }}
            />

            <Tab.Screen name={MainRouteStrings.TRIPS_SCREEN} component={screens.TRIPS_SCREEN}
                options={{
                    tabBarStyle: { backgroundColor: isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT },
                    tabBarIcon: ({ focused }) => (
                        focused ? <Images.activityFill width={moderateScale(20)} height={moderateScale(20)} /> : <Images.activityOutline width={moderateScale(20)} height={moderateScale(20)} />
                    ),
                    tabBarLabel: ({ focused, color, size }) => (
                        <Text
                            style={[focused ? appStyles.smallTextPrimary : appStyles.smallTextGray, { fontSize: scale(10) }]}
                        >
                            Trips
                        </Text>
                    ),
                }}

            />

            <Tab.Screen name={MainRouteStrings.PICKER_CHAT_SCREEN} component={screens.PICKER_CHAT_SCREEN}
                options={{
                    tabBarStyle: { backgroundColor: isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT },
                    tabBarIcon: ({ focused }) => (
                        focused ? <Images.mesageOutline width={moderateScale(20)} height={moderateScale(20)} /> : <Images.mesageOutline width={moderateScale(20)} height={moderateScale(20)} />
                    ),
                    tabBarLabel: ({ focused, color, size }) => (
                        <Text
                            style={[focused ? appStyles.smallTextPrimary : appStyles.smallTextGray, { fontSize: scale(10) }]}
                        >
                            Message
                        </Text>
                    ),
                }}
            />

            <Tab.Screen name={MainRouteStrings.PICKER_PROFILE} component={screens.PICKER_PROFILE}
                options={{
                    tabBarStyle: { backgroundColor: isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT },
                    tabBarIcon: ({ focused }) => (
                        focused ? <Images.profile width={moderateScale(20)} height={moderateScale(20)} /> : <Images.profileOutline width={moderateScale(20)} height={moderateScale(20)} />
                    ),
                    tabBarLabel: ({ focused, color, size }) => (
                        <Text
                            style={[focused ? appStyles.smallTextPrimary : appStyles.smallTextGray, { fontSize: scale(10) }]}
                        >
                            Profile
                        </Text>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default PickerBottomTabRoutes