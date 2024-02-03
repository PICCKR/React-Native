import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { AppContext, useSocket } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { uiColours } from '../../../utils/Styles/uiColors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import InputText from '../../../components/InputText/InputText'
import Ongoing from './Ongoing'
import CustomButton from '../../../components/Button/CustomButton'
import { buttonTypes } from '../../../utils/Constents/constentStrings'
import { ReviewsData } from '../../../json/reviewData'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import moment from 'moment'
import { useSelector } from 'react-redux'
import Completed from './Completed'
import Cancelled from './Cancelled'
import Pending from './Pending'

const ActivitySummary = ({ route }) => {
    const { appStyles, isDark } = useContext(AppContext)
    const navigation = useNavigation()
    const userData = useSelector((state) => state?.userDataReducer?.userData)
    const orderDeatils = route.params?.data

    const { Socket } = useSocket()

    const status = orderDeatils?.status === "Cancelled" ? `${orderDeatils?.status} by ${orderDeatils?.by}` : orderDeatils?.status

    useEffect(() => {

        return () => {
        }

    }, [Socket])
    return (
        <WrapperContainer
            centerTitle="Activity Summary"
            showBackButton
            handleBack={() => {
                navigation.goBack()
            }}
            showFooterButton={orderDeatils?.status === "delivered" ? true : false}
            buttonTitle="Reorder"
            buttonActive={true}
            handleButtonPress={() => {
                navigation.navigate(MainRouteStrings.SET_DESTINATION, {
                    from: MainRouteStrings.ACTIVITY_SUMMERY
                })
            }}
            containerPadding={{ paddingHorizontal: 0 }}
        >
            <ScrollView style={{
                marginBottom: (orderDeatils?.status === "delivered") ? verticalScale(76) : 0,
                // paddingTop: verticalScale(16)
            }}>

                <View style={[styles.ActivitySummaryConatiner, {
                    borderColor: !isDark ? uiColours.LIGHT_GRAY : uiColours.GRAYED_BUTTON,
                }]}>
                    <View style={styles.vehicle}>
                        {/* <Image source = {{uri : data?.picckrId?.vehicle?.}} /> */}
                        <Images.car height={moderateScale(34)} width={moderateScale(34)} />
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={appStyles.smallTextGray}>
                            {moment(orderDeatils?.createdAt).format("DD-MM-YYYY")}
                        </Text>
                        <View style={[styles.label, {
                            backgroundColor: orderDeatils?.status === "delivered" ? uiColours.LIGHT_GREEN : orderDeatils?.status === "cancelled" ? uiColours.LIGHT_RED : "#C9F3FB"
                        }]}>
                            <Text style={[appStyles.smallTextPrimary, {
                                color: orderDeatils?.status === "delivered" ? uiColours.GREEN : orderDeatils?.status === "cancelled" ? uiColours.RED : uiColours.BLUE

                            }]}>
                                {status}
                            </Text>
                        </View>
                    </View>
                </View>

                {orderDeatils?.status === "delivered" &&
                    <Completed
                        orderDeatils={orderDeatils}
                        appStyles={appStyles}
                        navigation={navigation}
                        isDark={isDark}
                        userData={userData}
                    />

                }

                {orderDeatils?.status === "cancelled" &&
                    <Cancelled
                        orderDeatils={orderDeatils}
                        appStyles={appStyles}
                        navigation={navigation}
                        isDark={isDark}
                        userData={userData}
                    />

                }
                {orderDeatils?.status === "pending" &&
                    <Pending
                        orderDeatils={orderDeatils}
                        appStyles={appStyles}
                        navigation={navigation}
                        isDark={isDark}
                        userData={userData}
                        handleJoinRoom={(data) => {
                            Socket.emit("joinRoom", {
                                "room": data?._id
                            })
                            navigation.navigate(MainRouteStrings.USER_CHAT_SCREEN, {
                                orderDetails: data
                            })
                        }}
                    />

                }

                {/* {
                    orderDeatils?.status === "Cancelled" &&
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
                } */}

                {
                    orderDeatils?.status === "in-transit" &&
                    <Ongoing
                        orderDeatils={orderDeatils}
                        appStyles={appStyles}
                        navigation={navigation}
                        isDark={isDark}
                        userData={userData}
                        handleJoinRoom={(data) => {
                            Socket.emit("joinRoom", {
                                "room": data?._id
                            })
                            navigation.navigate(MainRouteStrings.USER_CHAT_SCREEN, {
                                orderDetails: data
                            })
                        }}
                    />


                }

            </ScrollView>
        </WrapperContainer>
    )
}

export default ActivitySummary