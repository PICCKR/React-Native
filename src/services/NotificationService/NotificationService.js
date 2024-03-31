import { Alert } from "react-native";
import messaging from '@react-native-firebase/messaging';
import { getLocalData, setLocalData } from "../../helper/AsyncStorage";
import { storageKeys } from "../../helper/AsyncStorage/storageKeys";

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        getFcmToken()
    } else {
        Alert.alert("Plese enable notification for aur application to get latest updates and services")
    }
}

const getFcmToken = async () => {
    let fcmToken = await getLocalData(storageKeys.fcm)
    console.log("fcm in locakl", fcmToken);
    const data = await getLocalData(storageKeys.userData)
    if (data) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                setLocalData(storageKeys.fcm, fcmToken);
                console.log("fcm token ********* ", fcmToken);
                // updateToken(data, fcmToken)
            }
        } catch (error) {

        }
    } else {

    }
}

export const notificationListner = async (chatData) => {
    // when app is opened

    // console.log("chatData======>", chatData);
    messaging().onNotificationOpenedApp(remoteMessage => {
        // console.log("when app is opend", remoteMessage);
       
    });


    // In froreground state   
    // messaging()
    //     .getInitialNotification()
    //     .then(remoteMessage => {
    //         console.log("when app is foregraound 33#######",);
            
    //     });

    // in background state
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log("setBackgroundMessageHandler ===>", remoteMessage);
        // Alert.alert("notoficarton recived")
    });

    // // when app is opened
    // messaging().onMessage(remoteMessage => {
    //     console.log("onMessage when app is open ======>", remoteMessage);
    //     if(remoteMessage?.notification?.data?.Type === "SATUS_UPDATE"){
    //         Action.setSenderState(Math.random() * 100)
    //     }
    // })
}