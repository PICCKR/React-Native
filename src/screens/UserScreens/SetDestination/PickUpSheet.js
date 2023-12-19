import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Styles } from './Styles'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import CustomButton from '../../../components/Button/CustomButton'
import { uiColours } from '../../../utils/Styles/uiColors'
import { RegEx } from '../../../utils/Constents/regulerexpressions'
import Form from '../../../components/Form/Form'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import { Images } from '../../../assets/images'

const PickUpSheet = ({
    location,
    appStyles,
    handleNext,
    isDark,
    formData,
    setFormData,
    isVisible,
    handleBackClick,
    handleEdit,
    handlePickDate

}) => {

    const pickupFormData = [
        {
            id: 1,
            title: 'Name',
            placeHolder: "Input your name",
            type: "name",
            maxLenght: 100,
            isRequired: true,
            errorMsg: "Enter valid first name",
            validationString: RegEx.name__regEx
        },
        {
            id: 2,
            title: 'Phone Number',
            placeHolder: "Input phone number",
            type: "phoneNumber",
            maxLenght: 100,
            isRequired: true,
            errorMsg: "Enter valid Phone Number",
            validationString: RegEx.notEmpty
        },
    ]

    const [showError, setShowError] = useState(false)
    const [buttonActive, setButtonActive] = useState(false)

    console.log("FORM ADTAA", formData);

    useEffect(() => {
        if (formData.name !== "" && formData.phoneNumber) {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }
    }, [formData])

    return (
        <BottomSheet
            isVisible={isVisible}
            // hasCloseIcon
            title="Pick-up Details"
            hasBackButton
            handleBackClick={handleBackClick}
            containerStyles={{ padding: 0 }}
        >
            <View style={[commonStyles.bottomBorder, Styles.bottomViewContent]}>
                <Text style={[appStyles?.smallTextBlack, { flex: 1 }]}>
                    {location?.location}
                </Text>
                <TouchableOpacity
                    onPress={handleEdit}
                    style={{ paddingVertical: verticalScale(2) }}
                >
                    <Text style={[appStyles?.smallTextPrimaryBold]}>Edit</Text>
                </TouchableOpacity>

            </View>

            <View style={[commonStyles.bottomBorder, Styles.recipientDetails]}>
                <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
                    <Text style={appStyles.mediumTextBlackBold}>
                        Sender details<Text style={{ color: uiColours.RED }}>*</Text>
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setFormData({
                                name: "",
                                phoneNumber: ""
                            })
                        }}
                    >
                        <Text style={appStyles.smallTextGray}>
                            Clear details
                        </Text>
                    </TouchableOpacity>
                </View>

                <Form
                    data={pickupFormData}
                    formData={formData}
                    setFormData={setFormData}
                    ShowError={showError}
                    setShowError={setShowError}
                />

                <Text style={[appStyles.smallTextBlack,{marginTop:verticalScale(10)}]}>
                    Pick-up date
                </Text>
                <TouchableOpacity
                    style={Styles.pickupButton}
                    onPress={handlePickDate}
                >
                    <Text>
                        {formData?.pickupDate}
                    </Text>
                    <Images.downArrow />
                </TouchableOpacity>
            </View>

            <CustomButton
                buttonStyle={{
                    backgroundColor: buttonActive ? uiColours.PRIMARY :
                        !buttonActive && isDark ? uiColours.GRAYED_BUTTON :
                            uiColours.LIGHT_GRAY,
                    marginVertical: verticalScale(16)
                }}
                titleStyle={{
                    color: buttonActive ? uiColours.WHITE_TEXT : !buttonActive && isDark ? uiColours.GRAYED_BUTTON :
                        uiColours.GRAY_TEXT
                }}
                title="Next"
                NavigationHandle={handleNext}
                disabled={!buttonActive}
            />
        </BottomSheet>
    )
}

export default PickUpSheet