import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import { AppContext } from '../../../context/AppContext'
import styles from './Styles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '../../../assets/images'

const ShowAddressSheet = ({
    isVisible,
    setShowSheet,
    profileInformation,
    handleAddAddress,
    handleAddressEdit,
    setAction
}) => {
    const { appStyles, isDark } = useContext(AppContext)
    const address = profileInformation?.address


    return (
        <BottomSheet
            isVisible={isVisible}
            hasCloseIcon
            title="Address"
            onBackdropPress={() => {
                setShowSheet(false)
            }}
            handleRightClick={() => {
                setShowSheet(false)
            }}
        >

            <View style={styles.addressSheetHeader}>
                <Text style={appStyles.smallTextBlack}>
                    Saved address ({`${address?.length}/3`})
                </Text>
                {address?.length < 3 && <TouchableOpacity
                    onPress={handleAddAddress}
                    style={{ paddingVertical: verticalScale(5) }}
                >
                    <Text style={appStyles.smallTextPrimaryBold}>
                        Add address
                    </Text>
                </TouchableOpacity>}
            </View>

            <View style={{ paddingVertical: verticalScale(10) }}>

                {address?.length === 0 ?
                    <Text style={[appStyles.smallTextGray, { width: '60%', textAlign: "center", alignSelf: 'center', paddingVertical: verticalScale(30) }]}>
                        You don’t have saved address.
                        Please add address first
                    </Text> :
                    <View style={{ gap: verticalScale(10) }}>
                        {address?.map((item, index) => {
                            return (
                                <View key={index.toString()} style={styles.addresCard}>
                                    <View style={{ flexDirection: "row", alignItems: 'center', maxWidth: "90%" }}>
                                        <Image source={Images.home} style={{
                                            height: moderateScale(20),
                                            width: moderateScale(20),
                                        }} />

                                        <View style={{ marginLeft: scale(10) }}>
                                            <Text style={appStyles.smallTextPrimary}>
                                                {item?.type}
                                            </Text>
                                            <Text style={appStyles.smallTextPrimary}>
                                                {item?.building_name} {item?.house_number}
                                            </Text>
                                            <Text style={appStyles.smallTextPrimary}>
                                                {item?.street_address}
                                            </Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.addresEditIcon}
                                        onPress={()=>handleAddressEdit(item)}
                                    >
                                        <Images.edit />
                                    </TouchableOpacity>

                                </View>
                            )
                        })}
                    </View>
                }
            </View>

        </BottomSheet>
    )
}

export default ShowAddressSheet