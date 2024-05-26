import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import ConfirmationSheet from '../../../components/ConfirmationSheet/ConfirmationSheet'
import { AppContext } from '../../../context/AppContext'
import { Image } from 'react-native-svg'
import { Images } from '../../../assets/images'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { uiColours } from '../../../utils/Styles/uiColors'
import styles from './Styles'
import { moderateScale } from 'react-native-size-matters'
import { clearLocalData, setLocalData } from '../../../helper/AsyncStorage'
import { useNavigation } from '@react-navigation/native'
import { deleteUser, signOut } from '@aws-amplify/auth'
import Actions from '../../../redux/Actions'
import { apiDelete } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { storageKeys } from '../../../helper/AsyncStorage/storageKeys'
import { showGeneralErrorToast } from '../../../components/tostConfig/tostConfig'
import { showGeneralError } from '../../../helper/showGeneralError'
import { useSelector } from 'react-redux'

const ManageAccount = () => {

    const { appStyles, isDark, setuserData, setIsLoggedIn } = useContext(AppContext)
    const userData = useSelector((state) => state?.userDataReducer?.userData)
    const navigation = useNavigation()

    const [showSheet, setShowSheet] = useState({
        deleteAccount: false,
        signOut: false
    })

    // const handleDeleteAccount = async () => {

    //     deleteUser().then((res) => {
    //         // console.log("res===>", res);
    //         deleteAccount()
    //     }).catch((err) => {
    //         Actions.showLoader(false)
    //         console.log("error while deleting account", err);
    //     })
    // }

    const handleDeleteAccount = async () => {
        setShowSheet(false)
        Actions.showLoader(true)
        apiDelete(`${endPoints.DELETE_USER}/${userData?._id}`).then((res) => {
            // console.log("res?.status", res?.status, res);
            if (res?.status === 200) {
                deleteUser().then((res) => {
                }).catch((err) => {
                })
                Actions.userData(null)
                // setuserData(null)
                Actions.isLoggedIn(false)
                setLocalData(storageKeys.userData, null)
            } else {
                showGeneralError()
            }
            Actions.showLoader(false)
        }).catch((error) => {
            Actions.showLoader(false)
            showGeneralError()
        })
    }

    return (
        <WrapperContainer
            centerTitle="Manage Account"
            showFooterButton={false}
            showBackButton
            handleBack={() => {
                navigation.goBack()
            }}
            containerPadding={{}}
        >

            <TouchableOpacity
                style={styles.deatilsEditbutton}
                onPress={() => {
                    setShowSheet({
                        ...showSheet,
                        signOut: true
                    })
                }}
            >
                <Text style={[appStyles.smallTextGray]}>
                    Sign out
                </Text>
                <Images.rightArrow height={moderateScale(24)} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.deatilsEditbutton}
                onPress={() => {
                    setShowSheet({
                        ...showSheet,
                        deleteAccount: true
                    })
                }}
            >
                <Text style={[appStyles.smallTextGray]}>
                    Delete Account
                </Text>
                <Images.rightArrow height={moderateScale(24)} />
            </TouchableOpacity>

            <ConfirmationSheet
                isVisible={showSheet.signOut}
                headerTitle="Sign Out"
                setShowSheet={setShowSheet}
                renderIcon={() => {
                    return (
                        <Images.logOut height={moderateScale(24)} width={moderateScale(24)} />
                    )
                }}
                title="Are you sure you want to sign out?"
                discription="Your account history will not be saved,
                and you will be redirect to the Welcome Page."
                button1Title="Cancel"
                button2Title="Sign out"
                handleButton2Click={async () => {
                    setShowSheet(false)
                    Actions.showLoader(true)
                    try {
                        await signOut().then(async (res) => {
                            Actions.showLoader(false)
                            Actions.isLoggedIn(false)
                            Actions.userData(null)
                            // setuserData(null)
                            await clearLocalData()
                            Actions.showLoader(false)
                        }).catch((error) => {
                            Actions.showLoader(false)
                            console.log("error in signout cog", error);

                        })

                    } catch (error) {
                        Actions.showLoader(false)
                        showGeneralErrorToast()
                        console.log('error signing out: ', error);
                    }
                    // clearLocalData()
                    // setuserData(null)
                }}
                handleButton1Click={() => {
                    setShowSheet({
                        ...showSheet,
                        signOut: false
                    })
                }}
            />

            <ConfirmationSheet
                headerTitle="Delete Account"
                isVisible={showSheet.deleteAccount}
                setShowSheet={setShowSheet}
                renderIcon={() => {
                    return (
                        <Images.deleteRed height={moderateScale(24)} width={moderateScale(24)} />
                    )
                }}
                title="Are you sure you want to delete your account?"
                discription="Your account will be deleted and cannot be used again."
                button1Title="Cancel"
                button2Title="Delete"
                handleButton2Click={handleDeleteAccount}
                handleButton1Click={() => {
                    setShowSheet({
                        ...showSheet,
                        deleteAccount: false
                    })
                }}
            />


        </WrapperContainer>
    )
}

export default ManageAccount