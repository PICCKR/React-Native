import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { uiColours } from '../../utils/Styles/uiColors';

const styles = StyleSheet.create({
  DropdownStyle: {
    width: "100%",
    overflow:'hidden'
  },
  titleStyles: {
    marginBottom: verticalScale(5)
  },
  DropdownBoxStyle: {
    padding: moderateScale(12),
    borderRadius: moderateScale(6),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(6),
    borderWidth:moderateScale(1)
  },

  itemsStyle: {
    height: verticalScale(30),
    paddingLeft: scale(10)
  },
  text: {
    color: 'black',
    fontSize: scale(16),
    textAlign: 'center'
  },
  itemView:
  {
    maxHeight: verticalScale(140),
    borderRadius: moderateScale(6),
    borderWidth:moderateScale(1),
  },
  dropDownItem: {
    padding: moderateScale(6),
    borderRadius:moderateScale(6),
  },
  itemText: {

  }
});
export default styles;
