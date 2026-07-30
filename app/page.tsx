import { getMe } from "@/services/getMe";

export default async function Home() {
  const profile = await getMe();
  console.log({profile})
  return (
    <section>
      <p>Home page</p>
    </section>
  );
}
