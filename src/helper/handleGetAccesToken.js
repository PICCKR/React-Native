import { fetchAuthSession } from "@aws-amplify/auth";
import axios from "axios";
import { endPoints } from "../configs/apiUrls";
import { decodeToken } from "./decodeToken";

export const handleGetAccesToken = async () => {
  try {
    // get idToken from cognito
    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    console.log("idToken", idToken);
    // console.log("idToken.toString()", idToken.toString());
    // pass this to in headers to get jwt token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken.toString()}`,
      },
    };

    axios.post(endPoints.GET_TOKEN, {}, config)
      .then(async (result) => {
        const { data, status } = result;
        if (status == 200) {
          const userInformaton = await decodeToken(data?.token)
          //  console.log("userInformaton ====> in", userInformaton);
          const res = {
            userInformaton: userInformaton,
            token: data?.token
          }
          return res
        } else {
          return null
        }
      })
      .catch(async (error) => {
        console.log("error in ", error);
        return null
      });
  } catch (err) {
    console.log("error", err);
    return null
  }
}