import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/services/getMe";

export default async function Home() {
  const profile = await getMe();
  return (
    <section>
      <Navbar user={profile}/>
      <Home/>
    </section>
  );
}
