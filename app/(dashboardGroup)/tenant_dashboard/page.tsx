import { getMe } from "@/services/getMe";
import { UserResponse } from "../_types/my_profile_types";
import MyProfileJSX from "../_components/MyProfileJSX";

const TenantDashboard = async() => {
 const result: UserResponse | null = await getMe();

 if (!result?.data) {
   return <div>No profile found</div>;
 }

 return (
   <>
    <div className="font-bold text-center text-xl py-10">Tenant Dashboard</div>
     <MyProfileJSX data={result.data} />;
   </>
 );
}

export default TenantDashboard  