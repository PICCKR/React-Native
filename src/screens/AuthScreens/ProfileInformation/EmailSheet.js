import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import SheetFooter from '../../../components/SheetFooter/SheetFooter'
import { AppContext } from '../../../context/AppContext'
import InputText from '../../../components/InputText/InputText'
import { verticalScale } from 'react-native-size-matters'
import { RegEx } from '../../../utils/Constents/regulerexpressions'

const EmailSheet = ({
    isVisible,
    setShowSheet,
    handleAddEmail,
    setProfileInformation,
    profileInformation
}) => {
    const { appStyles, isDark } = useContext(AppContext)
    const [buttonActive, setButtonActive] = useState(false)

    const handleChange = (e) => {
        setProfileInformation({
            ...profileInformation,
            email:e
        })
        if (RegEx.email__regEx.test(e)) {
          setButtonActive(true)
        } else {
          setButtonActive(false)
        }
      }

    return (
        <BottomSheet
            isVisible={isVisible}
            hasCloseIcon
            title="Add email address"
            onBackdropPress={() => {
                setShowSheet(false)
            }}
            handleRightClick={() => {
                setShowSheet(false)
            }}
        >

            <InputText
                hasTitle
                inputTitle="Email Address"
                inputContainer={{ marginBottom: verticalScale(16) }}
                placeholder="Input your email address"
                handleChange={handleChange}
            />

            <SheetFooter
                buttonActive={buttonActive}
                buttonTitle="Add email address"
                handleButtonPress={()=>{
                    setShowSheet(false)
                    handleAddEmail()
                }}
            />
        </BottomSheet>
    )
}

export default EmailSheet