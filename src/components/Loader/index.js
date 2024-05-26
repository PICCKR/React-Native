import React, { useContext } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { AppContext } from '../../context/AppContext';
import { commonStyles } from '../../utils/Styles/CommonStyles';
import { uiColours } from '../../utils/Styles/uiColors';


const Loader = ({ subTitle, LoaderStyle }) => {
  const { appStyles, isDark } = useContext(AppContext)
  return (
    <View style={[styles.container, LoaderStyle, {
      backgroundColor:'rgba(0, 0, 0, 0.6)'
      //  isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.5)',
    }]}>
      <View style={styles.loaderView}>
        <ActivityIndicator animating={true} color={uiColours.PRIMARY} size="large"
        />
        <Text style={[appStyles.smallTextBlack, styles.textStle]}>
          Please Wait...
        </Text>
      </View>
    </View>
  )
}


export default Loader;
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textStle: {
    marginLeft: scale(20),
    color: uiColours.PRIMARY,
  },
  loaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:uiColours.WHITE_TEXT,
    padding:moderateScale(10),
    borderRadius:moderateScale(5)
  }
});
