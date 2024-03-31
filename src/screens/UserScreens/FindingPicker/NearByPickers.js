import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import { AppContext } from '../../../context/AppContext'
import styles from './Styles'
import { commonStyles, screenSize } from '../../../utils/Styles/CommonStyles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '../../../assets/images'
import DotsLoader from '../../CommonScreens/DotsLoader/DotsLoader'
import CustomButton from '../../../components/Button/CustomButton'
import { buttonTypes } from '../../../utils/Constents/constentStrings'
import { uiColours } from '../../../utils/Styles/uiColors'
import DragableBottomSheet from '../../../components/DragableBottomSheet/DragableBottomSheet'
import { formatAmount } from '../../../helper/formatter'
import ProfileView from '../../../components/PrifileView/ProfileView'

const NearByPickers = ({
    isVisible,
    setShowSheet,
    handleDecline,
    handleAccept,
    handleCancelRide,
    nearByPickersData = [],
    navigation
}) => {
    const { appStyles, isDark } = useContext(AppContext)

    return (
        <DragableBottomSheet
            index={nearByPickersData?.length}
        >
            <View style={[appStyles.bottomBorder, styles.header]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={{ paddingHorizontal: scale(16) }}
                >
                    <Images.backArrow />
                </TouchableOpacity>

            </View>

            {nearByPickersData?.length > 0 ? <FlatList
                data={nearByPickersData}
                keyExtractor={(item) => item?._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View style={[styles.picckerCard, {
                            borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                        }]}>
                            <View style={styles.pickerProfile}>
                                <ProfileView
                                    profileImg={item?.picckrId?.picture}
                                    hasBottomLine={false}
                                    profileSection={{ paddingBottom: 0 }}
                                    size={30}
                                />
                                {/* <View style={styles.pickerProfileView}>

                                    {item?.picckrId?.picture ? <Image source={{ uri: item?.picckrId?.picture }} style={{
                                        height: moderateScale(30), width: moderateScale(30)
                                    }} /> : <Images.profile height={moderateScale(30)} width={moderateScale(30)} />}
                                </View> */}
                                <View style={{ flex: 1 }}>
                                    <Text style={appStyles?.smallTextPrimaryBold}>{item?.picckrId?.firstName}</Text>
                                    <Text style={appStyles?.smallTextGray}>{item?.picckrId?.vehicle?.plateNumber} • {item?.picckrId?.vehicle?.model} • {item?.picckrId?.vehicle?.color}</Text>
                                    {/* <View style={commonStyles.flexRowAlnCtr}>
                                        <Images.star />
                                        <Text style={appStyles.smallTextGray}>{4.9}</Text>
                                    </View> */}
                                </View>
                                <View>
                                    <Text style={appStyles?.smallTextPrimaryBold}>
                                        Bid price
                                    </Text>
                                    <Text style={appStyles?.smallTextPrimaryBold}>
                                        {formatAmount(item?.bidAmount)}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.buttonsView}>
                                <CustomButton
                                    buttonType={buttonTypes.MEDIUM}
                                    hasOutLine
                                    hasBackground={false}
                                    buttonStyle={{ borderColor: uiColours.RED }}
                                    title={"Decline"}
                                    titleStyle={{ color: uiColours.RED }}
                                    NavigationHandle={() => handleDecline(item)}
                                />
                                <CustomButton
                                    buttonType={buttonTypes.MEDIUM}
                                    title={"Accept"}
                                    NavigationHandle={() => {
                                        handleAccept(item)
                                    }}
                                />
                            </View>
                        </View>

                    )
                }}
            >

            </FlatList> :

                <View style={{ justifyContent: 'center', alignItems: "center", width: '90%' }}>
                    <Text style={[appStyles?.mediumTextBlack, { textAlign: 'center' }]}>
                        Please wait, we are connecting to nearby pickers
                    </Text>
                </View>


            }
        </DragableBottomSheet>

    )
}

export default NearByPickers