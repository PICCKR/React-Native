import { View, Text, Linking } from 'react-native'
import React, { useContext, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { Images } from '../../../assets/images'
import { moderateScale } from 'react-native-size-matters'
import { screenSize } from '../../../utils/Styles/CommonStyles'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import useBackButton from '../../../customHooks/useBackButton'

const DisputeScreen = () => {
    const { appStyles } = useContext(AppContext)
    const navigation = useNavigation()

    useBackButton(()=>{
        navigation.goBack()
        return true
    })


    return (
        <WrapperContainer
            centerTitle="Dispute"
            showBackButton
            handleBack={()=>{
                navigation.goBack()
            }}
            buttonTitle="Open Email"
            buttonActive={true}
            handleButtonPress={() => {
                const recipient = 'support@picckr.com';
                const subject = '';
                const body = '';
                const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
            
                Linking.openURL(mailtoLink);
             }}
            containerPadding={{}}
        >

            <View style={{ justifyContent: "center", alignItems: "center", height: '80%' }}>
                <Images.emailBig height={moderateScale(100)} width={moderateScale(100)} />
                <Text style={appStyles.smallTextPrimaryBold}>
                    Open Email
                </Text>
                <Text style={[appStyles.smallTextGray, { textAlign: 'center' }]}>Please send your issues to our customer support email.</Text>
            </View>
        </WrapperContainer>
    )
}

export default DisputeScreen