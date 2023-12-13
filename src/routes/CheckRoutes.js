import React, { useContext, useEffect, useState } from 'react'
import AuthRoutes from './AuthRoutes'
import { AppContext } from '../context/AppContext'
import UserRoutes from './UserRoutes'
import PickertRoutes from './PickertRoutes'
import SplashScreen from '../screens/AuthScreens/splashScreen/SplashScreen'


const CheckRoutes = () => {
    const { userData } = useContext(AppContext)
    const [showSplashScreen, setShowSplashScreen] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setShowSplashScreen(false)
        }, 2000);
    }, [])
    return (
        <>
            {showSplashScreen ? <SplashScreen /> :

                !userData ? <AuthRoutes /> : (userData?.type === "user" || userData?.type === "guest") ? <UserRoutes /> : <PickertRoutes />
            }
        </>
    )
}

export default CheckRoutes