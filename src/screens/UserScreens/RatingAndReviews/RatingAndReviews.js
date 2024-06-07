import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import styles from './Styles'
import PrifileView from '../../../components/PrifileView/ProfileView'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { AppContext } from '../../../context/AppContext'
import { Images } from '../../../assets/images'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import { uiColours } from '../../../utils/Styles/uiColors'
import { apiGet } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { useSelector } from 'react-redux'
import Actions from '../../../redux/Actions'

const RatingAndReviews = () => {
    const { appStyles, isDark } = useContext(AppContext)
    const userData = useSelector((state) => state?.userDataReducer?.userData)
    const navigation = useNavigation()
    const [reviewData, setReviewData] = useState([])



    const getRatingsAndReviews = async () => {
        Actions.showLoader(true)
        apiGet(`${endPoints.GET_RATINGS_RAVIEWS}/${userData?._id}`).then((res) => {
            Actions.showLoader(false)
            console.log("res in get ratings", res?.status, res?.data);
            if (res?.status === 200) {
                setReviewData(res?.data?.data)
            } else {

            }
        }).catch((error) => {
            Actions.showLoader(false)
            console.log("error in get ratings");
        })
    }

    useEffect(() => {
        getRatingsAndReviews()
    }, [])

    return (
        <WrapperContainer
            centerTitle="Rating & Reviews"
            showFooterButton={false}
            showBackButton
            handleBack={() => {
                navigation.goBack()
            }}
            containerPadding={{}}
        >

            {reviewData.length > 0 ? <FlatList
                data={reviewData}
                keyExtractor={(item) => item?.id}
                showsVerticalScrollIndicator={false}
                style={{ paddingBottom: verticalScale(10) }}
                ListFooterComponent={() => {
                    return (
                        <View style={{ height: verticalScale(10) }}>

                        </View>
                    )
                }}
                renderItem={({ item }) => {
                    return (
                        <View style={[styles.card, {
                            borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                        }]}>
                            <View style={[styles.profileSection, {
                                borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                            }]}>
                                <PrifileView
                                    size={moderateScale(40)}
                                    profileImg={item?.picckrId?.picture}
                                    hasBottomLine={false}
                                    profileSection={{ paddingBottom: 0 }}
                                />
                                <View>
                                    <Text style={appStyles.mediumTextPrimaryBold}>
                                        {item.picckrId?.firstName} {item.picckrId?.lastName}
                                    </Text>
                                    <View style={commonStyles.flexRowAlnCtr}>
                                        <Images.star />
                                        <Text style={appStyles?.smallTextBlack}>
                                            {item?.passengerRating}
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            {item?.createdAt}
                                        </Text>
                                    </View>

                                </View>
                            </View>

                            <View style={{ paddingTop: verticalScale(10) }}>
                                <Text style={appStyles.smallTextGray}>
                                    Feedback :
                                </Text>
                                <Text style={appStyles.smallTextGray}>
                                    {item?.passengerReview}
                                </Text>
                            </View>

                        </View>
                    )
                }}
            >

            </FlatList> :
                <View style={{ alignItems: "center", height: '90%', justifyContent: "center" }}>
                    <Text style={appStyles.smallTextGray}>
                        You don’t have any Rating & Reviews
                    </Text>
                </View>
            }
        </WrapperContainer>
    )
}

export default RatingAndReviews