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

const NearByPickers = ({
    isVisible,
    setShowSheet,
    handleDecline,
    handleAccept,
    handleCancelRide
}) => {
    const { appStyles, isDark } = useContext(AppContext)

    const nearByPickersData = [
        {
            id: "1",
            lat: 12.293049583717883,
            lng: 76.63101437360515,
        },
        {
            id: "2",
            lat: 12.302739640568026,
            lng: 76.62731305608372
        },
        {
            id: "3",
            lat: 12.306077759217404,
            lng: 76.65507293749431
        },
        {
            id: "4",
            lat: 12.295053579462769,
            lng: 76.64540017987146
        },
    ]

    return (
        <BottomSheet
            isVisible={isVisible}
            title="Choose PicckR"
            renderRightView={() => {
                return (
                    <TouchableOpacity
                    onPress={handleCancelRide}
                    >
                        <Text style={appStyles.mediumTextGray}>
                            Cancel the ride
                        </Text>
                    </TouchableOpacity>
                )
            }}


            onBackdropPress={() => {
                // setShowSheet(false)
            }}
            handleRightClick={() => {
                setShowSheet(false)
            }}
            containerStyles={{ maxHeight: screenSize.height - verticalScale(150) }}
        >
            <FlatList
                data={nearByPickersData}
                keyExtractor={(item) => item?.id}
                showsVerticalScrollIndicator = {false}
                renderItem={({ item }) => {
                    return (
                        <View style={[styles.picckerCard,{
                            borderColor: isDark ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY
                        }]}>
                            <View style={styles.pickerProfile}>
                                <View style={styles.pickerProfileView}>
                                    {item?.profileImg ? <Image source={{ uri: item.profileImg }} /> : <Images.profile height={moderateScale(50)} width={moderateScale(50)} />}
                                </View>
                                <View>
                                    <Text style={appStyles?.smallTextPrimaryBold}>Cooper Septimus</Text>
                                    <Text style={appStyles?.smallTextGray}>AM666EE • Toyota Prius Hybris</Text>
                                    <View style={commonStyles.flexRowAlnCtr}>
                                        <Images.star />
                                        <Text style={appStyles.smallTextGray}>{4.9}</Text>
                                    </View>
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
                                    NavigationHandl={()=>handleDecline(item)}
                                />
                                <CustomButton
                                    buttonType={buttonTypes.MEDIUM}
                                    title={"Accept"}
                                    NavigationHandle={()=>{

                                        handleAccept(item)
                                    }}
                                />
                            </View>
                        </View>

                    )
                }}
            >

            </FlatList>

        </BottomSheet>
    )
}

export default NearByPickers