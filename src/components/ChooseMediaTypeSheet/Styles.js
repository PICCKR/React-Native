import { StyleSheet } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { uiColours } from '../../utils/Styles/uiColors';

const styles = StyleSheet.create({
 
  modalContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-around'
  },
  modalContainerItmes:{
    alignItems:'center',
    borderWidth:moderateScale(1),
    borderRadius:moderateScale(40),
    borderColor:uiColours.LIGHT_GRAY,
    height:moderateScale(72),
    width:moderateScale(72),
    justifyContent:"center"
  }
});


export default styles;