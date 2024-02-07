import { StyleSheet } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { uiColours } from '../../utils/Styles/uiColors';

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(16),
    gap: verticalScale(5),
    // flex: 1,
    alignItems: "center",
    width: '45%',
  },
  inputContainer: {
    // flexDirection: 'row',
    padding: moderateScale(16),
    borderWidth: moderateScale(1),
    borderColor: uiColours.LIGHT_GRAY,
    borderRadius: moderateScale(6),
    justifyContent: 'center',
    alignItems: "center",
    height: verticalScale(150),
    width: "100%"
    // flex: 1
  },
  modalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-around'
  },
  modalContainerItmes: {
    alignItems: 'center',
    padding: moderateScale(16),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(6),
    borderColor: uiColours.LIGHT_GRAY
  },
  closeIcon: {
    position: 'absolute',
    padding: moderateScale(10),
    top: -10
  }
});


export default styles;