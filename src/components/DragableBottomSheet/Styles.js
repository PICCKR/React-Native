import { StyleSheet} from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { screenSize } from '../../utils/Styles/CommonStyles'
const styles = StyleSheet.create({
    alertBox:{
        backgroundColor:'#fff',
        padding:moderateScale(20),
        borderTopLeftRadius:moderateScale(15),
        borderTopRightRadius:moderateScale(15),
        position:'absolute',
        bottom:0,
        right:0,
        left:0
    },
    container: {
        padding: 24,
        backgroundColor: 'grey',
        height:screenSize.height
      },
      contentContainer: {
        flex: 1,
        alignItems: 'center',
      },
})

export default styles