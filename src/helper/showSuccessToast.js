import { showToast } from "../components/tostConfig/tostConfig"
import { tostMessagetypes } from "../utils/Constents/constentStrings"

export const showSuccessToast = (msg, isDark) =>{
    const toastMsgConfg = {
        isDark: isDark,
        msg: msg
      }
      showToast(toastMsgConfg, tostMessagetypes.SUCCESS, isDark)
}