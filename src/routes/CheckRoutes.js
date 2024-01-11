import React, { useContext, useEffect, useState } from 'react'
import AuthRoutes from './AuthRoutes'
import { AppContext } from '../context/AppContext'
import UserRoutes from './UserRoutes'
import PickertRoutes from './PickertRoutes'
import SplashScreen from '../screens/AuthScreens/splashScreen/SplashScreen'
import { fetchAuthSession, getCurrentUser } from '@aws-amplify/auth'
import { getLocalData, setLocalData } from '../helper/AsyncStorage'
import { storageKeys } from '../helper/AsyncStorage/storageKeys'
import NoRoutesScreen from '../screens/CommonScreens/NoRoutesScreen/NoRoutesScreen'
import { decodeToken } from '../helper/decodeToken'
import axios from 'axios'
import { endPoints } from '../configs/apiUrls'


const CheckRoutes = () => {
    const { userData, isLoggedIn, setIsLoggedIn, setuserData } = useContext(AppContext)
    const [showSplashScreen, setShowSplashScreen] = useState(true)

    const getUserData = async () => {
        // get user details from local storage
        const UserData = await getLocalData(storageKeys.userData)
        // get current loggedin user
        getCurrentUser().then((res) => {
            setShowSplashScreen(false)
            console.log(UserData);
            // if we found user the take to home screen else take to login screen
            if (res?.userId && UserData?.token) {
                setIsLoggedIn(true)
                getAdditionalData(UserData?.token)

            } else {
                setIsLoggedIn(false)
            }
        }).catch((error) => {
            setShowSplashScreen(false)
            setIsLoggedIn(false)
            console.log("error", error);
        });
    }

    const getAdditionalData = async (token) => {
        try {
            // get idToken from cognito
            const { idToken } = (await fetchAuthSession()).tokens ?? {};
            console.log("idToken.toString()", idToken.toString());
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
                    if (status == 200) {
                        const userInformaton = await decodeToken(data?.token)
                        // after getting token store it in local storage and also set token in context
                        setLocalData(storageKeys.userData, { ...userInformaton, token: data?.token })
                        setuserData({ ...userInformaton, token: data?.token })
                    }
                })
                .catch(async (error) => {
                    console.log("error while getting access token", error);
                });
        } catch (err) {
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
            {/* <NoRoutesScreen /> */}
        </>
    )
}

export default CheckRoutes