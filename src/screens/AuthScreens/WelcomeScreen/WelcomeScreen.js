import { View, Text, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import styles from './Styles'
import Header from '../../../components/Header/Header'
import { Images } from '../../../assets/images'
import { moderateScale } from 'react-native-size-matters'
import CustomButton from '../../../components/Button/CustomButton'
import { buttonTypes } from '../../../utils/Constents/constentStrings'
import { useNavigation } from '@react-navigation/native'
import { AuthRouteStrings } from '../../../utils/Constents/RouteStrings'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'

const WelcomeScreen = () => {
    const { appStyles } = useContext(AppContext)
    const navigation = useNavigation()
    return (
        <WrapperContainer
            rightTitle={"Cancel"}
            showFooterButton={false}
        >

            <View style={styles.contentView}>
                <Text style={[appStyles.extraLargeTexGray, styles.titelText]}>
                    Welcome to <Text style={[appStyles.extraLargeTexPrimary, styles.titelText]}>PicckR!</Text>
                </Text>
                <Text style={[appStyles.mediumTextBlackGray, styles.descriptionText]}>
                    Move to the next step to enjoy the features in the application
                </Text>
            </View>

            <View style={styles.Image}>
                <Images.welcomeScreen height={moderateScale(200)} width={moderateScale(200)} />
            </View>

            <View style={styles.buttonView}>
                <CustomButton
                    buttonType={buttonTypes.BIG}
                    title="Sign in"
                    NavigationHandle={() => {
                        navigation.navigate(AuthRouteStrings.LOGIN_SCREEN)
                    }}
                />
                <CustomButton
                    buttonType={buttonTypes.BIG}
                    hasOutLine
                    hasBackground={false}
                    title="Sign me up"
                    NavigationHandle={() => {
                        navigation.navigate(AuthRouteStrings.USER_SIGN_UP)
                    }}
                />
            </View>

        </WrapperContainer>
    )
}

export default WelcomeScreen