import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import styles from './Styles'
import { AppContext } from '../../../context/AppContext'
import { Images } from '../../../assets/images'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const PickerDetails = ({ route }) => {
    const data = route?.params?.data
    const { appStyles, isDark } = useContext(AppContext)
    const [selectedHistory, setSelectedHistory] = useState(false)

    const historyData = [
        {
            id: "1",
            address: 'Harvard University',
            date: "31 July 2023"
        },
        {
            id: "2",
            address: 'Harvard University',
            date: "31 July 2023"
        },
        {
            id: "3",
            address: 'Harvard University',
            date: "31 July 2023"
        },
    ]
    const handleRequestPicker = () => {

    }
    return (
        <WrapperContainer
            centerTitle="PicckR Details"
            showBackButton
            buttonTitle={"Request PicckR"}
            handleButtonPress={handleRequestPicker}
            buttonActive={true}
            containerPadding={{ paddingHorizontal: 0 }}
        >
            <ScrollView style={{ marginBottom: verticalScale(60) }}>
                <View style={{ marginBottom: verticalScale(80) }}>
                    <View style={styles.profileSection}>
                        <View style={styles.profileView}>
                            {data.profileImg ? <Image source={{ uri: data.profileImg }} /> : <Images.profile />}
                        </View>
                        <Text style={appStyles.mediumTextPrimaryBold}>
                            {data?.picker}
                        </Text>
                        <Text style={appStyles.smallTextGray}>
                            {data?.vehicaleInfo}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Images.star height={moderateScale(20)} width={moderateScale(20)} />
                            <Text style={appStyles.smallTextGray}>
                                {data?.rating}
                            </Text>
                        </View>
                    </View>
                    <View style={{ padding: moderateScale(16) }}>
                        <Text style={appStyles.mediumTextBlackBold}>
                            Deliver History
                        </Text>
                        {
                            historyData.map((item) => {
                                return (
                                    <View key={item?.id}>
                                        <TouchableOpacity
                                            style={styles.historyCard}
                                            onPress={() => {
                                                if (selectedHistory.id !== item.id) {
                                                    setSelectedHistory(item)
                                                } else {
                                                    setSelectedHistory({})
                                                }
                                            }}
                                        >
                                            <View>
                                                <Text style={appStyles.smallTextGray}>
                                                    Sent to {item.address}
                                                </Text>
                                                <Text style={appStyles.smallTextGray}>
                                                    {item.date}
                                                </Text>
                                            </View>
                                            <Images.downArrow height={moderateScale(12)} width={moderateScale(12)} />
                                        </TouchableOpacity>
                                        {selectedHistory.id === item.id && <View style={styles.details}>
                                            <View style={{ flexDirection: 'row', gap: scale(5) }}>
                                                <Images.source height={moderateScale(20)} width={moderateScale(20)} />
                                                <View>
                                                    <Text style={appStyles.smallTextBlack}>
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
                                                    <Text style={appStyles.smallTextBlack}>
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
                                        </View>}
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </WrapperContainer>
    )
}

export default PickerDetails