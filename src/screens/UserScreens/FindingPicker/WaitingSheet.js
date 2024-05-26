import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import { AppContext } from '../../../context/AppContext'
import styles from './Styles'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '../../../assets/images'
import DotsLoader from '../../CommonScreens/DotsLoader/DotsLoader'

const WaitingSheet = ({
    isVisible,
    setShowSheet,
    handlePickerAccepted = () => { }

}) => {
    const { appStyles, isDark } = useContext(AppContext)

    useEffect(() => {
        setTimeout(() => {
            // console.log("ssss", );
            handlePickerAccepted()
        }, 2000);
    }, [])

    return (
        <BottomSheet
            isVisible={isVisible}
            hasCloseIcon
            title="Find PicckR"
            onBackdropPress={() => {
                setShowSheet(false)
            }}
            handleRightClick={() => {
                setShowSheet(false)
            }}
        >

            <Text style={[appStyles.mediumTextPrimary, { textAlign: "center" }]}>
                Connecting to your PicckR
            </Text>
            <Text style={[appStyles.smallTextGray, { textAlign: "center" }]}>
                Please wait a moment and don't close this page because we are connecting a PicckR for you
            </Text>

            <DotsLoader />


        </BottomSheet>
    )
}

export default WaitingSheet