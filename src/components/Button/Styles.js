import { StyleSheet } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { uiColours } from '../../utils/Styles/uiColors';

const styles = StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: moderateScale(6),
      alignSelf:'center',
      borderColor:uiColours.PRIMARY
    },    
  });
  

export default styles;