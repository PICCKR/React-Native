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

    const { appStyles, userData, setuserData, isDark } = useContext(AppContext)
    const navigation = useNavigation()

    // Function to handle tab press based on user data
    const handleTabPress = (screenName) => {
        if (userData?.type === "user") {
            // User data exists, navigate to the specified screen
            navigation.navigate(screenName);
        } else {
            // User data does not exist
            setuserData(null)
        }
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name={MainRouteStrings.PICKER_HOME_SCREEN} component={screens.PICKER_HOME_SCREEN}
                options={{
                    
                    tabBarStyle: {backgroundColor : isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT},
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
                    tabBarStyle: {backgroundColor : isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT},
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

                // listeners={{
                //     tabPress: () => handleTabPress(MainRouteStrings.FAVORITES_SCREEN),
                // }}

            />

            <Tab.Screen name={MainRouteStrings.PICKER_MESSAGES_SCREEN} component={screens.PICKER_MESSAGES_SCREEN}
                options={{
                    tabBarStyle: {backgroundColor : isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT},
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
                // listeners={{
                //     tabPress: () => handleTabPress(MainRouteStrings.ACTIVITY_SCREEN),
                // }}

            />

            <Tab.Screen name={MainRouteStrings.PICKER_PROFILE} component={screens.PICKER_PROFILE}
                options={{
                    tabBarStyle: {backgroundColor : isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT},
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
                // listeners={{
                //     tabPress: () => handleTabPress(MainRouteStrings.USER_PROFILE_SCREEN),
                // }}

            />
        </Tab.Navigator>
    )
}

export default PickerBottomTabRoutes