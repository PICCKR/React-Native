import { View, Text, FlatList, TouchableOpacity } from 'react-native'
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
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'

const PickerChatScreen = () => {
    const { appStyles, isDark } = useContext(AppContext)
    const navigation = useNavigation()

    const ChatData = [
        {
            id: "1",
            userName: "John Doe",
            date: "Today",
            lastMsg: "Alright, I’m here",
            unReadMsgCount: 1
        },
        {
            id: "2",
            userName: "John Corbuzier",
            date: "12/30/2023",
            lastMsg: "Lorem ipsum dolor sit amet,",
            unReadMsgCount: 0
        },
        {
            id: "3",
            userName: "John Doe",
            date: "12/30/2023",
            lastMsg: "Alright, I’m here",
            unReadMsgCount: 0
        }
    ]
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

            {ChatData.length > 0 ? <FlatList
                data={ChatData}
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
                        <TouchableOpacity
                            style={[styles.card, appStyles.bottomBorder]}
                            onPress={() => navigation.navigate(MainRouteStrings.PICKER_MESSAGES_SCREEN, {
                                data: item
                            })}
                        >
                            <View style={[commonStyles.flexRowAlnCtr]}>
                                <Images.profilePicker height={moderateScale(50)} width={moderateScale(50)} />
                                <View>
                                    <Text style={appStyles.mediumTextPrimaryBold}>
                                        {item.userName}
                                    </Text>
                                    <Text style={appStyles.smallTextGray}>
                                        {item.lastMsg}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ alignItems: "flex-end" }}>
                                <Text style={appStyles.smallTextGray}>
                                    {item?.date}
                                </Text>
                                {item?.unReadMsgCount > 0 &&
                                    <View style={[styles.unreadView]}>
                                        <Text style={[appStyles.smallTextWhite]}>
                                            {item.unReadMsgCount}
                                        </Text>
                                    </View>
                                }
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