import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import styles from './Styles'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { uiColours } from '../../../utils/Styles/uiColors'
import { Images } from '../../../assets/images'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'

const ActivityScreen = () => {
  const { appStyles } = useContext(AppContext)
  const navigation = useNavigation()
  const [currentTab, setCurrentTab] = useState({
    title: "Ongoing",
    data: [{
      id: "1",
      picker: "John Doe",
      dateAndTime: "June 20 2023, 13:02 PM",
      amount: "100",
      status: "Ongoing"
    }]
  },)

  const tabsData = [
    {
      title: "Ongoing",
      data: [{
        id: "1",
        picker: "John Doe",
        dateAndTime: "June 20 2023, 13:02 PM",
        amount: "100",
        status: "Ongoing"
      }]
    },
    {
      title: "Past",
      data: [
        {
          id: "1",
          picker: "John Doe",
          dateAndTime: "June 20 2023, 13:02 PM",
          amount: "100",
          status: "Cancelled",
          by:"sender"
        },
        {
          id: "2",
          picker: "John Doe",
          dateAndTime: "June 20 2023, 13:02 PM",
          amount: "100",
          status: "Completed"
        },
        {
          id: "3",
          picker: "John Doe",
          dateAndTime: "June 20 2023, 13:02 PM",
          amount: "100",
          status: "Completed"
        },
        {
          id: "4",
          picker: "John Doe",
          dateAndTime: "June 20 2023, 13:02 PM",
          amount: "100",
          status: "Completed"
        },
        {
          id: "5",
          picker: "John Doe",
          dateAndTime: "June 20 2023, 13:02 PM",
          amount: "100",
          status: "Completed"
        },
        {
          id: "6",
          picker: "John Doe",
          dateAndTime: "June 20 2023, 13:02 PM",
          amount: "100",
          status: "Completed"
        },
        {
          id: "7",
          picker: "John Doe",
          dateAndTime: "June 20 2023, 13:02 PM",
          amount: "100",
          status: "Cancelled",
          by:"picker"
        },
        {
          id: "8",
          picker: "John Doe",
          dateAndTime: "June 20 2023, 13:02 PM",
          amount: "100",
          status: "Completed"
        },
        {
          id: "9",
          picker: "John Doe",
          dateAndTime: "June 20 2023, 13:02 PM",
          amount: "100",
          status: "Completed"
        },
      ]
    },

  ]

  return (
    <WrapperContainer
      centerTitle="Activity"
      showFooterButton={false}
      containerPadding={{ paddingHorizontal: 0 }}
    >
      <View style={[commonStyles.flexRowAlnCtrJutySpaceBetween, styles.tabContainer]}>
        {tabsData.map((item) => {
          const selected = currentTab?.title === item.title
          return (
            <TouchableOpacity
              key={item.title}
              style={[styles.tabContainerItem, {
                borderColor: selected ? uiColours.PRIMARY : uiColours.LIGHT_GRAY
              }]}
              onPress={() => {
                setCurrentTab(item)
              }}
            >
              <View style={commonStyles.flexRowAlnCtr}>
                <Text style={selected ? appStyles.smallTextPrimary : appStyles.smallTextBlack}>
                  {item.title}
                </Text>
                {item.title === "Ongoing" && <View style={styles.bubble}>
                  <Text style={appStyles.smallTextWhite}>
                    {item.data.length}
                  </Text>
                </View>}
              </View>

            </TouchableOpacity>
          )
        })}
      </View>

      <FlatList
        data={currentTab.data}
        keyExtractor={(item) => item.id}
        style={{ paddingHorizontal: scale(16), marginTop: verticalScale(16) }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity 
            style={[commonStyles.flexRowAlnCtrJutySpaceBetween, commonStyles.bottomBorder, { paddingBottom: verticalScale(16) }]}
            onPress={()=>{
              navigation.navigate(MainRouteStrings.ACTIVITY_SUMMERY,{
                data:item
              })

            }}
            >
              <View style={commonStyles.flexRowAlnCtr}>
                <Images.profile height={moderateScale(40)} width={moderateScale(40)} />
                <View>
                  <Text style={appStyles.smallTextPrimaryBold}>
                    {item?.picker}
                  </Text>
                  <Text style={appStyles.smallTextGray}>
                    {item?.dateAndTime}
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={appStyles.smallTextPrimary}>
                  ${item?.amount}
                </Text>
                <View style={[styles.label, {
                  backgroundColor: item?.status === "Completed" ? uiColours.LIGHT_GREEN : item?.status === "Cancelled" ? uiColours.LIGHT_RED : "#C9F3FB"
                }]}>
                  <Text style={[appStyles.smallTextPrimary, {
                    color: item?.status === "Completed" ? uiColours.GREEN : item?.status === "Cancelled" ? uiColours.RED : uiColours.BLUE

                  }]}>
                    {item?.status}
                  </Text>
                </View>
              </View>

            </TouchableOpacity>
          )
        }}
      >

      </FlatList>

    </WrapperContainer>
  )
}

export default ActivityScreen