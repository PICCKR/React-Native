import {StatusBar} from'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import AppProvider from './src/context/AppContext'
import CheckRoutes from './src/routes/CheckRoutes'
import Loader from './src/components/Loader/index'
import Toast from 'react-native-toast-message'
import { toastConfig } from './src/components/tostConfig/tostConfig'
import { uiColours } from './src/utils/Styles/uiColors'

const App = () => {

  const showLoader = useSelector((state) => state?.showLoader?.loader)

  return (
    <>
      <AppProvider>
        <StatusBar backgroundColor={uiColours.PRIMARY}/>
        <CheckRoutes />
        {showLoader && <Loader />}
        <Toast config={toastConfig} />
      </AppProvider>

    </>

  )
}

export default App