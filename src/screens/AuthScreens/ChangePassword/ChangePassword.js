import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../../../context/AppContext'
import InputText from '../../../components/InputText/InputText'
import { Images } from '../../../assets/images'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { showToast } from '../../../components/tostConfig/tostConfig'
import { tostMessagetypes } from '../../../utils/Constents/constentStrings'
import { AuthRouteStrings } from '../../../utils/Constents/RouteStrings'
import useBackButton from '../../../customHooks/useBackButton'
import { confirmResetPassword } from '@aws-amplify/auth'
import Actions from '../../../redux/Actions'

const ChangePassword = ({ route }) => {
    const data = route?.params?.data
    const { appStyles, isDark } = useContext(AppContext)
    const navigation = useNavigation()
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)


    const handleChangePassword = async () => {
        // console.log("data", data);
        Actions.showLoader(true)
        await confirmResetPassword({
            username: data?.phoneNumber.replace(/\s+/g, ''),
            confirmationCode: data?.otp,
            newPassword: password,
        }).then((res) => {
            Actions.showLoader(false)
            const toastMsgConfg = {
                isDark: isDark,
                msg: "You have successfully changed your password. Please log back into your account using the new password."
            }
            showToast(toastMsgConfg, tostMessagetypes.SUCCESS, isDark)
            // return
            navigation.navigate(AuthRouteStrings.LOGIN_SCREEN)

        }).catch((err) => {
            Actions.showLoader(false)
            const toastMsgConfg = {
                isDark: isDark,
                msg: err?.message
            }
            showToast(toastMsgConfg, tostMessagetypes.ERROR, isDark)
        })
        return
    }

    useBackButton(() => {
        navigation.navigate(AuthRouteStrings.FORGOT_PASSWORD);
        return true;
    });

    return (
        <WrapperContainer
            centerTitle={"Forgot Password"}
            showBackButton
            buttonActive={password ? true : false}
            buttonTitle="Change Password"
            handleBack={() => {
                navigation.navigate(AuthRouteStrings.FORGOT_PASSWORD);
            }}
            handleButtonPress={handleChangePassword}
        >
            <Text style={[appStyles.mediumTextPrimaryBold]}>
                Enter new password for your account
            </Text>
            <InputText
                hasTitle
                inputTitle="New Password"
                value={password}
                placeholder={"Input your new password"}
                inputContainer={{
                    marginTop: verticalScale(30)
                }}
                secureTextEntry={!showPassword}
                showRenderRightView={
                    true
                }
                renderRightView={() => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setShowPassword(!showPassword)
                            }}
                        >
                            {!showPassword ? <Images.eyeOpen height={moderateScale(25)} width={moderateScale(25)} /> :
                                <Images.eyeClose height={moderateScale(25)} width={moderateScale(25)} />
                            }
                        </TouchableOpacity>
                    )
                }}
                handleChange={(e) => {
                    setPassword(e)
                }}
            />
            <Text style={appStyles.smallTextGray}>
                If you have successfully created a new password, you can sign in to your account with the newly created password.
            </Text>
        </WrapperContainer>
    )
}

export default ChangePassword