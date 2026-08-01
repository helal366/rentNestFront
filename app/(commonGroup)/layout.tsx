import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/services/getMe";
import { Suspense } from "react";
import Loading from "../loading";

const CommonGroupLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const profile = await getMe();
  return (
    <div>
      <Navbar user={profile} />
      <Suspense fallback={<Loading/>}>{children}</Suspense>
    </div>
  );
};

export default CommonGroupLayout;
