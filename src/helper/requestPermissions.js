import { PermissionsAndroid } from "react-native";

export  const requestCameraPermission = async () => {
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
        } else {
            return false
            // console.log('Camera permission denied');
        }
    } catch (error) {
        return false
        // console.error('Error requesting camera permission:', error);
    }
};

export const requestGallaryPermission = async () =>{
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'gallary permission',
                message: 'This app needs gallary permission to access pictures.',
                buttonPositive: 'OK',
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true
        } else {
            
            // console.log('gallary permission denied');
            return false
        }
    } catch (error) {
    
        console.error('Error requesting camera permission:', error);
        return false
    }
}