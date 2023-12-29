import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Images } from '../../assets/images'
import { moderateScale } from 'react-native-size-matters'
import Styles from './Styles'
import { AppContext } from '../../context/AppContext'

const ProfileView = ({
    profileImg,
    size = 100,
    showVehicle = false,
    profileViewStyles,
    userData,
    showEdit,
    handleEdit = () => {},
    hasBottomLine = true
}) => {
    const { appStyles } = useContext(AppContext)
    console.log("usre dta", userData);
    return (
        <View style={[Styles.profileSection, hasBottomLine && appStyles.bottomBorder]}>
            <View style={[Styles.profileView, {
                height: moderateScale(size),
                width: moderateScale(size),
                borderRadius: moderateScale(size / 2),
            }, profileViewStyles]}>
                {profileImg ? <Image source={{ uri: profileImg }} style={{ height: '100%', width: '100%', borderRadius: 100 }} /> : <Images.profilePicker height={moderateScale(size)} width={moderateScale(size)} />}
                {showVehicle && <View style={Styles.vehicle}>
                    <Images.car height={moderateScale(22)} width={moderateScale(22)} />
                </View>}
                {showEdit && <TouchableOpacity 
                style={Styles.editIcon}
                onPress={handleEdit}
                >
                    <Images.camera height={moderateScale(22)} width={moderateScale(22)} />
                </TouchableOpacity>}
            </View>
            {userData &&
                <View style={{alignItems:"center"}}>
                    <Text style={appStyles.mediumTextPrimaryBold}>
                        {userData?.firstName} {userData?.lastName}
                    </Text>
                    {userData?.email && <Text style={appStyles.smallTextGray}>
                        {userData?.email}
                    </Text>}
                    <Text style={appStyles.smallTextGray}>
                        {userData?.selectedCountry?.code} {userData?.phoneNumber}
                    </Text>
                </View>
            }
        </View>
    )
}

export default ProfileView