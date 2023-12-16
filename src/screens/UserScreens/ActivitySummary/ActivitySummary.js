import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { uiColours } from '../../../utils/Styles/uiColors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Image } from 'react-native-svg'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import InputText from '../../../components/InputText/InputText'
import Ongoing from './Ongoing'
import CustomButton from '../../../components/Button/CustomButton'
import { buttonTypes } from '../../../utils/Constents/constentStrings'
import { ReviewsData } from '../../../json/reviewData'

const ActivitySummary = ({ route }) => {
    const { appStyles } = useContext(AppContext)
    const navigation = useNavigation()
    const data = route.params?.data

    const status = data?.status === "Cancelled" ? `${data?.status} by ${data?.by}` : data?.status

    // console.log("data===>", data);

    return (
        <WrapperContainer
            centerTitle="Activity Summary"
            showBackButton
            showFooterButton={data?.status != "Ongoing" ? true : false}
            buttonTitle="Reorder"
            buttonActive={true}
            handleButtonPress={() => { }}
            containerPadding={{ paddingHorizontal: 0 }}
        >
            <ScrollView style={{
                marginBottom: data?.status != "Ongoing" ? verticalScale(76) : 0,
                paddingTop: verticalScale(16)
            }}>

                <View style={styles.ActivitySummaryConatiner}>
                    <View style={styles.vehicle}>
                        <Images.car height={moderateScale(34)} width={moderateScale(34)} />
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={appStyles.smallTextGray}>
                            {data?.dateAndTime}
                        </Text>
                        <View style={[styles.label, {
                            backgroundColor: data?.status === "Completed" ? uiColours.LIGHT_GREEN : data?.status === "Cancelled" ? uiColours.LIGHT_RED : "#C9F3FB"
                        }]}>
                            <Text style={[appStyles.smallTextPrimary, {
                                color: data?.status === "Completed" ? uiColours.GREEN : data?.status === "Cancelled" ? uiColours.RED : uiColours.BLUE

                            }]}>
                                {status}
                            </Text>
                        </View>
                    </View>
                </View>

                {data?.status != "Ongoing" && <View style={styles.profileSection}>
                    <View style={styles.profileView}>
                        {data?.profileImg ? <Image source={{ uri: profileInformation.profileImg }} /> : <Images.profile />}
                    </View>
                    <Text style={appStyles.mediumTextGray}>
                        {data?.status === "Completed" && `Let’s rate `}
                        <Text style={appStyles.mediumTextPrimaryBold}>{data?.picker}</Text>
                    </Text>
                    {data?.status === "Completed" && <Rating
                        ratingCount={5}
                        imageSize={moderateScale(22)}
                        onFinishRating={(e) => {
                            // console.log('eee', e);
                        }}
                    />}
                </View>}

                {data?.status === "Completed" && <View>
                    <View style={styles.reviewSection}>
                        <Text style={appStyles.smallTextBlack}>
                            What went great?
                        </Text>
                        <View style={[commonStyles.flexRowAlnCtr, { flexWrap: "wrap", gap: scale(8) }]}>
                            {
                                ReviewsData.map((item) => {
                                    return (
                                        <TouchableOpacity key={item.id} style={styles.reviewCard}>
                                            <Text style={[appStyles.smallTextGray, { fontSize: scale(10) }]}>
                                                {item.title}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>

                    <View style={styles.tripDetails}>
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
                    </View>
                </View>}

                {
                    data?.status === "Cancelled" &&
                    <View style={{ padding: moderateScale(16), }}>
                        <InputText
                            inputContainer={{}}
                            hasTitle
                            inputTitle="Any other feedback for Cooper Septimus?"
                            placeholder="Write down your feedback"
                            hasLeftView
                            renderLeftView={() => {
                                return (
                                    <Images.edit />
                                )
                            }}
                        />
                    </View>
                }

                {
                    data?.status === "Ongoing" &&
                    <Ongoing
                        data={data}
                        appStyles={appStyles}
                        navigation={navigation}
                    />

                }

            </ScrollView>
        </WrapperContainer>
    )
}

export default ActivitySummary