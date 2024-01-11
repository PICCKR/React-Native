import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import styles from './Styles'
import { AppContext } from '../../../context/AppContext'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import ProfileView from '../../../components/PrifileView/ProfileView'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Images } from '../../../assets/images'
import CustomButton from '../../../components/Button/CustomButton'
import { uiColours } from '../../../utils/Styles/uiColors'
import { buttonTypes, tostMessagetypes } from '../../../utils/Constents/constentStrings'
import ConfirmationSheet from '../../../components/ConfirmationSheet/ConfirmationSheet'
import { showToast } from '../../../components/tostConfig/tostConfig'
import VehicleIconView from '../../../components/VehicleIconView/VehicleIconView'

const RequestTab = ({
    item,
    handleAccept,
    handleDecline
}) => {
    const { appStyles, isDark } = useContext(AppContext)
    const [showSheet, setShowSheet] = useState({
        confirmtion: false
    })
    return (
        <View style={[styles.tripCard, appStyles.borderColor]}>
            <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                <View style={[commonStyles.flexRowAlnCtr, { flex: 1 }]}>
                    <ProfileView
                        hasBottomLine={false}
                        size={moderateScale(40)}
                    />

                    <View style={{ width: '75%' }}>
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
                    NavigationHandle={() => {
                        setShowSheet({
                            ...showSheet,
                            confirmtion: true
                        })
                    }}
                    buttonStyle={{ borderColor: uiColours.RED }}
                    titleStyle={{ color: uiColours.RED }}
                />
                <CustomButton
                    NavigationHandle={() => handleAccept(item)}
                    buttonType={buttonTypes.MEDIUM}
                    title="Accept"
                />
            </View>


            <ConfirmationSheet
                setShowSheet={setShowSheet}
                headerTitle="Confirmation"
                isVisible={showSheet.confirmtion}
                title="Are you sure you want to decline this order?"
                discription="You will not be charged a penalty if you cancel your order"
                button1Title='Back'
                button2Title='Yes, decline'
                handleButton1Click={() => {
                    setShowSheet({
                        ...showSheet,
                        confirmtion: false
                    })
                }}
                handleButton2Click={() => {
                    setShowSheet({
                        ...showSheet,
                        confirmtion: false
                    })

                    handleDecline()
                }}
                renderIcon={() => {
                    return (
                        <VehicleIconView />
                    )

                }}
            />
        </View>
    )
}

export default RequestTab