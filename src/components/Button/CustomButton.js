import React, { useContext } from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { AppContext } from '../../context/AppContext';
import { buttonTypes } from '../../utils/Constents/constentStrings';
import { commonStyles, screenSize } from '../../utils/Styles/CommonStyles';
import { uiColours } from '../../utils/Styles/uiColors';
import styles from './Styles';

const CustomButton = ({
  title,
  NavigationHandle,
  buttonStyle,
  titleStyle,
  disabled,
  hasBackground = true,
  hasOutLine = false,
  buttonType = buttonTypes.BIG
}) => {
  const { appStyles } = useContext(AppContext)
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: hasBackground ? uiColours.PRIMARY : null,
          height: Platform.OS === "android" ? verticalScale(40) : verticalScale(30),
          width: buttonType === buttonTypes.SMALL ? verticalScale(100) :
            buttonType === buttonTypes.MEDIUM ? verticalScale(150) : screenSize.width - scale(32),
          borderWidth: hasOutLine ? moderateScale(1) : 0,
        },
        buttonStyle,
      ]}
      onPress={NavigationHandle}
      disabled={disabled}
    >
      <Text style={[hasBackground ? appStyles.smallTextWhite : appStyles.smallTextBlack, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton



