import { StyleSheet } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { uiColours } from '../../utils/Styles/uiColors';

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(16),
    gap: verticalScale(5)
  },
  inputContainer: {
    flexDirection: 'row',
    padding: moderateScale(16),
    borderWidth: moderateScale(1),
    borderColor: uiColours.LIGHT_GRAY,
    borderRadius: moderateScale(6),
    justifyContent:'space-between'
  },
  modalContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-around'
  },
  modalContainerItmes:{
    alignItems:'center',
    padding:moderateScale(16),
    borderWidth:moderateScale(1),
    borderRadius:moderateScale(6),
    borderColor:uiColours.LIGHT_GRAY
  }
});


export default styles;