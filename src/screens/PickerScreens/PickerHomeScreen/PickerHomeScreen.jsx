import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import styles from './Styles'
import Header from './Header'
import { Images } from '../../../assets/images'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { uiColours } from '../../../utils/Styles/uiColors'
import { commonStyles, screenSize } from '../../../utils/Styles/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import SetRoute from './SetRoute'
import ProfileView from '../../../components/PrifileView/ProfileView'
import TripRequest from './TripRequest'
import DestinationHistory from './DestinationHistory'


const PickerHomeScreen = () => {
  const { appStyles, userData, isDark } = useContext(AppContext)
  const navigation = useNavigation()

  const [showSheet, setShowSheet] = useState({
    showPayment: false,
    addPayment: false,
    Otp: false
  })
  const [topUpAmount, setTopUpAmount] = useState({
    price: "0"
  })

  const recentDestinationData = [
    {
      title: "Harvard University",
      details: 'Massachusetts Hall, Cambridge, MA 02138'
    },
    {
      title: "Houghton Library",
      details: 'Quincy Street &, Harvard St, Cambridge, MA 02138'
    },
    {
      title: "Cambridge Historical Tours",
      details: '1400 Massachusetts Ave, Cambridge, MA 02138'
    },
    {
      title: "John Harvard Statue",
      details: 'Harvard Yard, 1, Cambridge, MA 02138'
    }
  ]



  return (
    <SafeAreaView style={appStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Header
          userData={userData}
          appStyles={appStyles}
          setShowSheet={setShowSheet}
          showSheet={showSheet}
          topUpAmount={topUpAmount}
          isDark={isDark}
        />

        <SetRoute />

        <TripRequest />

        {/* <View style={styles.completeProfile}>
          <Image
            source={Images.completeProfile}
            resizeMode="contain"
            style={{ height: '100%', width: '100%' }}
          />
        </View> */}


        <DestinationHistory />
      </ScrollView>
    </SafeAreaView>
  )
}

export default PickerHomeScreen