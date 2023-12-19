import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Alert } from "react-native";
import { requestCameraPermission } from "./requestPermissions";

export const openCamara = async () => {
    const permisson = await requestCameraPermission();
    if (permisson) {
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
                quality: 0.2,
            },
            includeBase64: true,
        };

     const imgRes = await launchCamera(options, response => {
            try {
                if (response.didCancel) {
                } else if (response.error) {
                } else if (response.customButton) {
                } else {
                    // console.log("response", response);
                return response
                }
            } catch (err) {
                console.log("errrr", err);
            }

        });
        return imgRes
    } else {
        Alert.alert("", "You need to give camara permission in order to uplopad image")
    }

};


export const chooseMedia = async () => {
    // const permisson = await requestGallaryPermission();
    // console.log("permisson", permisson);
    const options = {
        storageOptions: {
            path: 'images',
            mediaType: 'photo',
            quality: 0.2,
        },
        includeBase64: true,
    };
    const imgRes = await launchImageLibrary(options, response => {
        try {
            if (response) {
            return response
            }
        } catch (err) {

        }
    }
    );

    return imgRes
};