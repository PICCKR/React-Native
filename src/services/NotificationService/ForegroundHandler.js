import { View, Text, Platform } from 'react-native'
import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import notifee, { AndroidColor, AndroidImportance, EventType } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';


const ForegroundHandler = ({ }) => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            const { notification, messageId, data } = remoteMessage
    
                notifee.registerForegroundService((notification) => {
                    return new Promise(resolve => {
                        notifee.onForegroundEvent(({ type, detail }) => {
                            if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'stopnotification') {
                                return resolve();
                            }
                        });
                    });
                });
                const channelId = await notifee.createChannel({
                    id: messageId,
                    name: 'Notification Channel',
                    importance: AndroidImportance.HIGH
                });

                await notifee.displayNotification({
                    title: notification.title,
                    body: notification.body,
                    android: {
                        channelId,
                    },
                });

                notifee.onForegroundEvent(async ({ type, detail }) => {
                    switch (type) {
                        case EventType.DISMISSED:
                            console.log('User dismissed notification', detail.notification);
                            break;
                        case EventType.PRESS: {
                            // getchatDetiails(data?.id)
                            // Action.setSenderState(Math.random() * 100)
                            // navigation.navigate("Massage",{
                            //     id:data?.id
                            // })
                            console.log('User pressed notification', detail.notification);
                        }

                            break;
                    }
                });
        })
        return unsubscribe
    }, [])

    return null
}

export default ForegroundHandler