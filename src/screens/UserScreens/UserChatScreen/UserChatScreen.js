import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
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

const UserChatScreen = () => {
    const data = {}
    const { Socket } = useSocket()
    const pickerData = {}
    const navigation = useNavigation()
    const { appStyles, userData, isDark } = useContext(AppContext)
    const [showSheet, setShowSheet] = useState({
        mediaSheet: false,
        fullScreenImage: false
    })
    const [image, setImage] = useState(null)
    const [messages, setMessages] = useState([
        {
            content: {
                type: "text",
                message: "Hi picke",
                img: ""
            },
            createdAt: new Date(),
            senderid: 1,
            reciverId: 2
        },
        {
            content: "Hello user",
            content: {
                type: "text",
                message: "Hello user",
                img: ""
            },
            createdAt: new Date(),
            senderid: 2,
            reciverId: 1
        },


    ])
    const [newMessage, setNewMessage] = useState('')
    const [selectedMsg, setSelectedMsg] = useState(null)


    const scrollView = useRef()

    const handleSend = async () => {
        const msg = {
            content: {
                type: image ? "image" : "text",
                message: newMessage,
                img: image
            },
            createdAt: new Date(),
            senderid: 1,
            reciverId: 2
        }
        setNewMessage("")
        setImage(null)
        setMessages([...messages, msg])
    }

    useEffect(() => {
        Socket.emit("setup", userData)
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
                    <View style={styles.pickerProfileView}>
                        {data?.profileImg ? <Image source={{ uri: data.profileImg }} /> : <Images.profile height={moderateScale(50)} width={moderateScale(50)} />}
                    </View>
                    <View style={styles.pickerVehicle}>
                        <Images.car height={moderateScale(17)} width={moderateScale(17)} />
                    </View>
                    <View>
                        <Text style={appStyles?.mediumTextPrimaryBold}>Cooper Septimus</Text>
                        <Text>AM666EE • Toyota Prius Hybris</Text>
                        <View style={commonStyles.flexRowAlnCtr}>
                            <Images.star />
                            <Text style={appStyles.smallTextGray}>{4.9}</Text>
                        </View>
                    </View>
                </View>



                {
                    messages?.map((item, index) => {
                        const previousItem = messages[index - 1];
                        const shouldShowDate = !previousItem || moment(previousItem?.createdAt).format("DD/MM/YYYY") !== moment(item?.createdAt).format("DD/MM/YYYY")
                        const isSender = item?.senderid === 1
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
                                    {item?.content?.type === "text" ? <Text style={[appStyles.smallTextGray, { color: isSender ? uiColours.BLACK_TEXT : uiColours.GRAY_TEXT }]}>
                                        {item?.content?.message}
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
                                                    source={{ uri: item?.content?.img }}
                                                    style={{ height: moderateScale(100), width: moderateScale(100) }}
                                                />
                                            </TouchableOpacity>

                                            <Text>
                                                {item?.content?.message}
                                            </Text>
                                        </View>
                                    }
                                    <Text style={[appStyles.smallTextGray, { fontSize: scale(10) }]}>
                                        {moment(item?.createdAt).format('h:mm a')}
                                    </Text>
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

            <ChooseMediaTypeSheet
                isVisible={showSheet.mediaSheet}
                setShowMode={setShowSheet}
                openCamara={async () => {
                    const res = await openCamara()
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

export default UserChatScreen