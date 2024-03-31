import { StatusBar, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import AppProvider from './src/context/AppContext'
import CheckRoutes from './src/routes/CheckRoutes'
import Loader from './src/components/Loader/index'
import Toast from 'react-native-toast-message'
import { toastConfig } from './src/components/tostConfig/tostConfig'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { requestUserPermission } from './src/services/NotificationService/NotificationService'


const App = () => {
  useEffect(() => {
    requestUserPermission()
  }, [])

  const showLoader = useSelector((state) => state?.showLoader?.loader)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <CheckRoutes />
        {showLoader && <Loader />}
        <Toast config={toastConfig} />
      </AppProvider>
    </GestureHandlerRootView>
  )
}

export default App