import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import WrapperContainer from "../../../components/WrapperContainer/WrapperContainer";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import styles from "./Styles";
import { Images } from "../../../assets/images";
import { AppContext, useSocket } from "../../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { uiColours } from "../../../utils/Styles/uiColors";
import { Rating } from "react-native-ratings";
import PrifileView from "../../../components/PrifileView/ProfileView";
import { commonStyles } from "../../../utils/Styles/CommonStyles";
import InputText from "../../../components/InputText/InputText";
import { ReviewsData } from "../../../json/reviewData";
import { MainRouteStrings } from "../../../utils/Constents/RouteStrings";
import useBackButton from "../../../customHooks/useBackButton";
import { WriteReviewsData } from "../../../json/writeUserReviewData";

const WriteUserReview = ({ route }) => {
  const status = route?.params?.status;
  const data = route?.params?.data;
  const { Socket } = useSocket();
  // console.log("data", data);
  const { appStyles } = useContext(AppContext);
  const navigation = useNavigation();
  const [reviewsData, setReviewsData] = useState(WriteReviewsData);
  const [buttonActive, setButtonActive] = useState(false);
  const [userReview, setUserReview] = useState({
    selectedItems: [],
    review: "",
    rating: "",
  });

  const handeleReviewPress = (val) => {
    setReviewsData((prevData) => {
      const updatedData = prevData.map((item) => {
        if (val.id === item.id) {
          return { ...item, selected: !item.selected }; // Toggle isSelected
        }
        return item;
      });

      const selectedData = updatedData.filter((item) => item.selected);
      setUserReview({
        ...userReview,
        selectedItems: selectedData,
      });
      return updatedData;
    });
  };

  useEffect(() => {
    if (
      userReview.rating > 0 &&
      userReview.review !== "" &&
      userReview.selectedItems.length !== 0
    ) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [userReview]);

  useBackButton(() => {
    navigation.navigate(MainRouteStrings.PICKER_HOME_SCREEN, {
      from: "review",
    });
    return true;
  });

  return (
    <WrapperContainer
      centerTitle="Review Sender"
      showBackButton
      handleBack={() => {
        // handleSubmit();
      }}
      showFooterButton={true}
      buttonTitle="Submit"
      buttonActive={buttonActive}
      handleButtonPress={() => {
        navigation.navigate(MainRouteStrings.PICKER_HOME_SCREEN, {
          from: "review",
        });
      }}
      containerPadding={{ paddingHorizontal: 0 }}
    >
      <ScrollView
        style={{
          marginBottom: verticalScale(76),
        }}
      >
        <View style={styles.TopSection}>
          <View style={styles.vehicle}>
            <Images.car height={moderateScale(34)} width={moderateScale(34)} />
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={appStyles.smallTextGray}>June 20 2023, 13:02 PM</Text>
            <View
              style={[
                styles.label,
                {
                  backgroundColor: uiColours?.LIGHT_RED,
                },
              ]}
            >
              <Text
                style={[
                  appStyles.smallTextPrimary,
                  {
                    color:
                      status === "Completed" ? uiColours.GREEN : uiColours?.RED,
                  },
                ]}
              >
                {status}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.profileSection}>
          <PrifileView />
          <Text style={appStyles.mediumTextGray}>
            Let’s rate
            <Text style={appStyles.mediumTextPrimaryBold}>
              {" "}
              Cooper Septimus
            </Text>
          </Text>
          <Rating
            ratingCount={5}
            startingValue={0}
            imageSize={moderateScale(22)}
            onFinishRating={(e) => {
              setUserReview({
                ...userReview,
                rating: parseInt(e),
              });
            }}
          />
        </View>

        <View style={styles.reviewSection}>
          <Text style={appStyles.smallTextBlack}>What can be improved?</Text>
          <View
            style={[
              commonStyles.flexRowAlnCtr,
              { flexWrap: "wrap", gap: scale(8) },
            ]}
          >
            {reviewsData.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.reviewCard,
                    {
                      borderColor:
                        item.selected === true
                          ? uiColours.GOLDEN_DARK
                          : uiColours.GRAY_TEXT,
                      backgroundColor:
                        item.selected === true
                          ? uiColours.GOLDEN_LIGHT
                          : uiColours.LIGHT_GRAY,
                    },
                  ]}
                  onPress={() => handeleReviewPress(item)}
                >
                  <Text
                    style={[appStyles.smallTextGray, { fontSize: scale(10) }]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ padding: moderateScale(16) }}>
          <InputText
            inputContainer={{}}
            hasTitle
            inputTitle="Any other feedback for Cooper Septimus?"
            placeholder="Write down your feedback"
            hasLeftView
            handleChange={(e) => {
              setUserReview({
                ...userReview,
                review: e,
              });
            }}
            renderLeftView={() => {
              return <Images.edit />;
            }}
          />
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

export default WriteUserReview;
