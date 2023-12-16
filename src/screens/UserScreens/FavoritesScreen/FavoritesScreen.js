import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { favorateData } from '../../../json/favorateData'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { moderateScale, scale } from 'react-native-size-matters'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'

const FavoritesScreen = () => {

  const { appStyles } = useContext(AppContext)
  const navigation = useNavigation()

  return (
    <WrapperContainer
      centerTitle="Favorites"
      showFooterButton={false}
      containerPadding={{ paddingHorizontal: 0 }}
    >
      <FlatList
        data={favorateData}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                navigation.navigate(MainRouteStrings.PICKER_DETAILS, {
                  data: item
                })
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Images.profile height={moderateScale(40)} width={moderateScale(40)} />
                <View style={styles.content}>
                  <Text style={appStyles.smallTextPrimaryBold}>
                    {item.picker}
                  </Text>
                  <Text style={appStyles.smallTextGray}>
                    {item.vehicaleInfo}
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

      </FlatList>
    </WrapperContainer>
  )
}

export default FavoritesScreen