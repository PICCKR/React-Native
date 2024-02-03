import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { AppContext } from "../../../context/AppContext";
import styles from "./Styles";
import { Images } from "../../../assets/images";
import { commonStyles } from "../../../utils/Styles/CommonStyles";
import { useNavigation } from "@react-navigation/native";
import { MainRouteStrings } from "../../../utils/Constents/RouteStrings";

const DestinationHistory = () => {
  const { appStyles, userData, isDark } = useContext(AppContext);
  const navigation = useNavigation();
  const [destinationHistory, setDestinationHistory] = useState([]);
  // const destinationHistory = [
  //     {
  //         id: "1",
  //         destination: "Harvard University",
  //         time: "Today at 09:02 PM",
  //         amount: "100"
  //     },
  //     {
  //         id: "2",
  //         destination: "Lesley University",
  //         time: "Today at 13:30 PM",
  //         amount: "110"
  //     },
  //     {
  //         id: "3",
  //         destination: "Cambridge University",
  //         time: "Today at 17:20 PM",
  //         amount: "90"
  //     },
  //     {
  //         id: "4",
  //         destination: "Cambridge University",
  //         time: "Today at 17:20 PM",
  //         amount: "110"
  //     },

  // ]
  const [destinationData, setDestinationData] = useState([]);
  return (
    <View
      style={{
        paddingHorizontal: scale(16),
        marginVertical: verticalScale(16),
      }}
    >
      <Text style={appStyles.mediumTextBlackBold}>Destination history</Text>
      {destinationHistory.length > 0 ? (
        <View style={{ marginTop: verticalScale(8) }}>
          {destinationHistory.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(MainRouteStrings.PICKER_ORDER_HISTORY);
                }}
                key={item.id}
                style={[styles.destinationHistoryCard, appStyles.borderColor]}
              >
                <View style={styles.vehicleTypeIcon}>
                  <Images.scooter
                    height={moderateScale(24)}
                    width={moderateScale(24)}
                  />
                </View>
                <View
                  style={[
                    commonStyles.flexRowAlnCtrJutySpaceBetween,
                    { flex: 1, alignItems: "flex-start" },
                  ]}
                >
                  <View>
                    <Text style={appStyles.smallTextGray}>
                      Send to{" "}
                      <Text style={appStyles.smallTextPrimary}>
                        {item?.destination}
                      </Text>
                    </Text>
                    <Text style={appStyles.smallTextGray}>{item.time}</Text>
                  </View>
                  <Text style={appStyles.smallTextGrayBold}>
                    ₦{item.amount}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <Text
          style={[
            appStyles.smallTextGray,
            {
              textAlign: "center",
              marginTop: verticalScale(5),
            },
          ]}
        >
          Today you haven't sent the package yet, you will be sending the
          package shortly.
        </Text>
      )}
    </View>
  );
};

export default DestinationHistory;
