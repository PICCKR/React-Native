import { Dimensions, I18nManager, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import useDaysOfMonth, { DaysArray } from '../hooks/useDaysOfMonth'
import { getTranslation } from '../lib/lib'
import ChangeYearModal from './ChangeYearModal'
import Key, { Output } from './Key'
import { ColorOptions } from './NeatDatePicker.d'
import format from '../dateformat'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { AppContext } from '../../../context/AppContext'
import { Images } from '../../../assets/images'
import { uiColours } from '../../../utils/Styles/uiColors'
import { commonStyles, screenSize } from '../../../utils/Styles/CommonStyles'

I18nManager.allowRTL(false)

const Content = ({
  language, mode,
  onPrev, onNext,
  onConfirmPress, onSeclectTime,handleClose,
  colorOptions, chooseYearFirst,
  daysArray, btnDisabled,
  displayTime, setDisplayTime,
  output, setOutput, hideTime, onSelectDate
}: any) => {
  const [showChangeYearModal, setShowChangeYearModal] = useState(chooseYearFirst || false)

  // destructure colorOptions
  const {
    backgroundColor,
    headerColor,
    headerTextColor,
    changeYearModalColor,
    weekDaysColor,
    dateTextColor,
    selectedDateTextColor,
    selectedDateBackgroundColor,
    confirmButtonColor
  } = { ...defaultColorOptions, ...colorOptions as ColorOptions }
  const sevenDays = language
    ? getTranslation(language).weekDays
    : getTranslation('en').weekDays

  const { appStyles } = useContext(AppContext)

  // const renderTimeCards = async () => {
  //   return (

  //   )
  // }

  // let timeData: number[] = 

  const [timeData, setTimeData] = useState([
    {
      time: "1"
    }
  ])

  const getTimeData = async () => {
    // Example usage with input 11:15 AM
    const inputTime = new Date();
    // console.log("inputTime===>", inputTime.getHours(), inputTime.getMinutes());

    const hours = inputTime.getHours()
    const minute = (inputTime.getMinutes() > 0 && inputTime.getMinutes() < 15) ? 15 :
      (inputTime.getMinutes() > 15 && inputTime.getMinutes() < 30) ? 30 :
        (inputTime.getMinutes() > 30 && inputTime.getMinutes() < 45) ? 45 :
          (inputTime.getMinutes() > 45 && inputTime.getMinutes() < 60) ? 60 : 0
    // console.log("minute", minute);

    inputTime.setHours(hours, minute, 0, 0);

    // Set the end time to 12:30 PM for the example
    const endTime = new Date();
    endTime.setHours(hours + 2, minute, 0, 0);

    const timeIntervals = [] as any;
    let currentTime = new Date(inputTime);

    while (currentTime < endTime) {
      const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      timeIntervals.push({ time: formattedTime });

      // Increment the time by 15 minutes
      currentTime.setMinutes(currentTime.getMinutes() + 15);
    }
    // console.log("timeIntervals", timeIntervals);
    setTimeData(timeIntervals)
    return timeIntervals;
  }

  useEffect(() => {
    getTimeData()
    setInterval(()=>{
      getTimeData()
    },60000)
  }, [])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>

      <View style={styles.titleHeader}>
        <Text style={appStyles?.mediumTextPrimaryBold}>
          Pick-up date
        </Text>
        <TouchableOpacity
          style={{ height: moderateScale(24), width: moderateScale(24), alignItems: "center", justifyContent: "center" }}
          onPress={handleClose}
        >
          <Images.close height={moderateScale(24)} width={moderateScale(24)} />
        </TouchableOpacity>
      </View>

      <View style={[styles.header, { backgroundColor: headerColor }]}>
        {/* last month */}
        <TouchableOpacity style={styles.changeMonthTO} onPress={onPrev} disabled={btnDisabled} >
          <Image
            source={require('../assets/leftArow.png')}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>

        {/* displayed year and month */}
        <TouchableOpacity
        disabled
         onPress={() => { 
          setShowChangeYearModal(true) 
          }}>
          <Text style={appStyles?.mediumTextPrimary}>
            {daysArray.length !== 0 && (language ? (getTranslation(language).months as any)[daysArray[10].month] : (getTranslation('en').months as any)[daysArray[10].month])} {daysArray.length !== 0 && daysArray[10].year + ' '}
          </Text>
        </TouchableOpacity>

        {/* next month */}
        <TouchableOpacity style={styles.changeMonthTO} onPress={onNext} disabled={btnDisabled} >
          <Image
            source={require('../assets/rightArrow.png')}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>

      </View>

      <View style={styles.keys_container}>

        {/* week days  */}
        {sevenDays.map((weekDay: string, index: number) => (
          <View style={styles.keys} key={index.toString()}>
            <Text style={[appStyles?.smallTextGray]}>
              {weekDay}
            </Text>
          </View>
        ))}

        {/* every days */}
        {daysArray.map((Day: DaysArray, i: number) => (
          <Key key={Day.year.toString() + Day.month.toString() + i.toString()}
            Day={Day}
            mode={mode}
            output={output}
            setOutput={setOutput}
            colorOptions={{
              dateTextColor,
              backgroundColor,
              selectedDateTextColor,
              selectedDateBackgroundColor
            }}
            onSelectDate = {onSelectDate}
          />
        ))}
      </View>

      <View style={styles.footer}>
          <TouchableOpacity style={styles.btn} onPress={onConfirmPress}>
            <Text style={appStyles.smallTextWhite}>
              Save date
            </Text>
          </TouchableOpacity>
        </View>
      {/* <View style={styles.footer}>
        {hideTime && <ScrollView
          horizontal
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: scale(10) }}>
            <TouchableOpacity style={[styles.timeCardNow]}>
              <Text style={appStyles?.smallTextPrimary}>
                Now
              </Text>
            </TouchableOpacity>

            <View style={{ borderLeftWidth: moderateScale(1), height: '100%', borderColor: uiColours.LIGHT_GRAY }}>

            </View>

            <View style={styles.timeDataView}>
              {
                timeData.map((item) => {
                  return (
                    <TouchableOpacity 
                    key={item?.time} style={styles.timeCard}
                    onPress={()=>{
                      onSeclectTime(item)
                    }}
                    >
                      <Text style={appStyles?.smallTextGray}>
                        {item?.time}
                      </Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
        </ScrollView>}
        <View>
          <TouchableOpacity style={styles.btn} onPress={onConfirmPress}>
            <Text style={appStyles.smallTextWhite}>
              Save date
            </Text>
          </TouchableOpacity>
        </View>

      </View> */}


      <ChangeYearModal
        isVisible={showChangeYearModal}
        dismiss={() => { setShowChangeYearModal(false) }}
        displayTime={displayTime}
        setDisplayTime={setDisplayTime}
        colorOptions={{
          primary: changeYearModalColor,
          backgroundColor
        }}
      />
    </SafeAreaView>
  )
}

export default Content



const styles = StyleSheet.create({
  container: {
    width: screenSize.width,
    // height: screenSize.height,
    marginBottom:verticalScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    overflow: 'hidden',
    position: "absolute",
    bottom: 0,
    // top: 0
  },

  titleHeader: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
    borderBottomWidth: moderateScale(1),
    borderColor: uiColours.LIGHT_GRAY,
    padding: moderateScale(16)
  },
  header: {
    flexDirection: 'row',
    width: screenSize.width,
    paddingVertical: verticalScale(16),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  keys_container: {
    width: screenSize.width,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: moderateScale(1),
    borderColor: uiColours.LIGHT_GRAY,
    // marginBottom:verticalScale(60)
  },
  weekDays: {
    fontSize: 16
  },
  keys: {
    width: screenSize.width / 7,
    height: verticalScale(25),
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    width: screenSize.width,
    padding: moderateScale(16),
    borderColor: uiColours.LIGHT_GRAY,
    marginBottom:verticalScale(40)
  },
  timeDataView: {
    flexDirection: "row",
    alignItems: 'center',
    gap: scale(10)
  },
  timeCardNow: {
    borderWidth: moderateScale(1),
    borderColor: uiColours.LIGHT_GRAY,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(8)
  },
  timeCard: {
    borderWidth: moderateScale(1),
    borderColor: uiColours.LIGHT_GRAY,
    padding: moderateScale(10),
    borderRadius: moderateScale(8)
  },
  btn: {
    backgroundColor: uiColours.PRIMARY,
    width: '100%',
    alignSelf: "center",
    height: verticalScale(42),
    borderRadius: moderateScale(8),
    margin: moderateScale(16),
    alignItems: "center",
    justifyContent: "center",
    marginBottom:30
  },
  changeMonthTO: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    padding: 4,
    borderColor: 'black'
  }
})

// Notice: only six-digit HEX values are allowed.
const defaultColorOptions = {
  backgroundColor: '#ffffff',
  headerColor: '#4682E9',
  headerTextColor: '#ffffff',
  changeYearModalColor: '#4682E9',
  weekDaysColor: '#4682E9',
  dateTextColor: '#000000',
  selectedDateTextColor: '#ffffff',
  selectedDateBackgroundColor: '#4682E9',
  confirmButtonColor: '#4682E9'
}