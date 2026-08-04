import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/services/getMe";
import { Hero } from "./(commonGroup)/_components/home/Hero";
import { AvailableProperties } from "./(commonGroup)/_components/home/AvailableProperties";

export default async function Home() {
  const profile = await getMe();
  return (
    <section>
      <Navbar user={profile} />
      <Hero />
      <AvailableProperties />
    </section>
  );
}
