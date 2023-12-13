import { Text, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Images } from "../../assets/images";
import { tostMessagetypes } from "../../utils/Constents/constentStrings";
import { commonStyles, screenSize } from "../../utils/Styles/CommonStyles";
import { uiColours } from "../../utils/Styles/uiColors";

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}

      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),

  tomatoToast: ({ props }) => {
    console.log("props==>", props);
    return (
      <View style={{
        padding: moderateScale(10),
        width: screenSize.width - scale(32),
        backgroundColor: props?.messageType === tostMessagetypes.SUCCESS ? uiColours.TOAST_BG : uiColours.redTransperent,
        alignItems: "flex-start",
        flexDirection: "row",
        gap:scale(10),
        borderRadius: moderateScale(6),
      }}>
        <Images.success />
        <View>
          <Text style={{
            color: props?.message?.isDark ? uiColours?.WHITE_TEXT : uiColours?.GREEN,
            fontSize: scale(12),
            fontFamily: "Poppins-Bold"
          }}>{props?.messageType === tostMessagetypes.SUCCESS ? "Success" : ""}</Text>
          <Text style={{
            color: props?.message?.isDark ? uiColours?.WHITE_TEXT : uiColours?.GREEN,
            fontSize: scale(12),
            fontFamily: "Poppins-Regular",
            // maxWidth:"99%"
          }}>{props?.message?.msg}</Text>
        </View>

      </View>
    )
  }
};

export const showToast = (
  message,
  messageType
) => {
  console.log("message==> ijiji", message, messageType);
  Toast.show({
    type: 'tomatoToast',
    props: {
      message: message,
      messageType: messageType
    },
    position: "bottom",
    visibilityTime: 2000,

  });
}

export const showGeneralErrorToast = () => {
  Toast.show({
    type: 'tomatoToast',
    props: {
      message: "",
      messageType: tostMessagetypes.ERROR
    },
    position: "bottom",
    visibilityTime: 2000,

  });
}
