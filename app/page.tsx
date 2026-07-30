import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/services/getMe";

export default async function Home() {
  const profile = await getMe();
  console.log({profile})
  return (
    <section>
      <Navbar user={profile}/>
      <p>Home page</p>
    </section>
  );
}
