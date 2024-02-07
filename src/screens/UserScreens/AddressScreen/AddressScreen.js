import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { verticalScale } from 'react-native-size-matters'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { uiColours } from '../../../utils/Styles/uiColors'
import { useSelector } from 'react-redux'
import { MainRouteStrings } from '../../../utils/Constents/RouteStrings'

const AddressScreen = () => {
    const { appStyles } = useContext(AppContext)
    const userData = useSelector((state) => state?.userDataReducer?.userData)
    const navigation = useNavigation()

    return (

        <WrapperContainer
            centerTitle="Address"
            showFooterButton={false}
            showBackButton
            handleBack={() => {
                navigation.goBack()
            }}
            containerPadding={{ paddingTop: verticalScale(16) }}
        >
            <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                <Text style={appStyles?.smallTextPrimaryBold}>
                    Saved address ({userData?.addresses?.length}/3)
                </Text>
                {userData?.addresses?.length < 3 && <TouchableOpacity
                    style={{ paddingVertical: verticalScale(5) }}
                    onPress={() => {
                        navigation.navigate(MainRouteStrings.ADD_ADDRESS, {
                            action: "add"
                        })
                    }}
                >
                    <Text style={appStyles?.smallTextPrimary}>Add address</Text>
                </TouchableOpacity>}
            </View>

            {userData?.addresses?.length > 0 ? <FlatList
                data={userData?.addresses}
                keyExtractor={(item) => item?._id}
                style={{ marginTop: verticalScale(10) }}
                renderItem={({ item }) => {
                    return (
                        <View style={{ marginBottom: verticalScale(16) }}>
                            <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                                <View style={[commonStyles.flexRowAlnCtr, { flex: 1 }]}>
                                    {item?.type === "Home" ? <Image source={Images.home} style={[commonStyles.icon, { tintColor: uiColours.PRIMARY }]} /> : <Image source={Images.work} style={[commonStyles.icon, { tintColor: uiColours.PRIMARY }]} />}
                                    <View style={{ width: "84%" }}>
                                        <Text style={appStyles.smallTextPrimary}>
                                            {item?.type}
                                        </Text>
                                        <Text style={appStyles.smallTextGray}>
                                            {item?.street_address}
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={styles.addresEditIcon}
                                    onPress={() => {

                                        navigation.navigate(MainRouteStrings.ADD_ADDRESS, {
                                            action: "edit",
                                            data: item
                                        })

                                    }}
                                >
                                    <Images.edit />
                                </TouchableOpacity>

                            </View>

                        </View>
                    )
                }}
            >

            </FlatList> :
                <Text style={[appStyles.mediumTextBlack, {
                    alignSelf: "center",
                    marginTop: '50%',
                    textAlign: 'center'
                }]}>
                    You don't have any address saved please add
                </Text>

            }
        </WrapperContainer>
    )
}

export default AddressScreen