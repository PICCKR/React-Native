import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import styles from './Styles'
import { Images } from '../../../assets/images'
import { uiColours } from '../../../utils/Styles/uiColors'
import Form from '../../../components/Form/Form'
import { GOOGLE_MAP_API_KEY } from '../../../configs/google_map_api_key'
import { RegEx } from '../../../utils/Constents/regulerexpressions'
import SetLocationModal from '../../../components/SetLocationModal/SetLocationModal'
import { showGeneralError } from '../../../helper/showGeneralError'
import WrapperContainer from '../../../components/WrapperContainer/WrapperContainer'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Actions from '../../../redux/Actions'
import { apiPost, apiPut } from '../../../services/apiServices'
import { endPoints } from '../../../configs/apiUrls'
import { showSuccessToast } from '../../../helper/showSuccessToast'
import { showGeneralErrorToast } from '../../../components/tostConfig/tostConfig'
import { AuthRouteStrings } from '../../../utils/Constents/RouteStrings'

const AddAddress = ({ route }) => {
 const action = route?.params?.action
 const from = route?.params?.from
 const data = route?.params?.data
 const navigation = useNavigation()
 const { appStyles, isDark, profileInformation, setProfileInformation } = useContext(AppContext)
 const userData = useSelector((state) => state?.userDataReducer?.userData)

 const [buttonActive, setButtonActive] = useState(false)

 const [addressData, setAddresData] = useState({
  title: data?.title ? data?.title : "",
  coordinates: data?.coordinates ? data?.coordinates : [],
  type: data?.type ? data?.type : "",
  street_address: data?.street_address ? data?.street_address : "",
  favorite: false,
  house_number: data?.house_number ? data?.house_number : "",
  building_name: data?.building_name ? data?.building_name : ""
 })

 const [showError, setShowError] = useState()
 const [showSetLocationModal, setShowSetLocationModal] = useState(false)

 const addresTypeData = [
  {
   id: "1",
   type: "Home",
   icon: Images.home
  },
  {
   id: "2",
   type: "Work",
   icon: Images.work
  },
 ]

 const addData = [
  {
   id: 1,
   title: 'Building name',
   placeHolder: "Input a building name",
   type: "building_name",
   isRequired: true,
   errorMsg: "Enter valid Building name",
   validationString: RegEx.notEmpty,
   keyboardType: "default"

  },
  {
   id: 2,
   title: 'Home number',
   placeHolder: "e.g 456",
   type: "house_number",
   maxLenght: 100,
   errorMsg: "",
   isRequired: true,
   errorMsg: "Enter valid Home number",
   validationString: RegEx.notEmpty,
   keyboardType: "numeric"
  }
 ]

 useEffect(() => {
  if (
   addressData?.type !== '' &&
   addressData?.house_number !== "" &&
   addressData?.house_number !== "" &&
   addressData.street_address !== ""
  ) {
   setButtonActive(true);
  } else {
   setButtonActive(false);
  }
 }, [addressData]);

 const handleAddAddress = () => {

  const newAddressData = { ...addressData, userId: userData?._id }
  Actions.showLoader(true)
  apiPost(endPoints.ADD_ADDRESS, newAddressData).then((res) => {
   console.log("res?.data?.data", res?.data?.data);

   if (res?.status === 201) {
    Actions.userData({ ...userData, addresses: [...userData?.addresses, res?.data?.data] })
    navigation.goBack()
    showSuccessToast("You have successfully added an address", isDark)
   } else {
    showGeneralErrorToast()
   }
   Actions.showLoader(false)
  }).catch((error) => {
   Actions.showLoader(false)
   showGeneralErrorToast()
   console.log("error in add address", error);
  })
 }


 const handleEditAddress = async () => {
  Actions.showLoader(true)
  apiPut(`${endPoints.ADD_ADDRESS}/${data?._id}`, addressData).then(async (res) => {
   if (res?.status === 200) {
    const d = res?.data?.data
    console.log("data===>?", d);
    const updatedAddress = await userData?.addresses?.map((item) => {
     if (item?._id === data?._id) {
      return d
     } else {
      return item
     }
    })
    Actions.userData({ ...userData, addresses: updatedAddress })
    navigation.goBack()
    showSuccessToast("You have successfully edited an address", isDark)
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

 return (
  <WrapperContainer
   buttonTitle={action === "add" ? "Add address" : "Save address"}
   leftTitle="Address"
   hasCloseIcon
   handlerRightViewPress={() => {
    navigation.goBack()
   }}
   buttonActive={buttonActive}
   handleButtonPress={async () => {
    if (from === AuthRouteStrings.PROFILE_INFORMATION) {
     if (action === "add") {
      setProfileInformation({
       ...profileInformation,
       address: [...profileInformation?.address, addressData]
      })
      navigation.goBack()
     } else {
      var addresss = profileInformation.address
      const newAddress = await addresss.map((item) => {
       // console.log(item.id, addressData.id);
       if (item.id === addressData.id) {
        return addressData
       } else {
        return item
       }
      })

      setProfileInformation({
       ...profileInformation,
       address: newAddress
      })
      navigation.goBack()
     }
    } else {
     if (action === "add") {
      handleAddAddress()
     } else {
      handleEditAddress()
     }
    }
   }}
  >
   <ScrollView style={{}}>
    <View style={{ paddingBottom: verticalScale(16), gap: verticalScale(5) }}>
     <Text style={appStyles.smallTextBlack}>
      Address type
     </Text>
     <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(10) }}>
      {
       addresTypeData.map((item) => {
        const selected = addressData?.type === item.type
        return (
         <TouchableOpacity key={item.id}
          style={{
           flexDirection: 'row',
           padding: moderateScale(9),
           gap: scale(5),
           borderWidth: moderateScale(1),
           borderRadius: moderateScale(6),
           borderColor: (selected && !isDark) ? uiColours.PRIMARY : (!selected && isDark) ? uiColours.GRAYED_BUTTON : uiColours.LIGHT_GRAY,
           backgroundColor: selected ? uiColours.GOLDEN_LIGHT : null
          }}
          onPress={() => {
           setAddresData({
            ...addressData,
            type: item.type
           })
          }}
         >
          <Image source={item.icon} style={{
           height: moderateScale(20),
           width: moderateScale(20),
           tintColor: selected ? uiColours.PRIMARY : uiColours.GRAY_TEXT

          }} />
          <Text style={appStyles.smallTextGray}>{item.type}</Text>
         </TouchableOpacity>
        )
       })
      }
     </View>
    </View>

    <Form
     data={addData}
     formData={addressData}
     setFormData={setAddresData}
     setShowError={setShowError}
     ShowError={showError}
    />
    <View style={{ flex: 1, marginTop: verticalScale(16), marginBottom: verticalScale(60) }}>
     <Text style={appStyles.smallTextBlack}>Set location</Text>
     <TouchableOpacity
      style={styles.setAddress}
      onPress={() => {
       setShowSetLocationModal(true)
      }}
     >
      <View style={{}}>
       <Images.locationPin />
      </View>
      <Text>
       {addressData?.street_address ? addressData?.street_address : "Set location"}
      </Text>
     </TouchableOpacity>
    </View>

   </ScrollView>




   <SetLocationModal
    isVisible={showSetLocationModal}
    setShowModal={setShowSetLocationModal}
    showSelectfromMap={false}
    handleSelectFromMap={() => {

    }}
    handleSelectLocation={async (data, details = null) => {
     if (data && data.place_id) {
      try {
       setShowSetLocationModal(false)
       const placeId = data.place_id;
       const apiKey = GOOGLE_MAP_API_KEY;
       const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
       const response = await fetch(detailsUrl);
       const json = await response.json();
       if (json.status === 'OK' && json.result && json.result.geometry) {
        const { lat, lng } = json.result.geometry.location;
        setAddresData({
         ...addressData,
         street_address: data?.description,
         coordinates: [lat, lng]
        })
       }

      } catch (error) {
       console.error('Error fetching place details:', error);
       showGeneralError(isDark)
      }
     }
    }}
   />
  </WrapperContainer>
 )
}

export default AddAddress