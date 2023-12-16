import { View, Text, Image } from 'react-native'
import React from 'react'
import { Images } from '../../assets/images'
import { moderateScale } from 'react-native-size-matters'
import Styles from './Styles'

const PrifileView = ({
    profileImg,
    size= 100,
    showVehicle = false,
    profileViewStyles
}) => {
    return (
        <View style={[Styles.profileView,{
            height: moderateScale(size),
            width: moderateScale(size),
            borderRadius: moderateScale(size/2),
        }, profileViewStyles]}>
            {profileImg ? <Image source={{ uri: profileImg }} /> : <Images.profilePicker height = {moderateScale(size)} width = {moderateScale(size)}/>}
            {showVehicle && <View style={Styles.vehicle}>
            <Images.car height = {moderateScale(22)} width = {moderateScale(22)} />
            </View>}
            
        </View>
    )
}

export default PrifileView