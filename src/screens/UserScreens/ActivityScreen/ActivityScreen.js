import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import styles from './Styles'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { uiColours } from '../../../utils/Styles/uiColors'
import { Images } from '../../../assets/images'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import { apiGet } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import UserActivityTabs from '../../../routes/UserActivityTabs'

const ActivityScreen = () => {
  const { appStyles, isDark } = useContext(AppContext)
  const navigation = useNavigation()
  const [bookingData, setBookingData] = useState([])

  useEffect(() => {
    // getActivityData()
  }, [])

  return (
    <WrapperContainer
      centerTitle="Activity"
      showFooterButton={false}
      containerPadding={{ paddingHorizontal: 0 }}
    >
      <UserActivityTabs />

    </WrapperContainer>
  )
}

export default ActivityScreen