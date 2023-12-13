
import ApprovalScreen from "../screens/AuthScreens/ApprovalScreen/ApprovalScreen";
import BecomePicker from "../screens/UserScreens/BecomePicker/BecomePicker";
import ForgotPassword from "../screens/AuthScreens/ForgotPassword/ForgotPassword";
import KycScreen from "../screens/AuthScreens/KycScreen/KycScreen";
import LoginScreen from "../screens/AuthScreens/LoginScreen/LoginScreen";
import OnBoardingScreen from "../screens/AuthScreens/OnBoardingScreen/OnBoardingScreen";
import OtpScreen from "../screens/AuthScreens/OtpScreen/OtpScreen";
import ProfileInformation from "../screens/AuthScreens/ProfileInformation/ProfileInformation";
import UserSignupScreen from "../screens/AuthScreens/SignupScreen/UserSignupScreen";
import WelcomeScreen from "../screens/AuthScreens/WelcomeScreen/WelcomeScreen";
import ActivityScreen from "../screens/UserScreens/ActivityScreen/ActivityScreen";
import FavoritesScreen from "../screens/UserScreens/FavoritesScreen/FavoritesScreen";
import UserHomeScreen from "../screens/UserScreens/UserHomeScreen/UserHomeScreen";
import UserProfileScreen from "../screens/UserScreens/UserProfileScreen/UserProfileScreen";
import BottomTabRoutes from "./BottomTabRoutes";
import VehicleVerification from "../screens/UserScreens/VehicleVerification/VehicleVerification";
import PickerAccount from "../screens/UserScreens/PickerAccount/PickerAccount";

export const screens = {
    USER_HOME_SCREEN: UserHomeScreen,
    LOGIN_SCREEN: LoginScreen,
    ON_BOARDING: OnBoardingScreen,
    WELCOME_SCREEN: WelcomeScreen,
    FORGOT_PASSWORD:ForgotPassword,
    USER_SIGN_UP:UserSignupScreen,
    OTP_SCREEN:OtpScreen,
    PROFILE_INFORMATION:ProfileInformation,
    KYC_SCREEN:KycScreen,
    APPROVAL_SCREEN:ApprovalScreen,
    USER_PROFILE_SCREEN:UserProfileScreen,
    BOTTOM_TAB_ROUTES:BottomTabRoutes,
    FAVORITES_SCREEN:FavoritesScreen,
    ACTIVITY_SCREEN:ActivityScreen,
    BECOME_PICKER:BecomePicker,
    VEHICLE_VERIFICATION:VehicleVerification,
    PICKER_ACCOUNT:PickerAccount

}