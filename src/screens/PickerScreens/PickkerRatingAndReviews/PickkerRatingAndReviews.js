import { View, Text, FlatList } from 'react-native'
import React, { useContext } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import styles from './Styles'
import PrifileView from '../../../components/PrifileView/ProfileView'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { AppContext } from '../../../context/AppContext'
import { Images } from '../../../assets/images'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import { uiColours } from '../../../utils/Styles/uiColors'

const PickkerRatingAndReviews = () => {
    const { appStyles, isDark } = useContext(AppContext)
    const navigation = useNavigation()
    const reviewData = [
        {
            id: "1",
            userName: "John Doe",
            date: "5 • June 20 2023, 13:02 PM",
            feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        },
        {
            id: "2",
            userName: "John John",
            date: "19 • July 22 2023, 13:02 PM",
            feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
        },
        {
            id: "3",
            userName: "John Doe",
            date: "5 • June 20 2023, 13:02 PM",
            feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        },
        {
            id: "4",
            userName: "John John",
            date: "19 • July 22 2023, 13:02 PM",
            feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
        },
        {
            id: "5",
            userName: "John John",
            date: "19 • July 22 2023, 13:02 PM",
            feedback: ""
        },
        {
            id: "6",
            userName: "John John",
            date: "19 • July 22 2023, 13:02 PM",
            feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        },
        {
            id: "7",
            userName: "John John",
            date: "19 • July 22 2023, 13:02 PM",
            feedback: ""
        },
    ]
    return (
        <WrapperContainer
            centerTitle="Rating & Reviews"
            showFooterButton={false}
            showBackButton
            handleBack={()=>{
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
                        <View style={[styles.card,{
                            borderColor : isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                        }]}>
                            <View style={[styles.profileSection,{
                                borderColor : isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                            }]}>
                                <PrifileView
                                    size={moderateScale(40)}
                                />
                                <View>
                                    <Text style={appStyles.mediumTextPrimaryBold}>
                                        {item.userName}
                                    </Text>
                                    <View style={commonStyles.flexRowAlnCtr}>
                                        <Images.star />
                                        <Text style={appStyles.smallTextGray}>
                                            {item.date}
                                        </Text>
                                    </View>

                                </View>
                            </View>

                            <View style={{ paddingTop: verticalScale(10) }}>
                                <Text style={appStyles.smallTextGray}>
                                    Feedback :
                                </Text>
                                <Text style={appStyles.smallTextGray}>
                                    {item.feedback}
                                </Text>
                            </View>

                        </View>
                    )
                }}
            >

            </FlatList> :
                <View style={{alignItems:"center",height:'90%', justifyContent:"center"}}>
                    <Text style={appStyles.smallTextGray}>
                        You don’t have any Rating & Reviews
                    </Text>
                </View>
            }
        </WrapperContainer>
    )
}

export default PickkerRatingAndReviews