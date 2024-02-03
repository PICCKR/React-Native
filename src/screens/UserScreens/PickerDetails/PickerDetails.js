import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import styles from './Styles'
import { AppContext } from '../../../context/AppContext'
import { Images } from '../../../assets/images'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { apiGet } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import ProfileView from '../../../components/PrifileView/ProfileView'
import Actions from '../../../redux/Actions'
import moment from 'moment'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'

const PickerDetails = ({ route }) => {
    const data = route?.params?.data
    console.log("data", data);
    const navigation = useNavigation()
    const { appStyles, isDark } = useContext(AppContext)
    const [selectedHistory, setSelectedHistory] = useState(false)

    const [historyData, setHistoryData] = useState([])

    const getDetails = () => {
        Actions.showLoader(true)
        apiGet(`${endPoints.GET_PICKER_USER_ORDERS}/${data?.picckrId?._id}`).then((res) => {
            Actions.showLoader(false)
            console.log("res===>", res.status, res?.data?.data);
            if (res?.status === 200) {
                setHistoryData(res?.data?.data)
            }
        }).catch((error) => {
            Actions.showLoader(false)
            console.log("error wjile getting detaik", error);
        })
    }

    useEffect(() => {
        getDetails()
    }, [])

    const handleRequestPicker = () => {

    }


    return (
        <WrapperContainer
            centerTitle="PicckR Details"
            showBackButton
            handleBack={() => {
                navigation.goBack()
            }}
            buttonTitle={"Request PicckR"}
            handleButtonPress={() => {
                navigation.navigate(MainRouteStrings.FIND_DESTINATON)
            }}
            buttonActive={true}
            containerPadding={{ paddingHorizontal: 0 }}
        >
            <ScrollView style={{ marginBottom: verticalScale(60) }}>
                <View style={{ marginBottom: verticalScale(80) }}>
                    <View style={styles.profileSection}>
                        <ProfileView
                            // userData={data?.picckrId}
                            profileImg={data?.picckrId?.picture}
                            hasBottomLine={false}
                        />
                        <Text style={appStyles.mediumTextPrimaryBold}>
                            {data?.picckrId?.firstName} {data?.picckrId?.lastName}
                        </Text>
                        <Text style={appStyles.smallTextGray}>
                            {data?.vehicleId?.plateNumber} - {data?.vehicleId?.model} - {data?.vehicleId?.color}
                        </Text>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Images.star height={moderateScale(20)} width={moderateScale(20)} />
                            <Text style={appStyles.smallTextGray}>
                                {data?.rating}
                            </Text>
                        </View> */}
                    </View>
                    <View style={{ padding: moderateScale(16) }}>
                        <Text style={appStyles.mediumTextBlackBold}>
                            Deliver History
                        </Text>
                        <View>
                            {
                                historyData?.length !== 0 ?
                                    historyData.map((item) => {
                                        return (
                                            <View key={item?.id}>
                                                <TouchableOpacity
                                                    style={styles.historyCard}
                                                    onPress={() => {
                                                        if (selectedHistory._id !== item._id) {
                                                            setSelectedHistory(item)
                                                        } else {
                                                            setSelectedHistory({})
                                                        }
                                                    }}
                                                >
                                                    <View>
                                                        <Text style={appStyles.smallTextGray}>
                                                            Sent to {item?.requestId?.dropOffAddress}
                                                        </Text>
                                                        <Text style={appStyles.smallTextGray}>
                                                            {moment(item?.createdAt).format("DD-MM-YYYY")}
                                                        </Text>
                                                    </View>
                                                    <Images.downArrow height={moderateScale(12)} width={moderateScale(12)} />
                                                </TouchableOpacity>
                                                {selectedHistory._id === item._id && <View style={styles.details}>
                                                    <View style={{ flexDirection: 'row', gap: scale(5) }}>
                                                        <Images.source height={moderateScale(20)} width={moderateScale(20)} />
                                                        <View>
                                                            <Text style={appStyles.smallTextBlack}>
                                                                Sender
                                                            </Text>
                                                            <Text style={appStyles.smallTextGray}>
                                                                {item?.requestId?.sender?.name}
                                                            </Text>
                                                            <Text style={appStyles.smallTextGray}>
                                                                {item?.requestId?.pickupAddress}
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
                                                                {item?.requestId?.recipeint?.name}
                                                            </Text>
                                                            <Text style={appStyles.smallTextGray}>
                                                                {item?.requestId?.dropOffAddress}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>}
                                            </View>
                                        )
                                    })

                                    :

                                    <View style={{ justifyContent: 'center', alignItems: "center" }}>
                                        <Text style={appStyles.mediumTextPrimaryBold}>
                                            You do not have any history with this pickkR
                                        </Text>
                                    </View>
                            }
                        </View>

                    </View>
                </View>
            </ScrollView>
        </WrapperContainer>
    )
}

export default PickerDetails