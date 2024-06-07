import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Alert } from "react-native";
import { requestCameraPermission, requestGallaryPermission } from "./requestPermissions";

export const openCamara = async () => {
    const permisson = await requestCameraPermission();
    console.log("permisson===>", permisson);
    if (permisson) {
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
            quality: 0,
        };

        const imgRes = await launchCamera(options, response => {
            try {
                if (response.didCancel) {
                } else if (response.error) {
                } else if (response.customButton) {
                } else {

                    return response
                }
            } catch (err) {
                console.log("errrr", err);
            }

        });
        return imgRes
    } else {
        // Alert.alert("", "You need to give camara permission in order to uplopad image")
    }

};


export const chooseMedia = async () => {
    const permisson = await requestGallaryPermission();
    if (permisson) {
        // console.log("permisson", permisson);
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
            quality: 0,
        };
        const imgRes = await launchImageLibrary(options, response => {
            try {
                if (response) {
                    // console.log("response", response);
                    return response
                }
            } catch (err) {

            }
        });
        return imgRes
    }
};