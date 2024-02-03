import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { uiColours } from '../../../utils/Styles/uiColors'
import { useNavigation } from '@react-navigation/native'
import { Images } from '../../../assets/images'
import { endPoints } from '../../../configs/apiUrls'
import { apiGet } from '../../../services/apiServices'
import styles from './Styles'
import moment from 'moment'
import { formatAmount } from '../../../helper/formatter'
import Actions from '../../../redux/Actions'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'

const RecentTrips = () => {
  const { appStyles, isDark } = useContext(AppContext)
  const [data, setData] = useState([])
  const navigation = useNavigation()


  const getActivityData = async () => {
    Actions.showLoader(true)
    apiGet(`${endPoints.GET_USER_BOOKINGS}?status=past`).then((res) => {
      Actions.showLoader(false)
      console.log("ress in booking recent", res?.data?.data);
      if (res?.status === 200) {
        setData(res?.data?.data)
      }
    }).catch((error) => {
      Actions.showLoader(false)
      console.log("error in getting orders", error);
    })
  }

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // Your API call logic goes here
      getActivityData();
    });

    // Cleanup function (optional)
    return () => {
      unsubscribeFocus();
      // Cleanup logic, if needed
    };
  }, [navigation]);

  return (
    <View style={appStyles?.container}>
      {data?.length !== 0 ? <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        style={{ paddingHorizontal: scale(16), marginTop: verticalScale(16) }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[commonStyles.flexRowAlnCtrJutySpaceBetween, commonStyles.bottomBorder,
              {
                paddingBottom: verticalScale(16),
                borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY

              }
              ]}
              onPress={() => {
                navigation.navigate(MainRouteStrings.ACTIVITY_SUMMERY, {
                  data: item
                })

              }}
            >
              <View style={commonStyles.flexRowAlnCtr}>
                {item?.picckrId?.picture ? <Image source={{ uri: item?.picckrId?.picture }} /> : <Images.profile height={moderateScale(40)} width={moderateScale(40)} />}
                <View>
                  <Text style={appStyles.smallTextPrimaryBold}>
                    {item?.picckrId?.firstName} {item?.picckrId?.lastName}
                  </Text>
                  <Text style={appStyles.smallTextGray}>
                    {moment(item?.createdAt).format("DD-MM-YYYY")}
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={appStyles.smallTextPrimary}>
                  {formatAmount(item?.amount)}
                </Text>
                <View style={[styles.label, {
                  backgroundColor: item?.status === "Completed" ? uiColours.LIGHT_GREEN : item?.status === "cancelled" ? uiColours.LIGHT_RED : "#C9F3FB"
                }]}>
                  <Text style={[appStyles.smallTextPrimary, {
                    color: item?.status === "Completed" ? uiColours.GREEN : item?.status === "cancelled" ? uiColours.RED : uiColours.BLUE

                  }]}>
                    {item?.status}
                  </Text>
                </View>
              </View>

            </TouchableOpacity>
          )
        }}
      >

      </FlatList> :
        <View style={{ justifyContent: 'center', alignItems: "center", marginTop: "50%" }}>
          <Text style={appStyles.mediumTextPrimaryBold}>
            No past bookings available
          </Text>
        </View>
      }
    </View>
  )
}

export default RecentTrips