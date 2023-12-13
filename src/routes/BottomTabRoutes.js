import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { Text } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { screens } from ".";
import { Images } from "../assets/images";
import { AppContext } from "../context/AppContext";
import { MainRouteStrings } from "../utils/Constents/RouteStrings";

const Tab = createBottomTabNavigator();

const BottomTabRoutes = () => {
    const { appStyles } = useContext(AppContext)
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name={MainRouteStrings.USER_HOME_SCREEN} component={screens.USER_HOME_SCREEN}
                options={{
                    tabBarStyle: {},
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

            <Tab.Screen name={MainRouteStrings.FAVORITES_SCREEN} component={screens.FAVORITES_SCREEN}
                options={{
                    tabBarStyle: {},
                    tabBarIcon: ({ focused }) => (
                        focused ? <Images.heartFill width={moderateScale(20)} height={moderateScale(20)} /> : <Images.heartOutline width={moderateScale(20)} height={moderateScale(20)} />
                    ),
                    tabBarLabel: ({ focused, color, size }) => (
                        <Text
                            style={[focused ? appStyles.smallTextPrimary : appStyles.smallTextGray, { fontSize: scale(10) }]}
                        >
                            Favorites
                        </Text>
                    ),
                }}

            />

            <Tab.Screen name={MainRouteStrings.ACTIVITY_SCREEN} component={screens.ACTIVITY_SCREEN}
                options={{
                    tabBarStyle: {},
                    tabBarIcon: ({ focused }) => (
                        focused ? <Images.activityFill width={moderateScale(20)} height={moderateScale(20)} /> : <Images.activityOutline width={moderateScale(20)} height={moderateScale(20)} />
                    ),
                    tabBarLabel: ({ focused, color, size }) => (
                        <Text
                            style={[focused ? appStyles.smallTextPrimary : appStyles.smallTextGray, { fontSize: scale(10) }]}
                        >
                            Activity
                        </Text>
                    ),
                }}

            />

            <Tab.Screen name={MainRouteStrings.USER_PROFILE_SCREEN} component={screens.USER_PROFILE_SCREEN}
                options={{
                    tabBarStyle: {},
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

export default BottomTabRoutes