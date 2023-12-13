import { View, Text, Animated, Dimensions, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../../../context/AppContext'
import { setLocalData } from '../../../helper/AsyncStorage'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'
import { onBoardingData } from '../../../json/onBordingData'
import OnBoardingItems from './OnBoardingItems'
import styles from './Styles'
import CustomButton from '../../../components/Button/CustomButton'
import { buttonTypes } from '../../../utils/Constents/constentStrings'
import { screenSize } from '../../../utils/Styles/CommonStyles'

const OnBoardingScreen = () => {

  const navigation = useNavigation()

  const { setisNew, appStyles, setuserData } = useContext(AppContext)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const ref = useRef()

  const updateCurrentSlideIndex = (e) => {
    const currentOffsetX = e.nativeEvent.contentOffset.x
    const currentIndex = Math.round(currentOffsetX / screenSize.width)
    setCurrentSlideIndex(currentIndex)
  }

  const handleNext = () => {
    if (currentSlideIndex < 2) {
      const nextSlideIndex = currentSlideIndex + 1
      const offset = nextSlideIndex * screenSize.width;
      ref?.current?.scrollToOffset({ offset })
      setCurrentSlideIndex(nextSlideIndex)
    } else {
      setLocalData(storageKeys.isNew, false)
      setisNew(false)
    }

  }

  return (
    <SafeAreaView style={[appStyles.container, { paddingHorizontal: 0 }]}>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => {
          setisNew(false)
          setuserData({
            type : "guest"
          })
        }}
      >
        <Text style={[appStyles.mediumTextBlackGray]}>
          Skip
        </Text>
      </TouchableOpacity>

      <View style={[styles.line, { width: screenSize.width / (3 - currentSlideIndex), }]}>
      </View>

      <FlatList
        data={onBoardingData}
        contentContainerStyle={{ height: '100%' }}
        renderItem={({ item, index }) => <OnBoardingItems item={item} index={index} appStyles={appStyles} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        ref={ref}
      />

      <CustomButton
        buttonType={buttonTypes.BIG}
        buttonStyle={styles.buttonStyle}
        NavigationHandle={handleNext}
        title="Continue"
      />

    </SafeAreaView>
  )
}

export default OnBoardingScreen