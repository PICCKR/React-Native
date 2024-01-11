import { decode } from "react-native-pure-jwt";

export const decodeToken = async (token) =>{
    try {
      const val = await decode(token, "your-secret-key",
        {
          skipValidation: true // to skip signature and exp verification
        }
      )
      console.log("token res", val);
      return val?.payload
      
    } catch (error) {
      console.log("decode error", error);
    }
  }