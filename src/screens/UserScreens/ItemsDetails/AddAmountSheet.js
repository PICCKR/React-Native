import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from './Styles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import PayWithFlutterwave from 'flutterwave-react-native'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import InputText from '../../../components/InputText/InputText'
import CustomButton from '../../../components/Button/CustomButton'

const AddAmountSheet = ({
 isVisible,
 setShowSheet,
 appStyles,
 handleOnRedirect = () => { },
 sheetTitle,
 orderDeatils,
 setItemsDetails
}) => {
 const [buttonActive, setButtonActive] = useState(true)

 /* An example function to generate a random transaction reference */
 const generateTransactionRef = (length = 10) => {
  var result = '';
  var characters =
   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
   result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `flw_tx_ref_${result}`;
 };


 return (
  <BottomSheet
   isVisible={isVisible}
   title={sheetTitle}
   hasCloseIcon
   setShowModal={setShowSheet}
   buttonActive={buttonActive}
   handleRightClick={() => {
    setShowSheet(false)
   }}
   onBackdropPress={() => {
    setShowSheet(false)
   }}
   showFooterButton={false}
  // buttonTitle={"Top Up"}
  >
   <ScrollView style={{}}>
    <View style={{}}>

     <Text style={[appStyles?.smallTextPrimaryBold]}>
      Add ₦{orderDeatils?.amountToBeAdded?.toString()} to place an order
     </Text>
    </View>


    <InputText
     hasTitle
     inputTitle="Enter amount(₦)"
     handleChange={(e) => {
      const amount = parseInt(e)
      if (amount >= orderDeatils?.amountToBeAdded) {
       setButtonActive(true)

      } else {
       setButtonActive(false)
      }
     }}
     keyboardType="numeric"
     value={orderDeatils?.amountToBeAdded?.toString()}
     inputContainer={{ marginVertical: verticalScale(30) }}
     editable={false}
    />

    <PayWithFlutterwave
     onRedirect={(data) => { handleOnRedirect(data, orderDeatils?.amountToBeAdded) }}
     options={{
      tx_ref: generateTransactionRef(10),
      authorization: 'FLWPUBK_TEST-7f4ea27a4d79df5c4de2c602d199b213-X',
      customer: {
       email: "mahammadsuhel17@gmail.com"
      },
      amount: parseInt(orderDeatils?.amountToBeAdded),
      currency: 'NGN',
      payment_options: 'card'
     }}
     customButton={(props) => (
      <CustomButton
       NavigationHandle={props.onPress}
       isBusy={props.isInitializing}
       disabled={props.disabled}
       title={sheetTitle}
      />
     )}
     onInitializeError={(err) => {
      console.log("error", err);
     }}
    />

   </ScrollView>
  </BottomSheet>
 )
}

export default AddAmountSheet