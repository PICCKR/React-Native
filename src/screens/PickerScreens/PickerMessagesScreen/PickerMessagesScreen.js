import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import styles from './Styles'
import { Images } from '../../../assets/images'
import { AppContext, useSocket } from '../../../context/AppContext'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { commonStyles, screenSize } from '../../../utils/Styles/CommonStyles'
import moment from 'moment'
import { uiColours } from '../../../utils/Styles/uiColors'
import InputText from '../../../components/InputText/InputText'
import ChooseMediaTypeSheet from '../../../components/ChooseMediaTypeSheet/ChooseMediaTypeSheet'
import { openCamara } from '../../../helper/imagePickerFunctions'
import FullScreenImagePopUp from './FullScreenImagePopUp'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import ProfileView from '../../../components/PrifileView/ProfileView'
import { endPoints } from '../../../configs/apiUrls'
import { apiGet } from '../../../services/apiServices'
import Actions from '../../../redux/Actions'

const PickerMessagesScreen = ({ route }) => {
    const orderDetails = route?.params?.orderDetails

    // console.log("orderDetails in piccer", orderDetails);
    const data = {}
    const { Socket } = useSocket()
    const pickerData = {}
    const navigation = useNavigation()
    const { appStyles, isDark } = useContext(AppContext)
    const userData = useSelector((state) => state?.userDataReducer?.userData)
    const [showSheet, setShowSheet] = useState({
        mediaSheet: false,
        fullScreenImage: false
    })
    const [image, setImage] = useState(null)
    const [base64, setBase64] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [selectedMsg, setSelectedMsg] = useState(null)


    const scrollView = useRef()

    const handleSend = async () => {
        const msg = {
            "message": (base64 && !newMessage) ? " " : newMessage,
            "room": orderDetails?._id,
            "user": userData?._id
        }

        // console.log("msg===>", msg);
        Socket.emit("sendMessage", msg, base64 && base64)
    }

    const handleSendMsgError = (res) => {
        // console.log("send-message-error", res);
    }
    const handleSendSuccess = (res) => {
        // console.log("send-message-success", res);
    }

    const handleNewMsg = (res) => {
        // console.log("newMessage", res);
        setMessages([...messages, res?.data])
        setNewMessage("")
        setImage(null)
        setBase64(null)
    }

    useEffect(() => {
        Socket.on("send-message-error", handleSendMsgError)
        Socket.on("send-message-success", handleSendSuccess)
        Socket.on("newMessage", handleNewMsg)
        return () => {
            Socket.off("send-message-error", handleSendMsgError)
            Socket.off("send-message-success", handleSendSuccess)
            Socket.off("newMessage", handleNewMsg)
        }
    }, [Socket, handleSendMsgError, handleSendSuccess, handleNewMsg])


    const getChatMessages = async () => {
        Actions.showLoader(true)
        apiGet(`${endPoints.GET_CHAT_MSG}/${orderDetails?._id}`).then((res) => {
            // console.log('res in get msg', res?.data);
            if (res?.status === 200) {
                setMessages(res?.data?.data)
            }
            Actions.showLoader(false)
        }).catch((error) => {
            Actions.showLoader(false)
            console.log("🚀 ~ apiGet messages ~ error:", error)
        })
    }


    useEffect(() => {
        getChatMessages()
    }, [])



    return (
        <WrapperContainer
            showFooterButton={false}
            centerTitle={"Message"}
            showBackButton
            handleBack={() => {
                navigation.goBack()
            }}
            containerPadding={{ paddingHorizontal: 0 }}

        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={"padding"}
                keyboardVerticalOffset={Platform.OS === "ios" ? verticalScale(70) : 0}
            >
                <ScrollView
                    nestedScrollEnabled={true}
                    ref={ref => scrollView.current = ref}
                    onContentSizeChange={() => {
                        scrollView.current.scrollToEnd({ animated: true })
                    }}
                    contentContainerStyle={{ paddingBottom: verticalScale(10), paddingHorizontal: scale(16), gap: verticalScale(10) }}
                    style={{}}
                >
                    <View style={[styles.pickerProfile, {
                        borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                    }]}>
                        <ProfileView
                            profileImg={orderDetails?.userId?.picture}
                            size={40}
                            hasBottomLine={false}
                            profileSection={{ paddingBottom: 0 }}
                        />
                        {/* <View style={styles.pickerProfileView}>
                        {data?.profileImg ? <Image source={{ uri: data.profileImg }} /> : <Images.profile height={moderateScale(50)} width={moderateScale(50)} />}
                    </View> */}
                        {/* <View style={styles.pickerVehicle}>
                        <Images.car height={moderateScale(17)} width={moderateScale(17)} />
                    </View> */}
                        <View>
                            <Text style={appStyles?.mediumTextPrimaryBold}>{orderDetails?.userId?.firstName} {orderDetails?.userId?.lastName}</Text>
                            <Text style={appStyles?.smallTextGray}>{orderDetails?.userId?.phoneNumber}</Text>
                            {/* <View style={commonStyles.flexRowAlnCtr}>
                            <Images.star />
                            <Text style={appStyles.smallTextGray}>{4.9}</Text>
                        </View> */}
                        </View>
                    </View>



                    {
                        messages?.map((item, index) => {
                            const previousItem = messages[index - 1];
                            const shouldShowDate = !previousItem || moment(previousItem?.createdAt).format("DD/MM/YYYY") !== moment(item?.createdAt).format("DD/MM/YYYY")
                            const isSender = item?.user?._id === userData?._id
                            // console.log(" item?.attachment", item?.attachment);
                            // console.log("item?.createdAt != new Date().toString()",previousItem,moment(previousItem?.createdAt).format("DD/MM/YYYY") , moment(item?.createdAt).format("DD/MM/YYYY"));
                            return (
                                <View key={index} style={styles.chatContainer}>
                                    {shouldShowDate && moment(item?.createdAt).format("DD/MM/YYYY") != moment(new Date()).format("DD/MM/YYYY") && <Text style={[appStyles.smallTextGray, { alignSelf: 'center' }]}>{moment(item?.createdAt).format("DD/MM/YYYY")}</Text>}
                                    {moment(item?.createdAt).format("DD/MM/YYYY") === moment(new Date()).format("DD/MM/YYYY") && shouldShowDate && <Text style={[appStyles.smallTextGray, { alignSelf: 'center' }]}>
                                        Today
                                    </Text>}
                                    <View style={isSender ? styles.sentMessageCard : [styles.reviedMessageCard, {
                                        borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                                    }]}>
                                        {!item?.attachment ? <Text style={[appStyles.smallTextGray, { color: isSender ? uiColours.BLACK_TEXT : uiColours.GRAY_TEXT }]}>
                                            {item?.message}
                                        </Text> :
                                            <View style={{}}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setSelectedMsg(item)
                                                        setShowSheet({
                                                            ...showSheet,
                                                            fullScreenImage: true
                                                        })
                                                    }}
                                                >
                                                    <Image
                                                        source={{ uri: item?.attachment }}
                                                        style={{ height: moderateScale(100), width: moderateScale(100) }}
                                                    />
                                                </TouchableOpacity>

                                                <Text>
                                                    {item?.message}
                                                </Text>
                                            </View>
                                        }

                                        {/* <Text style={[appStyles.smallTextGray, { color: isSender ? uiColours.BLACK_TEXT : uiColours.GRAY_TEXT }]}>
                                        {item?.message}
                                    </Text>
                                    <Text style={[appStyles.smallTextGray, { fontSize: scale(10) }]}>
                                        {moment(item?.createdAt).format('h:mm a')}
                                    </Text> */}
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>

                <View style={[styles.inputContainer, {
                    borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                }]}>
                    {/* {(newMessage === "" && !image) && <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => {
                        setShowSheet({
                            ...showSheet,
                            mediaSheet: true
                        })
                    }}
                >
                    <Images.camera height={moderateScale(20)}
                        width={moderateScale(20)} />
                </TouchableOpacity>} */}
                    <View style={{ flex: 1 }}>
                        {image &&
                            <View style={styles.selectedImageView}>
                                <Image
                                    source={{ uri: image }}
                                    style={{ height: "100%", width: '25%' }}
                                    resizeMode="contain"
                                />
                                <TouchableOpacity
                                    style={{ paddingVertical: verticalScale(5) }}
                                    onPress={() => {
                                        setImage(null)
                                    }}
                                >
                                    <Images.close />
                                </TouchableOpacity>

                            </View>
                        }
                        <TextInput
                            style={[styles.input, {
                                borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                            }]}
                            value={newMessage}
                            placeholder='Message'
                            multiline={true}
                            onChangeText={(e) => {
                                setNewMessage(e)
                            }}
                        />
                    </View>

                    {(newMessage === "" && !image) ?
                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={() => {
                                setShowSheet({
                                    ...showSheet,
                                    mediaSheet: true
                                })
                            }}
                        >
                            <Images.camera height={moderateScale(20)}
                                width={moderateScale(20)} />
                        </TouchableOpacity> :

                        <TouchableOpacity
                            onPress={handleSend}
                            disabled={(newMessage !== "" || image) ? false : true}
                            style={styles.sendButton}
                        >
                            <Images.send height={moderateScale(20)}
                                width={moderateScale(20)} />
                        </TouchableOpacity>

                    }

                </View>
            </KeyboardAvoidingView>
            <ChooseMediaTypeSheet
                isVisible={showSheet.mediaSheet}
                setShowMode={setShowSheet}
                openCamara={async () => {
                    const res = await openCamara()
                    // console.log("res", res?.assets[0]?.base64);
                    setBase64(res?.assets[0]?.base64)
                    setImage(res?.assets[0]?.uri)
                    setShowSheet({
                        ...showSheet,
                        mediaSheet: false
                    })
                }}
                chooseMedia={async () => {
                    const res = await chooseMedia()
                    setImage(res?.assets[0]?.uri)
                    setShowSheet({
                        ...showSheet,
                        mediaSheet: false
                    })
                }}
            />
            <FullScreenImagePopUp
                isVisible={showSheet.fullScreenImage}
                image={selectedMsg?.content?.img}
                setShowSheet={setShowSheet}
            />
        </WrapperContainer>
    )
}

export default PickerMessagesScreen