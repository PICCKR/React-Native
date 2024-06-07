import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from './Styles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import { AppContext } from '../../../context/AppContext'
import { uiColours } from '../../../utils/Styles/uiColors'
import CustomButton from '../../../components/Button/CustomButton'
import { buttonTypes } from '../../../utils/Constents/constentStrings'
import InputText from '../../../components/InputText/InputText'
import { commonStyles } from '../../../utils/Styles/CommonStyles'

const BidPriceSheet = ({
  isVisible,
  setShowSheet,
  handleSendOffer = () => { },
  selectedTrip,
  setSelectedTrip
}) => {
  const { appStyles, isDark } = useContext(AppContext)
  const [buttonActive, setButtonActive] = useState(false)
  const [bidPrice, setBidPrice] = useState("")

  const percentageData = [
    {
      id: "1",
      value: 0.1,
      item: "+10%"
    },
    {
      id: "2",
      value: 0.2,
      item: "+20%"
    },
    {
      id: "3",
      value: 0.3,
      item: "30%"
    }
  ]

  const handleCalculatePrice = (item) => {
    const price = (selectedTrip?.requestAmount + (selectedTrip?.requestAmount * item?.value)).toFixed(2).toString()
    setSelectedTrip({ ...selectedTrip, bidPrice: price })
    setBidPrice(price)
  }

  useEffect(() => {
    if (bidPrice > 1) {
      setButtonActive(true)
    } else {
      setButtonActive(false)
    }
  }, [bidPrice])


  return (
    <BottomSheet
      isVisible={isVisible}
      hasCloseIcon
      title={"Bid the price"}
      onBackdropPress={() => {
        setShowSheet(false)
      }}
      handleRightClick={() => {
        setShowSheet(false)
      }}
      modelStyles={{ paddingBottom: Platform.OS === "ios" ? verticalScale(20) : 0 }}
    >
      <InputText
        inputTitle={"Bid the order price (₦)"}
        placeholder="Enter the price of your order offer"
        value={bidPrice}
        keyboardType="numeric"
        handleChange={(e) => {
          setBidPrice(e)
        }}
      />
      <View style={[commonStyles.flexRowAlnCtrJutySpaceBetween, { gap: scale(10), marginVertical: verticalScale(20) }]}>
        {
          percentageData?.map((item) => {
            return (
              <TouchableOpacity
                key={item?.id}
                style={[styles.bigPercent, appStyles?.borderColor]}
                onPress={() => handleCalculatePrice(item)}
              >
                <Text>
                  {item?.item}
                </Text>
              </TouchableOpacity>
            )
          })
        }
      </View>



      <View style={styles.footer}>

        <CustomButton
          hasOutLine
          hasBackground={false}
          title={"Back"}
          buttonType={buttonTypes.MEDIUM}
          NavigationHandle={() => {
            setShowSheet(false)
          }}
        />

        <CustomButton
          title={"Send offer"}
          disabled={!buttonActive}
          buttonStyle={{
            backgroundColor: buttonActive ? uiColours.PRIMARY :
              !buttonActive && isDark ? uiColours.GRAYED_BUTTON :
                uiColours.LIGHT_GRAY
          }}
          titleStyle={{
            color: buttonActive ? uiColours.WHITE_TEXT : (!buttonActive && isDark) ? uiColours.GRAY_TEXT :
              uiColours.GRAY_TEXT
          }}
          buttonType={buttonTypes.MEDIUM}
          NavigationHandle={() => {
            setShowSheet(false)
            handleSendOffer(bidPrice)
          }}
        />
      </View>

    </BottomSheet>
  )
}

export default BidPriceSheet