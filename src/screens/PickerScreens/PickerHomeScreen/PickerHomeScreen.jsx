import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import styles from "./Styles";
import Header from "./Header";
import { Images } from "../../../assets/images";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { uiColours } from "../../../utils/Styles/uiColors";
import { commonStyles, screenSize } from "../../../utils/Styles/CommonStyles";
import { useNavigation } from "@react-navigation/native";
import SetRoute from "./SetRoute";
import ProfileView from "../../../components/PrifileView/ProfileView";
import TripRequest from "./TripRequest";
import DestinationHistory from "./DestinationHistory";
import ConfirmationSheet from "../../../components/ConfirmationSheet/ConfirmationSheet";
import VehicleIconView from "../../../components/VehicleIconView/VehicleIconView";
import { MainRouteStrings } from "../../../utils/Constents/RouteStrings";
import { useSelector } from "react-redux";

const PickerHomeScreen = ({ route }) => {
  const from = route?.params?.from;

  const { appStyles, isDark } = useContext(AppContext);
  const userData = useSelector((state) => state?.userDataReducer?.userData);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={appStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header userData={userData} appStyles={appStyles} isDark={isDark} />

        <SetRoute />

        {/* <TripRequest
          from={from}
          handleDecline={() => {

          }}
        /> */}

        {/* <TouchableOpacity
          style={styles.completeImage}
          onPress={() => {
            navigation.navigate(MainRouteStrings.BECOME_PICKER, {
              from: MainRouteStrings.PICKER_HOME_SCREEN
            }
            )
          }}
        >
          <Image source={Images.completeProfile} style={{
            height: '100%',
            width: "100%",
            borderRadius: moderateScale(8)
          }} />
        </TouchableOpacity> */}

        <DestinationHistory />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PickerHomeScreen;
