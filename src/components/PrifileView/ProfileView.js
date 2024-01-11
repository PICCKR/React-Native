import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Images } from '../../assets/images'
import { moderateScale } from 'react-native-size-matters'
import Styles from './Styles'
import { AppContext } from '../../context/AppContext'

const ProfileView = ({
    size = 100,
    showVehicle = false,
    profileViewStyles,
    userData,
    showEdit,
    handleEdit = () => { },
    hasBottomLine = true,
    profileImg
}) => {
    const { appStyles } = useContext(AppContext)
    // console.log("lastName", userData?.picture);
    return (
        <View style={[Styles.profileSection, hasBottomLine && appStyles.bottomBorder]}>
            <View style={[Styles.profileView, {
                height: moderateScale(size),
                width: moderateScale(size),
                borderRadius: moderateScale(size / 2),
                borderWidth: moderateScale(1),
            }, appStyles?.borderColor, profileViewStyles]}>
                {profileImg ?
                    <Image source={{ uri: profileImg }} style={{ height: '100%', width: '100%', borderRadius: 100 }} />
                    :

                    <Images.profile height={moderateScale(size)} width={moderateScale(size)} />
                }
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
                <View style={{ alignItems: "center" }}>
                    <Text style={appStyles.mediumTextPrimaryBold}>
                        {userData?.firstName} {userData?.lastName}
                    </Text>
                    {userData?.email && <Text style={appStyles.smallTextGray}>
                        {userData?.email}
                    </Text>}
                    <Text style={appStyles.smallTextGray}>
                        {userData?.phoneNumber}
                    </Text>
                </View>
            }
        </View>
    )
}

export default ProfileView