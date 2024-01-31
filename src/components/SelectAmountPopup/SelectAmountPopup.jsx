import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import styles from "./Styles";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import BottomSheet from "../BottomSheet/BottomSheet";
import { uiColours } from "../../utils/Styles/uiColors";
import InputText from "../InputText/InputText";
import { commonStyles } from "../../utils/Styles/CommonStyles";
import { AppContext } from "../../context/AppContext";
import PayWithFlutterwave from "flutterwave-react-native";
import CustomButton from "../Button/CustomButton";

const SelectAmountPopup = ({
  isVisible,
  setShowSheet,
  appStyles,
  handleOnRedirect = () => {},
  action,
  sheetTitle,
  wallateBalance,
  from,
  amountToBeAdded,
}) => {
  const { userData } = useContext(AppContext);
  const [buttonActive, setButtonActive] = useState(false);
  const [seletedAmount, setSelectedAmount] = useState("0");
  const [showError, setShowError] = useState(false);

  const priceData = [
    {
      id: "1",
      price: from === "itemDetails" ? amountToBeAdded : "10",
    },
    {
      id: "2",
      price:
        from === "itemDetails"
          ? amountToBeAdded + ((amountToBeAdded % 10) + 20)
          : "35",
    },
    {
      id: "3",
      price:
        from === "itemDetails"
          ? amountToBeAdded + ((amountToBeAdded % 10) + 50)
          : "50",
    },
    {
      id: "4",
      price:
        from === "itemDetails"
          ? amountToBeAdded + ((amountToBeAdded % 10) + 80)
          : "75",
    },
    {
      id: "5",
      price:
        from === "itemDetails"
          ? amountToBeAdded + ((amountToBeAdded % 10) + 100)
          : "100",
    },
    {
      id: "6",
      price:
        from === "itemDetails"
          ? amountToBeAdded + ((amountToBeAdded % 10) + 500)
          : "500",
    },
  ];

  /* An example function to generate a random transaction reference */
  const generateTransactionRef = (length = 10) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };
  return (
    <BottomSheet
      isVisible={isVisible}
      title={sheetTitle}
      hasCloseIcon
      setShowModal={setShowSheet}
      buttonActive={buttonActive}
      handleRightClick={() => {
        setShowSheet(false);
      }}
      onBackdropPress={() => {
        setShowSheet(false);
      }}
      showFooterButton={false}
      // buttonTitle={"Top Up"}
    >
      <ScrollView style={{}}>
        <View style={{}}>
          {from === "itemDetails" ? (
            <Text style={[appStyles?.smallTextPrimaryBold]}>
              {wallateBalance}
            </Text>
          ) : (
            <Text style={[appStyles?.smallTextPrimaryBold]}>
              wallet balance ₦{wallateBalance}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: verticalScale(10),
          }}
        >
          {priceData.map((item) => {
            const selected = seletedAmount === item.price;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.priceCard,
                  {
                    borderColor: selected
                      ? uiColours.PRIMARY
                      : uiColours.LIGHT_GRAY,
                    backgroundColor:
                      action === "withdraw" && item.price > wallateBalance
                        ? uiColours.LIGHT_GRAY
                        : uiColours.WHITE_TEXT,
                  },
                ]}
                onPress={() => {
                  setButtonActive(true);
                  setSelectedAmount(item.price.toString());
                }}
                disabled={action === "withdraw" && item.price > wallateBalance}
              >
                <Text
                  style={[
                    appStyles?.largeTextGray,
                    {
                      color: selected ? uiColours.PRIMARY : uiColours.GRAY_TEXT,
                    },
                  ]}
                >
                  ₦{item?.price}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <InputText
          hasTitle
          inputTitle="Enter amount(₦)"
          handleChange={(e) => {
            const amount = parseInt(e);
            if (e) {
              setSelectedAmount(e);
              if (action === "withdraw") {
                if (amount > 0 && amount <= parseInt(wallateBalance)) {
                  setButtonActive(true);
                } else {
                  setButtonActive(false);
                }
                if (amount > parseInt(wallateBalance)) {
                  setShowError(true);
                } else {
                  setShowError(false);
                }
              } else {
                if (amount > 0) {
                  setButtonActive(true);
                }
              }
            } else {
              setSelectedAmount("");
              setShowError(false);
              setButtonActive(false);
            }
          }}
          keyboardType="numeric"
          placeholder={seletedAmount}
          value={seletedAmount}
          inputContainer={{}}
        />
        {showError && (
          <Text style={[appStyles.smallTextGray, { color: uiColours.RED }]}>
            You can withdraw only {wallateBalance}
          </Text>
        )}

        <View style={{ marginTop: verticalScale(16) }}>
          <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
            <Text style={appStyles.smallTextGray}>Total Payment</Text>
            <Text style={appStyles.smallTextPrimary}>
              ₦{seletedAmount ? seletedAmount : "0"}
            </Text>
          </View>
        </View>

        {buttonActive && (
          <PayWithFlutterwave
            onRedirect={(data) => {
              handleOnRedirect(data, seletedAmount);
            }}
            options={{
              tx_ref: generateTransactionRef(10),
              authorization: "FLWPUBK_TEST-7f4ea27a4d79df5c4de2c602d199b213-X",
              customer: {
                email: userData?.email,
              },
              amount: parseInt(seletedAmount),
              currency: "NGN",
              payment_options: "card",
            }}
            customButton={(props) => (
              <CustomButton
                NavigationHandle={props.onPress}
                isBusy={props.isInitializing}
                disabled={props.disabled}
                title={sheetTitle}
              />
            )}
            onInitializeError={(err) => {
              console.log("error", err);
            }}
          />
        )}
      </ScrollView>
    </BottomSheet>
  );
};

export default SelectAmountPopup;
