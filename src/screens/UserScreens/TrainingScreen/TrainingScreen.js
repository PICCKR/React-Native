import { View, Text, ScrollView, Button, TouchableOpacity, } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { verticalScale } from 'react-native-size-matters'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../../../context/AppContext'
import styles from './Styles'
import Video from 'react-native-video';
import { Images } from '../../../assets/images'

const TrainingScreen = () => {

    const { appStyles, setuserData,userData } = useContext(AppContext)
    const navigation = useNavigation()



    const videoData = [
        {
            id: '1',
            title: "How to navigate the app",
            video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            paused:true
        },
        {
            id: '2',
            title: "Handle delivery requests",
            video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            paused:true
        },
        {
            id: '3',
            title: "Provide a quality experience to senders",
            video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            paused:true
        }
    ]

    const [data, setData] = useState(videoData)

    const handleNext = () => {
        setuserData({ ...userData, type: "picker" })
    }

    const handleClickVideo = (val) => {
        setData(prevData => {
            const updatedData = prevData.map(item => {
                if (val.id === item.id) {
                    return { ...item, paused: !item.paused }; // Toggle isSelected
                }
                else{
                    return { ...item, paused: false };
                }
            });
            return updatedData;
        });
    };

    return (
        <WrapperContainer
            centerTitle="PicckR Account"
            showBackButton
            buttonTitle={"Next"}
            handleButtonPress={handleNext}
            buttonActive={true}
            containerPadding={{}}
        >

            <ScrollView style={{ marginBottom: verticalScale(65) }}>
                <Text style={[appStyles.mediumTextPrimaryBold]}>
                    Training and onboarding materials:
                </Text>
                <Text style={[appStyles.smallTextGray, { marginVertical: verticalScale(6) }]}>
                    This training aims to ensure that PicckRs understand how to navigate the app and provide a quality experience.
                </Text>
                <View style={{ gap: verticalScale(10) }}>
                    {
                        data.map((item) => {
                            return (
                                <View key={item.id} style={{  }}>
                                    <Text style={[appStyles.smallTextBlack]}>
                                        {item.title}
                                    </Text>
                                    <TouchableOpacity
                                        style={{ width: '100%', height: verticalScale(180) }}
                                        onPress={()=>handleClickVideo(item)}
                                    >
                                        <Video
                                            source={{ uri: item.video }}
                                            paused={item.paused}  // Can be a URL or a local file
                                            style={styles.backgroundVideo}
                                            resizeMode="contain"
                                        />
                                        {
                                            item.paused &&
                                            <View style={styles.pauseButton}>
                                                <Images.playArrow />
                                            </View>
                                        }
                                    </TouchableOpacity>

                                </View>
                            )
                        })
                    }
                </View>

            </ScrollView>
        </WrapperContainer>
    )
}

export default TrainingScreen