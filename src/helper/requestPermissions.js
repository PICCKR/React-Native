import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";
import { check, PERMISSIONS, request, requestMultiple } from "react-native-permissions";

export const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'This app needs camera permission to take pictures.',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true
            } else if (granted === "never_ask_again") {

                Alert.alert("", "You need to give camara permission in order to uplopad image", [
                    {
                        text: "OK",
                        onPress: () => {
                            Linking.openSettings();
                        }
                    }
                ],)

            }
        } catch (error) {
            return false
        }

    } else {
        const result = await check(PERMISSIONS.IOS.CAMERA);
        if (result === "blocked") {
            Alert.alert("", "You need to give camara permission in order to uplopad image", [
                {
                    text: "OK",
                    onPress: () => {
                        Linking.openSettings();
                    }
                }
            ],
                { cancelable: false })
        } else if (result === "denied") {
            const iosPermission = await requestMultiple(
                Platform.OS === "ios" ?
                    [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY] :
                    [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]
            )
            console.log("iosPermission", iosPermission);
            if (iosPermission["ios.permission.CAMERA"] === "granted") {
                return true
            } else {
                return false
            }
        } else if (result === "granted") {
            return true
        }
    }
};

export const requestGallaryPermission = async () => {
    if (Platform.OS === "android") {
        const result = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        console.log("result", result);
        if (result === "denied") {
            Alert.alert("", "You need to give gallary permission in order to uplopad image", [
                {
                    text: "OK",
                    onPress: () => {
                        Linking.openSettings();
                    }
                }
            ],
                { cancelable: false })
        } else if (result === "granted") {
            return true
        }
    } else {
        const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
        console.log("result in ios", result);
        if (result === "blocked") {
            Alert.alert("", "You need to give gallary permission in order to uplopad image", [
                {
                    text: "OK",
                    onPress: () => {
                        Linking.openSettings();
                    }
                }
            ],
                { cancelable: false })
        } else if (result === "granted") {
            return true
        }
    }
}