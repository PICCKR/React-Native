import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import styles from './Styles'
import { AppContext } from '../../../context/AppContext'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import ProfileView from '../../../components/PrifileView/ProfileView'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Images } from '../../../assets/images'
import CustomButton from '../../../components/Button/CustomButton'
import { uiColours } from '../../../utils/Styles/uiColors'
import { buttonTypes } from '../../../utils/Constents/constentStrings'

const RequestTab = ({
    item,
    handleAccept
}) => {
    const { appStyles, isDark } = useContext(AppContext)
    return (
        <View style={[styles.tripCard, appStyles.borderColor]}>
            <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                <View style={[commonStyles.flexRowAlnCtr,{flex:1}]}>
                    <ProfileView
                        hasBottomLine={false}
                        size={moderateScale(40)}
                    />

                    <View style={{ width: '75%'}}>
                        <Text style={appStyles.smallTextPrimaryBold}>
                            {item?.picker}
                        </Text>
                        <Text style={appStyles.smallTextGray}>
                            Send to
                            <Text style={appStyles.smallTextPrimary}>
                                {item?.dateAndTime}
                            </Text>
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Images.star height={moderateScale(20)} width={moderateScale(20)} />
                            <Text style={[appStyles.smallTextGray, {
                                top: verticalScale(2)
                            }]}>
                                {item?.rating}
                            </Text>
                        </View>
                    </View>

                </View>

                <View style={{ alignItems: "flex-end" }}>
                    <Text style={appStyles.smallTextPrimaryBold}>
                        ${item?.amount}
                    </Text>
                    <Text style={appStyles.smallTextGray}>
                        {item?.distence}kg
                    </Text>

                    <Text style={appStyles.smallTextGray}>
                        {item?.time}
                    </Text>
                </View>
            </View>
            <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                <CustomButton
                    buttonType={buttonTypes.MEDIUM}
                    title="Decline"
                    hasBackground={false}
                    hasOutLine
                    buttonStyle={{ borderColor: uiColours.RED }}
                    titleStyle={{ color: uiColours.RED }}
                />
                <CustomButton
                    NavigationHandle={()=>handleAccept(item)}
                    buttonType={buttonTypes.MEDIUM}
                    title="Accept"
                />
            </View>
        </View>
    )
}

export default RequestTab