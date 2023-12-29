import React, { useContext, useEffect, useState } from 'react'
import AuthRoutes from './AuthRoutes'
import { AppContext } from '../context/AppContext'
import UserRoutes from './UserRoutes'
import PickertRoutes from './PickertRoutes'
import SplashScreen from '../screens/AuthScreens/splashScreen/SplashScreen'
import { getCurrentUser } from '@aws-amplify/auth'


const CheckRoutes = () => {
    const { userData, isLoggedIn, setIsLoggedIn } = useContext(AppContext)
    const [showSplashScreen, setShowSplashScreen] = useState(true)

    const getUserData = async () => {
        getCurrentUser().then((res) => {
            setShowSplashScreen(false)
            if (res?.userId) {
                setIsLoggedIn(true)
            }else{
                setIsLoggedIn(false)
            }
        }).catch((error) => {
            setShowSplashScreen(false)
            setIsLoggedIn(false)
            console.log("error", error);
        });       
    }
    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            {showSplashScreen ? <SplashScreen /> :
                (!isLoggedIn) ? <AuthRoutes /> :
                    (userData?.type === "user" || userData?.type === "guest") ?
                        <UserRoutes /> :
                        <PickertRoutes />
            }
        </>
    )
}

export default CheckRoutes