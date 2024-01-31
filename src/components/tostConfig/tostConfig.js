import { Text, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Images } from "../../assets/images";
import { tostMessagetypes } from "../../utils/Constents/constentStrings";
import { uiStrings } from "../../utils/Constents/uiStrings";
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
    // console.log("props==>", props);
    return (
      <View style={{
        padding: moderateScale(10),
        width: screenSize.width - scale(32),
        backgroundColor: props?.messageType === tostMessagetypes.SUCCESS ? uiColours.TOAST_BG : uiColours.LIGHT_RED,
        alignItems: "flex-start",
        flexDirection: "row",
        gap: scale(10),
        borderRadius: moderateScale(6),
      }}>
        {props?.messageType === tostMessagetypes.SUCCESS ? <Images.success /> : <Images.error />}
        <View>
          <Text style={{
            color: props?.messageType === tostMessagetypes.SUCCESS ? uiColours?.GREEN : uiColours.RED,
            fontSize: scale(12),
            fontFamily: "Poppins-Bold"
          }}>{
              (props?.messageType === tostMessagetypes.SUCCESS && props?.message?.title) ?
                props?.message?.title : (props?.messageType === tostMessagetypes.SUCCESS && !props?.message?.title) ?
                  "Success" : "Error"}</Text>
          <Text style={{
            color: props?.messageType === tostMessagetypes.SUCCESS ? uiColours?.GREEN : uiColours.RED,
            fontSize: scale(12),
            fontFamily: "Poppins-Regular",
            width: screenSize.width - scale(100),
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
  // console.log("message==> ijiji", message, messageType);
  Toast.show({
    type: 'tomatoToast',
    props: {
      message: message,
      messageType: messageType
    },
    position: "bottom",
    visibilityTime: 3000,

  });
}

export const showGeneralErrorToast = () => {
  Toast.show({
    type: 'tomatoToast',
    props: {
      message: uiStrings.commonError,
      messageType: tostMessagetypes.ERROR
    },
    position: "bottom",
    visibilityTime: 3000,

  });
}
