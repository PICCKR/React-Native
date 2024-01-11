import React, { useContext, useRef, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
  Easing,
  LayoutAnimation,
  FlatList,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { toggleAnimation } from '../../animations/toggleAnimation';
import { Images } from '../../assets/images';
import { AppContext } from '../../context/AppContext';
import { getConvertedData } from '../../helper/getConvertedData';
import { commonStyles } from '../../utils/Styles/CommonStyles';
import { uiColours } from '../../utils/Styles/uiColors';
import styles from './style';
// import { dropDownTranstion } from '../../utils/Styles/transtition';

const DropDown = ({
  DropdownStyle,
  title = null,
  titleStyles,
  palceholder,
  data = [],
  itemView,
  disabled,
  DropdownBoxStyle,
  arrowStyle,
  changeKey,
  handleSelectItem = () => { },
  loadMoreItems = () => { }
}) => {
  const { appStyles } = useContext(AppContext)
  const [showData, setShowData] = useState(false)
  const [selectedItems, setSelectedItem] = useState(null)
  const modifiedData = getConvertedData(data, changeKey);
  const animationController = useRef(new Animated.Value(0)).current

  const toggleDropdown = () => {

    const configs = {
      duration: 300,
      toValue: showData ? 0 : 1,
      useNativeDriver: true
    }

    Animated.timing(animationController, configs).start()
    LayoutAnimation.configureNext(toggleAnimation)
    setShowData(!showData)
  }

  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })

  return (
    <View
      style={[styles.DropdownStyle, DropdownStyle]}
    // ref={animationController}
    >
      {title && <Text style={[appStyles?.smallTextBlack, titleStyles]}>
        {title}
      </Text>}
      <TouchableOpacity
        style={[styles.DropdownBoxStyle, appStyles?.borderColor, DropdownBoxStyle]}
        activeOpacity={0.8}
        onPress={() => {
          toggleDropdown()
        }}
        disabled={disabled}
      >
        <Text
          style={{ color: selectedItems ? 'black' : '#A9A9A9' }}
        >
          {selectedItems ? selectedItems?.itemName : palceholder}
        </Text>
        <Animated.View
          style={{
            transform: [
              { rotate: arrowTransform }
              // !showData ? { rotate: "0deg" } : { rotate: "180deg" }
            ],
          }}>
          <Images.downArrow height={moderateScale(15)} width={moderateScale(15)} />
        </Animated.View >
      </TouchableOpacity>

      {showData &&
        <ScrollView
          onScroll={({ nativeEvent }) => {
            const offsetY = nativeEvent.contentOffset.y;
            const contentHeight = nativeEvent.contentSize.height;
            const height = nativeEvent.layoutMeasurement.height;
            if (offsetY + height >= contentHeight - 20) {
              loadMoreItems(); // Load more data when reaching near the bottom
            }
          }}
          scrollEventThrottle={400}
          style={[styles.itemView, appStyles?.borderColor, itemView]}
        >
          {
            modifiedData?.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i.toString()}
                  style={[
                    styles.dropDownItem,
                    {
                      backgroundColor: selectedItems?.id === item?.id ? uiColours.PRIMARY : null
                    }
                  ]}
                  onPress={() => {
                    setSelectedItem(item)
                    toggleDropdown()
                    handleSelectItem(item)
                  }}
                >
                  <Text
                    style={[appStyles?.smallTextBlack, {
                      color: selectedItems?.id === item?.id ? "#fff" : "#000"
                    }]}
                  >
                    {item?.itemName}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>}

    </View >
  )
}
export default DropDown;
