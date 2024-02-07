import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { moderateScale, scale } from 'react-native-size-matters'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import { apiGet } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import ProfileView from '../../../components/PrifileView/ProfileView'
import Actions from '../../../redux/Actions'

const FavoritesScreen = () => {

  const { appStyles } = useContext(AppContext)
  const navigation = useNavigation()

  const [favorateData, setFavorateData] = useState([])

  const getFavoritesData = () => {
    Actions.showLoader(true)
    apiGet(endPoints?.FAVORIES).then((res) => {
      Actions.showLoader(false)
      // console.log("🚀 ~ getFavoritesData ~ getFavoritesData:", res?.status)
      if (res?.status === 200) {
        setFavorateData(res?.data?.data)
      } else {

      }

    }).catch((error) => {
      Actions.showLoader(false)
      console.log("error in get favorates", error);
    })
  }


  useEffect(() => {
    getFavoritesData()
  }, [])


  return (
    <WrapperContainer
      centerTitle="Favorites"
      showFooterButton={false}
      containerPadding={{ paddingHorizontal: 0 }}
    >

      {
        favorateData?.length > 0 ?
          <FlatList
            data={favorateData}
            keyExtractor={(item) => item?._id}
            renderItem={({ item }) => {
              // console.log("item", item?.userId?.firstName);
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    navigation.navigate(MainRouteStrings.PICKER_DETAILS, {
                      data: item
                    })
                  }}
                >
                  <View style={{ flexDirection: 'row', width: "100%" }}>
                    <ProfileView
                      size={40}
                      profileImg={item?.picckrId?.picture}
                      hasBottomLine={false}
                    />

                    <View style={styles.content}>
                      <Text style={appStyles.smallTextPrimaryBold}>
                        {item?.picckrId?.firstName} {item?.picckrId?.lastName}
                      </Text>
                      <Text style={appStyles.smallTextGray}>
                        {item?.vehicleId?.plateNumber} - {item?.vehicleId?.model} -{item?.vehicleId?.color}
                      </Text>
                      <View style={{ flexDirection: 'row', gap: scale(5) }}>
                        <Images.star height={moderateScale(20)} width={moderateScale(20)} />
                        <Text style={appStyles.smallTextGray}>{item.rating}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.heartIcon}>
                    <Images.heartRed />
                  </View>
                </TouchableOpacity>
              )
            }}
          >

          </FlatList> :
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '50%' }}>
            <Text style={appStyles.smallTextGray}>
              You do not have favorite picckrs
            </Text>
          </View>
      }

    </WrapperContainer>
  )
}

export default FavoritesScreen