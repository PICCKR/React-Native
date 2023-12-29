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
import ProfileView from '../../../components/PrifileView/ProfileView'
import CustomButton from '../../../components/Button/CustomButton'
import { buttonTypes } from '../../../utils/Constents/constentStrings'
import RequestTab from './RequestTab'

const TripScreen = () => {
  const { appStyles, isDark } = useContext(AppContext)
  const navigation = useNavigation()
  const [currentTab, setCurrentTab] = useState({
    title: "Request",
    data: [{
      id: "1",
      picker: "John Doe",
      dateAndTime: "Send to Harvard University",
      amount: "100",
      status: "Request",
      rating: '4.9',
      distence: "1.5 km",
      time: "00:15"
    }]
  },)

  const tabsData = [
    {
      title: "Request",
      data: [{
        id: "1",
        picker: "John Doe",
        dateAndTime: "Send to Harvard University",
        amount: "100",
        status: "Request",
        rating: '4.9',
        distence: "1.5 km",
        time: "00:15"
      }]
    },
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
          by: "sender"
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
          by: "picker"
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


  const handleAccept = async (item) => {
    // const newData = []
    const newData = await tabsData.filter((val) => {
      console.log("val?.data?", val?.data[0]);
      if(val?.data[0]){

      }
      return
      if (val?.data?.id !== item?.id) {
        return item
      }
    })
    console.log("newData", newData.data?.push(item));
    // newData.push()
  }
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
                borderColor: selected ? uiColours.PRIMARY : (isDark && !selected) ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
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
            <View>
              {item?.status !== "Request" ? <TouchableOpacity
                style={[commonStyles.flexRowAlnCtrJutySpaceBetween, appStyles.borderColor,
                {
                  padding: moderateScale(16),
                  borderWidth: moderateScale(1),
                  borderRadius: moderateScale(8)
                }
                ]}
                onPress={() => {
                  navigation.navigate(MainRouteStrings.ACTIVITY_SUMMERY, {
                    data: item
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

              </TouchableOpacity> :

                // Request design start
                <RequestTab
                  item={item}
                  handleAccept={handleAccept}
                />

              }

            </View>

          )
        }}
      >

      </FlatList>

    </WrapperContainer>
  )
}

export default TripScreen