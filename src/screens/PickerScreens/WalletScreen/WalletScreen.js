import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../../../context/AppContext'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import styles from './Styles'
import { Images } from '../../../assets/images'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const WalletScreen = () => {
    const { appStyles } = useContext(AppContext)
    const navigation = useNavigation()
    return (
        <WrapperContainer
            centerTitle="Wallet"
            showFooterButton={false}
            containerPadding={{}}
            showBackButton
            handleBack={() => {
                navigation.goBack()
            }}
        >
            <Text style={appStyles?.mediumTextBlack}>Wallet</Text>

            <View style={[
                commonStyles.flexRowAlnCtrJutySpaceBetween,
                appStyles.bottomBorder,
                styles.walletCard
            ]}>
                <View style={commonStyles.flexRowAlnCtr}>
                    <Images.wallet height={moderateScale(24)} width={moderateScale(24)} />
                    <View >
                        <Text style={appStyles?.smallTextGray}>
                            PicckRPay
                        </Text>
                        <Text style={appStyles?.smallTextPrimaryBold}>
                            $530
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{ paddingVertical: verticalScale(5) }}
                >
                    <Text style={appStyles?.smallTextPrimaryBold}>
                        Withdraw
                    </Text>
                </TouchableOpacity>

            </View>
        </WrapperContainer>
    )
}

export default WalletScreen