import { showToast } from "../components/tostConfig/tostConfig"
import { tostMessagetypes } from "../utils/Constents/constentStrings"
import { uiStrings } from "../utils/Constents/uiStrings"

export const showGeneralError = (isDark) =>{
    const toastMsgConfg = {
        isDark: isDark,
        msg: uiStrings.commonError
    }
    showToast(toastMsgConfg, tostMessagetypes.ERROR, isDark)
}