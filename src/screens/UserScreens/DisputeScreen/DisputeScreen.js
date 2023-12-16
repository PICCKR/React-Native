import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { Images } from '../../../assets/images'
import { moderateScale } from 'react-native-size-matters'
import { screenSize } from '../../../utils/Styles/CommonStyles'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'

const DisputeScreen = () => {
    const { appStyles } = useContext(AppContext)
    const navigation = useNavigation()


    return (
        <WrapperContainer
            centerTitle="Dispute"
            showBackButton
            buttonTitle="Open Email"
            buttonActive={true}
            handleButtonPress={() => { }}
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