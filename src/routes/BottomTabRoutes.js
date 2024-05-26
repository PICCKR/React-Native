import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Alert, Text } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { screens } from ".";
import { Images } from "../assets/images";
import { AppContext } from "../context/AppContext";
import Actions from "../redux/Actions";
import { MainRouteStrings } from "../utils/Constents/RouteStrings";
import { uiColours } from "../utils/Styles/uiColors";

const Tab = createBottomTabNavigator();


const BottomTabRoutes = () => {

    const { appStyles, setuserData, isDark, setIsLoggedIn } = useContext(AppContext)
    const userData = useSelector((state) => state?.userDataReducer?.userData)
    const navigation = useNavigation()

    // Function to handle tab press based on user data
    const handleTabPress = (screenName) => {
        if (userData?.token) {
            // User data exists, navigate to the specified screen
            navigation.navigate(screenName);
        } else {
            // User data does not exist
            Actions.isLoggedIn(false)
        }
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name={MainRouteStrings.USER_HOME_SCREEN} component={screens.USER_HOME_SCREEN}
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

            <Tab.Screen name={MainRouteStrings.FAVORITES_SCREEN} component={screens.FAVORITES_SCREEN}
                options={{
                    tabBarStyle: { backgroundColor: isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT },
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

                listeners={{
                    tabPress: () => handleTabPress(MainRouteStrings.FAVORITES_SCREEN),
                }}

            />

            <Tab.Screen name={MainRouteStrings.ACTIVITY_SCREEN} component={screens.ACTIVITY_SCREEN}
                options={{
                    tabBarStyle: { backgroundColor: isDark ? uiColours.DARK_BG : uiColours.WHITE_TEXT },
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
                listeners={{
                    tabPress: () => handleTabPress(MainRouteStrings.ACTIVITY_SCREEN),
                }}

            />

            <Tab.Screen name={MainRouteStrings.USER_PROFILE_SCREEN} component={screens.USER_PROFILE_SCREEN}
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
                listeners={{
                    tabPress: () => handleTabPress(MainRouteStrings.USER_PROFILE_SCREEN),
                }}

            />
        </Tab.Navigator>
    )
}

export default BottomTabRoutes