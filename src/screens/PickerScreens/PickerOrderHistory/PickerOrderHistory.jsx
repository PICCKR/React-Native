import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { uiColours } from '../../../utils/Styles/uiColors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import InputText from '../../../components/InputText/InputText'
import { ReviewsData } from '../../../json/reviewData'

const PickerOrderHistory = ({ route }) => {
  const { appStyles, isDark } = useContext(AppContext)
  const navigation = useNavigation()


  return (
    <WrapperContainer
      centerTitle="Activity Summary"
      showBackButton
      handleBack={() => {
        navigation.goBack()
      }}
      buttonTitle="Back"
      buttonActive={true}
      handleButtonPress={() => {
        navigation.goBack()
      }}
      containerPadding={{ paddingHorizontal: 0 }}
    >
      <ScrollView
        style={{}}
        showsVerticalScrollIndicator={false}
      >

        {/* profile section */}
        <View style={[styles.profileView, appStyles.bottomBorder]}>
          <View style={styles.vehicleTypeIcon}>
            <Images.scooter height={moderateScale(35)} width={moderateScale(35)} />
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={appStyles.smallTextGray}>
              June 20 2023, 09:02 PM
            </Text>
            <Text style={appStyles.smallTextGray}>
              Completed
            </Text>
          </View>
        </View>


        {/* delivery history section  */}
        <View style={[styles.sectionView, appStyles.bottomBorder]}>
          <Text style={[appStyles.mediumTextBlackBold, { marginBottom: verticalScale(5) }]}>
            Delivery history
          </Text>

          <View style={[styles.tripDetails]}>
            <View style={{ flexDirection: 'row', gap: scale(5) }}>
              <Images.source height={moderateScale(20)} width={moderateScale(20)} />
              <View>
                <Text style={appStyles.smallTextGray}>
                  Sender
                </Text>
                <Text style={appStyles.smallTextGray}>
                  Jeremy Jason
                </Text>
                <Text style={appStyles.smallTextGray}>
                  212-111-2222
                </Text>
                <Text style={appStyles.smallTextGray}>
                  Lesley University
                </Text>
                <Text style={appStyles.smallTextGray}>
                  29 Everett St, Cambridge, MA 02138
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: scale(5) }}>
              <Images.locationPinRed height={moderateScale(20)} width={moderateScale(20)} />
              <View>
                <Text style={appStyles.smallTextGray}>
                  Recipient
                </Text>
                <Text style={appStyles.smallTextGray}>
                  John Cena
                </Text>
                <Text style={appStyles.smallTextGray}>
                  212-111-2222
                </Text>
                <Text style={appStyles.smallTextGray}>
                  Harvard University
                </Text>
                <Text style={appStyles.smallTextGray}>
                  Massachusetts Hall, Cambridge, MA 02138, United States of America
                </Text>
              </View>
            </View>

            <InputText
              hasTitle
              inputTitle="Price"
              value={"$100"}
              textBox={{ color: uiColours.GRAY_TEXT }}
              editable={false}
              inputContainer={{ width: '100%' }}
              inPutStyles={{ backgroundColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON, }}
            />
          </View>
        </View>

        {/* items section start*/}
        <View style={[styles.sectionView, appStyles.bottomBorder]}>
          <Text style={[appStyles.mediumTextBlackBold, { marginBottom: verticalScale(5) }]}>
            Item details
          </Text>

          <InputText
            hasTitle
            inputTitle="Package type"
            value={"Electronics"}
            textBox={{ color: uiColours.GRAY_TEXT }}
            editable={false}
            inputContainer={{ width: '100%' }}
            inPutStyles={{ backgroundColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON, }}
          />
          <InputText
            hasTitle
            inputTitle="Extimates item weight (kg)"
            value={"5"}
            textBox={{ color: uiColours.GRAY_TEXT }}
            editable={false}
            inputContainer={{ width: '100%', marginTop: verticalScale(16) }}
            inPutStyles={{ backgroundColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON, }}
          />
        </View>
        {/* item details end */}

        {/* feedbck section start */}
        <View style={[styles.sectionView, appStyles.bottomBorder]}>
          <Text style={[appStyles.mediumTextBlackBold, { marginBottom: verticalScale(2) }]}>
            Sender’s feedback
          </Text>

          <Text style={appStyles.smallTextBlack}>
            What went great?
          </Text>
          <View style={[commonStyles.flexRowAlnCtr, { flexWrap: "wrap", gap: scale(8) }]}>
            {
              ReviewsData.map((item) => {
                return (
                  <View
                    key={item.id}
                    style={[styles.reviewCard]}
                  >
                    <Text style={[appStyles.smallTextGray]}>
                      {item.title}
                    </Text>
                  </View>
                )
              })
            }
          </View>
        </View>
        {/* feedbck section end */}

        {/* other feed back start */}
        <View style={[styles.sectionView, {
          marginBottom: verticalScale(60)
        }]}>
          <InputText
            hasTitle
            inputTitle="Extimates item weight (kg)"
            value={"5"}
            textBox={{ color: uiColours.GRAY_TEXT }}
            editable={false}
            inputContainer={{ width: '100%', marginTop: verticalScale(16) }}
            inPutStyles={{ backgroundColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON, }}
          />
        </View>
        {/* other feed back end */}



      </ScrollView>
    </WrapperContainer>
  )
}

export default PickerOrderHistory