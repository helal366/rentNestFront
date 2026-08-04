import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/services/getMe";
import { Hero } from "./(commonGroup)/_components/home/Hero";
import { AvailableProperties } from "./(commonGroup)/_components/home/AvailableProperties";
import { Footer } from "./(commonGroup)/_components/footer/Footer";
import { HowItWorks } from "./(commonGroup)/_components/home/HowItWorks";
import { WhyChooseUs } from "./(commonGroup)/_components/home/WhyChooseUs";
import { RecentlyAddedProperties } from "./(commonGroup)/_components/home/RecentlyAddedProperties";

export default async function Home() {
  const profile = await getMe();
  return (
    <section>
      <Navbar user={profile} />
      <Hero />
      <AvailableProperties />
      <HowItWorks />
      <WhyChooseUs />
      <RecentlyAddedProperties />
      <Footer />
    </section>
  );
}
