import { View, Text, TouchableOpacity, Image, PermissionsAndroid, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from './Styles'
import { Images } from '../../assets/images'
import { AppContext } from '../../context/AppContext'
import { moderateScale, scale } from 'react-native-size-matters'
import BottomSheet from '../BottomSheet/BottomSheet'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { requestCameraPermission, requestGallaryPermission } from '../../helper/requestPermissions'
import { uiColours } from '../../utils/Styles/uiColors'

const DocumentUpload = ({
    setDocument,
    document,
    placeHolder,
    title,
    documentType,
    fileName,
    fileUri
}) => {

    useEffect(() => {

    }, [])


    const { appStyles, isDark } = useContext(AppContext)
    const [showModel, setShowMode] = useState(false)

    const openCamara = async () => {
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

            launchCamera(options, response => {
                try {
                    if (response.didCancel) {
                    } else if (response.error) {
                    } else if (response.customButton) {
                    } else {
                        const source = response.assets[0].uri;
                        // console.log("source", source);
                        setDocument({
                            ...document,
                            [documentType]: response?.assets[0]?.type,
                            [fileName]: response?.assets[0]?.fileName,
                            [fileUri]: response?.assets[0]?.uri,
                        })
                        setShowMode(false)
                    }
                } catch (err) {
                    console.log("errrr", err);
                }

            });
        } else {
            Alert.alert("", "You need to give camara permission in order to uplopad image")
        }

    };

    // Function to request camera permission



    const chooseMedia = async () => {
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
        launchImageLibrary(options, response => {
            try {
                if (response) {
                    const source = response.assets[0].uri;
                    // console.log("sdfdfdsfs", response.assets[0]);
                    setDocument({
                        ...document,
                        [documentType]: response?.assets[0]?.type,
                        [fileName]: response?.assets[0]?.fileName,
                        [fileUri]: response?.assets[0]?.uri,
                    })
                    setShowMode(false)
                }
            } catch (err) {

            }
        }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={[appStyles.smallTextBlack, { fontFamily: "Poppins-Medium" }]}>{title}</Text>
            <TouchableOpacity
                onPress={() => setShowMode(true)}
                style={[styles.inputContainer, {
                    borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                }]}>
                {!document[documentType] ? <View style={{ alignItems: 'center', gap: scale(10) }}>
                    <Images.camera height={moderateScale(30)} width={moderateScale(30)} />
                    <Text style={[appStyles.smallTextGray, { textAlign: "center" }]}>
                        {placeHolder}
                    </Text>
                </View> :
                    <Image source={{ uri: document[fileUri] }} style={{ height: '100%', width: '100%' }} />
                }
            </TouchableOpacity>
            <BottomSheet
                isVisible={showModel}
                hasCloseIcon
                title={"Choose media"}
                handleRightClick={() => {
                    setShowMode(false)
                }}
                onBackdropPress={() => {
                    setShowMode(false)
                }}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.modalContainerItmes}
                        onPress={openCamara}
                    >
                        <Images.camera height={moderateScale(30)} width={moderateScale(30)} />
                        <Text>camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.modalContainerItmes}
                        onPress={chooseMedia}
                    >
                        <Image source={Images.gallary} style={{ height: moderateScale(30), width: moderateScale(30) }} />
                        <Text>gallary</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </View >
    )
}

export default DocumentUpload