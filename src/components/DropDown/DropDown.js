import React, { useRef, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
  Easing,
  LayoutAnimation,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { toggleAnimation } from '../../animations/toggleAnimation';
import { Images } from '../../assets/images';
import { getConvertedData } from '../../helper/getConvertedData';
import { commonStyles } from '../../utils/Styles/CommonStyles';
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
  handleSelectItem = () => { }
}) => {

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
      {title && <Text style={[commonStyles.titleText, styles.titleStyles, titleStyles]}>
        {title}
      </Text>}
      <TouchableOpacity
        style={[styles.DropdownBoxStyle, DropdownBoxStyle]}
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

      {showData && (
        <ScrollView
          style={[commonStyles.dropShadow, styles.itemView, itemView]}>
          {
            modifiedData?.map((val, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.dropDownItem,
                    {
                      backgroundColor: selectedItems?.id === val?.id ? "red" : "#fff"
                    }
                  ]}
                  onPress={() => {
                    setSelectedItem(val)
                    toggleDropdown()
                    handleSelectItem(val)
                  }}
                >
                  <Text
                    style={[commonStyles.bodyText, styles.itemText, {
                      color: selectedItems?.id === val?.id ? "#fff" : "#000"
                    }]}
                  >
                    {val?.itemName}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>)}
    </View>
  )
}
export default DropDown;
