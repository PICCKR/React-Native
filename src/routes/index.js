
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
import TrainingScreen from "../screens/UserScreens/TrainingScreen/TrainingScreen";
import PickerDetails from "../screens/UserScreens/PickerDetails/PickerDetails";
import ActivitySummary from "../screens/UserScreens/ActivitySummary/ActivitySummary";
import DisputeScreen from "../screens/UserScreens/DisputeScreen/DisputeScreen";
import PickerReviewWhenCancelled from "../screens/UserScreens/PickerReviewWhenCancelled/PickerReviewWhenCancelled";
import SetDestination from "../screens/UserScreens/SetDestination/SetDestination";
import PickerHomeScreen from "../screens/PickerScreens/PickerHomeScreen/PickerHomeScreen";
import AddressScreen from "../screens/UserScreens/AddressScreen/AddressScreen";
import RatingAndReviews from "../screens/UserScreens/RatingAndReviews/RatingAndReviews";
import UserKycScreen from "../screens/UserScreens/UserKycScreen/UserKycScreen";
import EditProfile from "../screens/UserScreens/EditProfile/EditProfile";
import FindDestination from "../screens/UserScreens/FindDestination/FindDestination";
import SelectAddresFromMap from "../screens/CommonScreens/SelectAddresFromMap/SelectAddresFromMap";
import ItemsDetails from "../screens/UserScreens/ItemsDetails/ItemsDetails";
import TrackingScreen from "../screens/UserScreens/TrackingScreen/TrackingScreen";
import FindingPicker from "../screens/UserScreens/FindingPicker/FindingPicker";
import UserChatScreen from "../screens/UserScreens/UserChatScreen/UserChatScreen";
import ManageAccount from "../screens/UserScreens/ManageAccount/ManageAccount";
import ChangePassword from "../screens/AuthScreens/ChangePassword/ChangePassword";
import PickerBottomTabRoutes from "./PickerBottomTabRoutes";
import TripScreen from "../screens/PickerScreens/TripScreen/TripScreen";
import PickerMessagesScreen from "../screens/PickerScreens/PickerMessagesScreen/PickerMessagesScreen";
import PickerProfileScreen from "../screens/PickerScreens/PickerProfileScreen/PickerProfileScreen";
import PickerFindDestination from "../screens/PickerScreens/FindDestination/PickerFindDestination";
import PickerOrderHistory from "../screens/PickerScreens/PickerOrderHistory/PickerOrderHistory";
import WalletScreen from "../screens/PickerScreens/WalletScreen/WalletScreen";
import PickkerRatingAndReviews from "../screens/PickerScreens/PickkerRatingAndReviews/PickkerRatingAndReviews";
import PickupScreen from "../screens/PickerScreens/PickupScreen/PickupScreen";
import WriteUserReview from "../screens/PickerScreens/UserReview/WriteUserReview";
import TripDetailsScreen from "../screens/PickerScreens/TripDetailsScreen/TripDetailsScreen";
import PickerChatScreen from "../screens/PickerScreens/PickerChatScreen/PickerChatScreen";
import VehicleScreen from "../screens/PickerScreens/VehicleScreen/VehicleScreen";
import UserWalletScreen from "../screens/UserScreens/UserWalletScreen/UserWalletScreen";
import BackAccounts from "../screens/PickerScreens/BackAccounts/BackAccounts";
import UserReviewWhenCancelled from "../screens/PickerScreens/UserReviewWhenCancelled/UserReviewWhenCancelled";
import SetLocationScreen from "../screens/CommonScreens/SetLocationScreen/SetLocationScreen";
import OnGoingTrips from "../screens/UserScreens/ActivityScreen/OnGoingTrips";
import UpcomingTrips from "../screens/UserScreens/ActivityScreen/UpcomingTrips";
import RecentTrips from "../screens/UserScreens/ActivityScreen/RecentTrips";
import PickerOnGoingTrips from "../screens/PickerScreens/TripScreen/PickerOnGoingTrips";
import PickerRecentTrips from "../screens/PickerScreens/TripScreen/PickerRecentTrips";
import RequestTab from "../screens/PickerScreens/TripScreen/RequestTab";
import PdfView from "../screens/AuthScreens/PdfView/PdfView";
import AddAddress from "../screens/CommonScreens/AddAddress/AddAddress";
import SetLocationScreenPickker from "../screens/CommonScreens/SetLocationScreen/SetLocationScreenPickker";
import AddVehicleScreen from "../screens/PickerScreens/VehicleScreen/AddVehicleScreen";
import AddBankAccount from "../screens/PickerScreens/BackAccounts/AddBankAccount";




export const screens = {
    USER_HOME_SCREEN: UserHomeScreen,
    LOGIN_SCREEN: LoginScreen,
    ON_BOARDING: OnBoardingScreen,
    WELCOME_SCREEN: WelcomeScreen,
    FORGOT_PASSWORD: ForgotPassword,
    USER_SIGN_UP: UserSignupScreen,
    OTP_SCREEN: OtpScreen,
    PROFILE_INFORMATION: ProfileInformation,
    KYC_SCREEN: KycScreen,
    APPROVAL_SCREEN: ApprovalScreen,
    USER_PROFILE_SCREEN: UserProfileScreen,
    BOTTOM_TAB_ROUTES: BottomTabRoutes,
    FAVORITES_SCREEN: FavoritesScreen,
    ACTIVITY_SCREEN: ActivityScreen,
    ONGOING_TRIPS: OnGoingTrips,
    UPCOMING_TRIPS: UpcomingTrips,
    RECENT_TRIPS: RecentTrips,
    BECOME_PICKER: BecomePicker,
    VEHICLE_VERIFICATION: VehicleVerification,
    PICKER_ACCOUNT: PickerAccount,
    TRAINING_SCREEN: TrainingScreen,
    PICKER_DETAILS: PickerDetails,
    ACTIVITY_SUMMERY: ActivitySummary,
    DISPUTE_SCREEN: DisputeScreen,
    PICKER_REVIEW_WHEN_CANCELLED: PickerReviewWhenCancelled,
    SET_DESTINATION: SetDestination,
    ADDRESS_SCREEN: AddressScreen,
    RATING_AND_REVIEW: RatingAndReviews,
    USER_KYC_SCREEN: UserKycScreen,
    EDIT_PROFILE: EditProfile,
    FIND_DESTINATON: FindDestination,
    SELECT_ADDRRESS_FROM_MAP: SelectAddresFromMap,
    ITEMS_DETAILS: ItemsDetails,
    TRACKING_SCREEN: TrackingScreen,
    FINDING_PICKER: FindingPicker,
    USER_CHAT_SCREEN: UserChatScreen,
    MANAGE_ACCOUNT: ManageAccount,
    CHANGE_PASSWORD: ChangePassword,
    USER_WALLET_SCREEN: UserWalletScreen,
    PDF_VIEW: PdfView,

    PICKER_BOTTOM_ROUTES: PickerBottomTabRoutes,
    PICKER_HOME_SCREEN: PickerHomeScreen,
    PICKER_PROFILE: PickerProfileScreen,
    TRIPS_SCREEN: TripScreen,
    PICKER_ON_GOING_TRIPS: PickerOnGoingTrips,
    PICKER_RECENT_TRIPS: PickerRecentTrips,
    REQUEST_TAB: RequestTab,
    PICKER_MESSAGES_SCREEN: PickerMessagesScreen,
    PICKER_FIND_DESTINATION: PickerFindDestination,
    PICKER_ORDER_HISTORY: PickerOrderHistory,
    WALLET_SCREEN: WalletScreen,
    PICKKER_RATING_AND_REVIEW: PickkerRatingAndReviews,
    PICKUP_SCREEN: PickupScreen,
    WRITE_USER_REVIEW: WriteUserReview,
    TRIP_DETAILS_SCREEN: TripDetailsScreen,
    PICKER_CHAT_SCREEN: PickerChatScreen,
    VEHICLE_SCREEN: VehicleScreen,
    BANK_ACCOUNT: BackAccounts,
    USER_REVIEW_WHEN_CANCELLED: UserReviewWhenCancelled,
    SET_LOCATION_SCREEN: SetLocationScreen,
    ADD_ADDRESS: AddAddress,
    SET_LOCATION_SCREEN_PICKKR: SetLocationScreenPickker,
    ADD_VEHICLE: AddVehicleScreen,
    ADD_BANCK_ACCOUNT: AddBankAccount
}