
import { getMe } from "@/services/getMe";
import MyProfileJSX from "../_components/MyProfileJSX";
import { UserProfile, UserResponse } from "../_types/my_profile_types";

const MyProfile = async() => {
const result:UserResponse|null =await getMe();
let data:UserProfile
if(result && result.data){
  data = result.data;
}
// console.log(result)

  return <MyProfileJSX data={data}/>
};

export default MyProfile;
 