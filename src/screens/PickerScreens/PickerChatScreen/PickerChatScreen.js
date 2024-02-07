import { View, Text, FlatList, TouchableOpacity } from 'react-native'
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
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import { apiGet } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { useSelector } from 'react-redux'
import moment from 'moment'
import ProfileView from '../../../components/PrifileView/ProfileView'
import Actions from '../../../redux/Actions'
import { showGeneralErrorToast } from '../../../components/tostConfig/tostConfig'

const PickerChatScreen = () => {
    const { appStyles, isDark } = useContext(AppContext)
    const navigation = useNavigation()
    const userData = useSelector((state) => state?.userDataReducer?.userData)

    const [chatData, setChatData] = useState([])

    // const ChatData = [
    //     {
    //         id: "1",
    //         userName: "John Doe",
    //         date: "Today",
    //         lastMsg: "Alright, I’m here",
    //         unReadMsgCount: 1
    //     },
    //     {
    //         id: "2",
    //         userName: "John Corbuzier",
    //         date: "12/30/2023",
    //         lastMsg: "Lorem ipsum dolor sit amet,",
    //         unReadMsgCount: 0
    //     },
    //     {
    //         id: "3",
    //         userName: "John Doe",
    //         date: "12/30/2023",
    //         lastMsg: "Alright, I’m here",
    //         unReadMsgCount: 0
    //     }
    // ]

    const getAllChats = async () => {
        Actions.showLoader(true)
        apiGet(`${endPoints.GET_CHAT_HSITORY}/${userData?._id}`).then(async (res) => {
            // console.log("🚀 ~ apiGet ~ res:", res?.data?.data)
            if (res?.status === 200) {
                const newData = await res?.data?.data?.filter((item) => {
                    if (item?.chats) {
                        return item
                    }
                })
                setChatData(newData)
            }
            Actions.showLoader(false)
        }).catch((error) => {
            Actions.showLoader(false)
            showGeneralErrorToast()
            console.log("🚀 ~ apiGet chat ~ error:", error)
        })
    }

    useEffect(() => {
        getAllChats()
    }, [])

    return (
        <WrapperContainer
            centerTitle="Message History"
            showFooterButton={false}
            showBackButton
            handleBack={() => {
                navigation.goBack()
            }}
            containerPadding={{ paddingHorizontal: 0 }}
        >

            {chatData.length > 0 ? <FlatList
                data={chatData}
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
                    // console.log("item?.chats[item?.chats?.length - 1]", item);
                    return (
                        <TouchableOpacity
                            style={[styles.card, appStyles.bottomBorder]}
                            onPress={() => navigation.navigate(MainRouteStrings.PICKER_MESSAGES_SCREEN, {
                                orderDetails: {
                                    _id: item?.roomName,
                                    userId: item?.user
                                }
                            })}
                        >
                            <View style={[commonStyles.flexRowAlnCtr]}>
                                <ProfileView
                                    profileImg={item?.user?.picture}
                                    size={50}
                                    hasBottomLine={false}
                                    profileSection={{ paddingBottom: 0 }}
                                />
                                {/* <Images.profilePicker height={moderateScale(50)} width={moderateScale(50)} /> */}
                                <View>
                                    <Text style={appStyles.mediumTextPrimaryBold}>
                                        {item?.user?.firstName} {item?.user?.lastName}
                                    </Text>
                                    <Text style={appStyles.smallTextGray}>
                                        {item?.chats[item?.chats?.length - 1]?.message}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ alignItems: "flex-end" }}>
                                <Text style={appStyles.smallTextGray}>
                                    {moment(item?.chats[item?.chats?.length - 1]?.createdAt).format("DD-MM-YYYY")}
                                </Text>
                                {/* {item?.unReadMsgCount > 0 &&
                                    <View style={[styles.unreadView]}>
                                        <Text style={[appStyles.smallTextWhite]}>
                                            {item?.unReadMsgCount}
                                        </Text>
                                    </View>
                                } */}
                            </View>

                        </TouchableOpacity>
                    )
                }}
            >

            </FlatList> :
                <View style={{ alignItems: "center", height: '90%', justifyContent: "center" }}>
                    <Text style={appStyles.smallTextGray}>
                        You don’t have any chats
                    </Text>
                </View>
            }
        </WrapperContainer>
    )
}

export default PickerChatScreen