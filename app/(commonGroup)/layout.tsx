import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/services/getMe";

const CommonGroupLayout = async (
    { children }: { children: React.ReactNode }) => {
        const profile = await getMe()
  return <div>
     <Navbar user={profile}/>
    {children}
  </div>;
};

export default CommonGroupLayout;