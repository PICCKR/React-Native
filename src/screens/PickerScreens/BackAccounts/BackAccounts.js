import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { commonStyles } from '../../../utils/Styles/CommonStyles'
import { scale, verticalScale } from 'react-native-size-matters'
import { AppContext } from '../../../context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { Images } from '../../../assets/images'
import styles from './Styles'
import { showToast } from '../../../components/tostConfig/tostConfig'
import { tostMessagetypes } from '../../../utils/Constents/constentStrings'
import { setLocalData } from '../../../helper/AsyncStorage'
import { uiColours } from '../../../utils/Styles/uiColors'
import axios from 'axios'
import { apiGet, apiPost, apiPut } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { showGeneralError } from '../../../helper/showGeneralError'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import Actions from '../../../redux/Actions'
import { showErrorToast } from '../../../helper/showErrorToast'
import AddAccount from './AddAccount'
import EditBankAccount from './EditBankAccount'

const BackAccounts = () => {
 const { appStyles, userData, isDark } = useContext(AppContext)
 const navigation = useNavigation()
 const [showSheet, setShowSheet] = useState({
  add: false,
  edit: false
 })

 const [bacnkAccounts, setBacnkAccounts] = useState([])

 const [bacnkAccountData, setBacnkAccountData] = useState({
  bankName: "",
  accountNumber: "",
  bankCode: "",
  country: ""
 })

 const [selectedAccount, setSelectedAccount] = useState(null)

 const handleUpdateBackAccount = async (accountData) => {
  setShowSheet({
   ...showSheet,
   edit: false
  })
  // console.log("accountData ==>", accountData);
  // return
  Actions.showLoader(true)
  apiPut(`${endPoints.BANK_ACCOUNT}/${selectedAccount?._id}`, bacnkAccountData).then((res) => {
   // console.log("resss=>", res?.data, res?.status);
   if (res?.status === 200) {
    getAccountData()
    showSuccessToast("You have successfully edited an vehicle", isDark)
   } else {
    showGeneralError()
   }
   Actions.showLoader(false)
  }).catch((error) => {
   Actions.showLoader(false)
   showGeneralError()
   console.log("error in edit address", error);
  })
 }

 const handleAddBackAccount = (newVehicle) => {

  // console.log("newAddress", newVehicle);
  // return
  setShowSheet({
   ...showSheet,
   add: false
  })
  Actions.showLoader(true)
  apiPost(endPoints.BANK_ACCOUNT, { ...newVehicle, userId: userData?._id }).then((res) => {
   // console.log("resss=>", res?.data, res?.status);

   if (res?.status === 201) {
    const data = res?.data?.data
    setBacnkAccounts((prev) => [...prev, res?.data?.data])
    showSuccessToast("You have successfully added an vehicle", isDark)
   } else {
    showErrorToast(res?.data?.message, isDark)
   }
   Actions.showLoader(false)
  }).catch((error) => {
   Actions.showLoader(false)
   showGeneralError()
   console.log("error in add address", error);
  })
 }

 const getAccountData = async () => {
  Actions.showLoader(true)
  apiGet(`${endPoints.BANK_ACCOUNT}`).then((res) => {
   // console.log("get vehicle res ", res?.data, res?.status);
   if (res?.status === 200) {
    setBacnkAccounts(res?.data?.data)
   } else {
    setBacnkAccounts([])
   }
   Actions.showLoader(false)
  }).catch((error) => {
   Actions.showLoader(false)
   console.log("error in get address", error);
  })
 }

 useEffect(() => {
  getAccountData()
 }, [])


 return (

  <WrapperContainer
   centerTitle="Bank account"
   showFooterButton={false}
   showBackButton
   handleBack={() => {
    navigation.goBack()
   }}
   containerPadding={{ paddingTop: verticalScale(10) }}
  >
   <View style={commonStyles.flexRowAlnCtrJutySpaceBetween}>
    <Text style={appStyles?.smallTextPrimaryBold}>
     Saved accounts ({bacnkAccounts.length}/3)
    </Text>
    {bacnkAccounts.length < 3 && <TouchableOpacity
     style={{ paddingVertical: verticalScale(5) }}
     onPress={() => {
      setShowSheet({
       ...showSheet,
       add: true
      })
     }}
    >
     <Text style={appStyles?.smallTextPrimary}>Add address</Text>
    </TouchableOpacity>}
   </View>
   {bacnkAccounts.length > 0 ? <FlatList
    data={bacnkAccounts}
    keyExtractor={(item) => item?._id}
    style={{ marginTop: verticalScale(10) }}
    renderItem={({ item }) => {
     return (
      <View style={{ marginBottom: verticalScale(16) }}>

       <View style={styles.card}>
        <View style={{ flex: 1, width: 200 }}>
         <Text style={appStyles.smallTextGrayBold}> Bank account :  </Text>
         <Text style={appStyles.smallTextGray}>
          {item?.bankName}
         </Text>

         <Text style={appStyles.smallTextGray}>
          <Text style={appStyles.smallTextGrayBold}> Account Number : </Text> {item?.accountNumber}
         </Text>
         <Text style={appStyles.smallTextGray}>
          <Text style={appStyles.smallTextGrayBold}> Bank Code :</Text>
          {item?.bankCode}
         </Text>
        </View>
        <TouchableOpacity
         style={styles.editIcon}
         onPress={() => {
          setShowSheet({
           ...showSheet,
           edit: true
          })
          setBacnkAccountData({
           ...bacnkAccountData,
           bankName: item?.bankName,
           accountNumber: item?.accountNumber,
           bankCode: item?.bankCode,
           country: item?.country
          })
          setSelectedAccount(item)
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
     You don't have any accounts saved please add
    </Text>

   }

   <AddAccount
    isVisible={showSheet?.add}
    setShowSheet={setShowSheet}
    handleAddBackAccount={handleAddBackAccount}
   />

   <EditBankAccount
    isVisible={showSheet?.edit}
    setShowSheet={setShowSheet}
    handleUpdateBackAccount={handleUpdateBackAccount}
    bacnkAccountData={bacnkAccountData}
    setBacnkAccountData={setBacnkAccountData}
   />
  </WrapperContainer>
 )
}

export default BackAccounts