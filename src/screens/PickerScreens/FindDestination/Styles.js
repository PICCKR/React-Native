import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { uiColours } from "../../../utils/Styles/uiColors"

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: scale(10),
        borderBottomWidth: moderateScale(1),
        paddingBottom: verticalScale(16),
        paddingHorizontal: scale(16),
       
    },
    inputContainer: {
        borderWidth: moderateScale(1),
        borderColor: uiColours.LIGHT_GRAY,
        padding: moderateScale(8),
        borderRadius: moderateScale(8),
        width: '94%'
    },
    inputView: {
        flexDirection: 'row',
        alignItems: "center",
        gap: scale(10)
    },
    locationView: {
        width: "90%",
        borderColor: uiColours.LIGHT_GRAY,
        paddingVertical:verticalScale(10)
    },
    selectMap: {
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(8),
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(6),
        borderColor: uiColours.LIGHT_GRAY,
        marginTop: verticalScale(10),
        flexDirection: "row",
        alignSelf:"flex-start",
        alignItems: "center",
        gap: scale(10),
    },
    savedLocationsView:{
        paddingVertical:moderateScale(16),
    },
    AddButton:{
        flexDirection:"row",
        alignItems:"center",
        borderWidth:moderateScale(1),
        alignSelf:"flex-start",
        borderColor:uiColours.LIGHT_GRAY,
        padding:moderateScale(12),
        borderRadius:moderateScale(6),
        gap:scale(10),
        width:scale(220)
    },
    recentDestinationView: {
        gap: verticalScale(10),
        marginTop: verticalScale(16),
        paddingHorizontal:scale(16)
    },
})
export default styles