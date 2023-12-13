import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { commonStyles } from '../../utils/Styles/CommonStyles';
import { uiColours } from '../../utils/Styles/uiColors';


const Loader = ({subTitle, LoaderStyle}) => {
  return (
    <View style={[styles.container, LoaderStyle]}>
      <View style={styles.loaderView}>
          <ActivityIndicator animating={true} color={uiColours.buttomBackground} size="large"
          />
        <Text style={[commonStyles.bodyText, styles.textStle]}>
          Please Wait...
        </Text>
      </View>
      <Text style={[commonStyles.bodyText]}>
        {subTitle}
      </Text>
    </View>
  )
}


export default Loader;
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#ffffffcc',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textStle: {
    marginLeft:scale(20),
  },
  loaderView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  }
});
