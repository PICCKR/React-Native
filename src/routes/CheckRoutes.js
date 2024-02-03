import React, { useContext, useEffect, useState } from 'react'
import AuthRoutes from './AuthRoutes'
import { AppContext, useSocket } from '../context/AppContext'
import UserRoutes from './UserRoutes'
import PickertRoutes from './PickertRoutes'
import SplashScreen from '../screens/AuthScreens/splashScreen/SplashScreen'
import { fetchAuthSession, getCurrentUser, signOut } from '@aws-amplify/auth'
import { clearLocalData, getLocalData, setLocalData } from '../helper/AsyncStorage'
import { storageKeys } from '../helper/AsyncStorage/storageKeys'
import NoRoutesScreen from '../screens/CommonScreens/NoRoutesScreen/NoRoutesScreen'
import { decodeToken } from '../helper/decodeToken'
import axios from 'axios'
import { endPoints } from '../configs/apiUrls'
import Geolocation from '@react-native-community/geolocation'
import { Socket } from 'socket.io-client'
import Actions from '../redux/Actions'
import { useSelector } from 'react-redux'


const CheckRoutes = () => {
    const isLoggedIn = useSelector((state) => state?.isLoggedInReducer?.isLoggedIn)
    const userData = useSelector((state) => state?.userDataReducer?.userData)

    const [showSplashScreen, setShowSplashScreen] = useState(true)


    const getUserData = async () => {
        // get user details from local storage
        const UserData = await getLocalData(storageKeys.userData)
        // get current loggedin user
        getCurrentUser().then((res) => {
            // if we found user the take to home screen else take to login screen
            if (res?.userId && UserData?.token) {
                getAdditionalData(UserData?.token)
            } else {
                setShowSplashScreen(false)
                Actions.isLoggedIn(false)
            }
        }).catch((error) => {
            setShowSplashScreen(false)
            Actions.isLoggedIn(false)
            console.log("error", error);
        });
    }

    const getAdditionalData = async (token) => {
        try {
            // get idToken from cognito
            const { idToken } = (await fetchAuthSession()).tokens ?? {};
            // pass this to in headers to get jwt token
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken.toString()}`,
                },
            };

            axios.post(endPoints.GET_TOKEN, {}, config)
                .then(async (result) => {
                    const { data, status } = result;
                    setShowSplashScreen(false)
                    if (status == 200) {
                        // console.log("here");
                        Actions.isLoggedIn(true)
                        const userInformaton = await decodeToken(data?.token)
                        // console.log("userInformaton", userInformaton);
                        // after getting token store it in local storage and also set token in context
                        setLocalData(storageKeys.userData, { ...userInformaton, token: data?.token })
                        Actions.userData({ ...userInformaton, token: data?.token })
                        // setuserData({ ...userInformaton, token: data?.token })
                    } else {
                        Actions.isLoggedIn(false)
                    }
                })
                .catch(async (error) => {
                    await signOut().then(async (res) => {

                    }).catch((error) => {

                    })
                    Actions.isLoggedIn(false)
                    Actions.userData(null)
                    await clearLocalData()
                    Actions.showLoader(false)
                    setShowSplashScreen(false)
                    console.log("error while getting access token", error);
                });
        } catch (err) {
            setShowSplashScreen(false)
            console.log(err);
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            {showSplashScreen ? <SplashScreen /> :
                (!isLoggedIn) ? <AuthRoutes /> :
                    (userData?.routeType !== "picker" || userData?.type === "guest") ?
                        <UserRoutes /> :
                        (userData?.routeType === "picker") ?
                            <PickertRoutes /> :
                            <NoRoutesScreen />
            }
        </>
    )
}

export default CheckRoutes