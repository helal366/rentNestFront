import { getMe } from "@/services/getMe";
import MyProfileJSX from "../_components/MyProfileJSX";
import { UserResponse } from "../_types/my_profile_types";

const MyProfile = async() => {
 const result: UserResponse | null = await getMe();

 if (!result?.data) {
   return <div>No profile found</div>;
 }

  return <MyProfileJSX data={result.data}/>
};

export default MyProfile;
 