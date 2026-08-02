import Navbar from "@/components/shared/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getMe } from "@/services/getMe";
import DashboardSidebar from "./_components/DashboardSidebar";

const DashboardGroupLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const profile = await getMe();
  return (
    <section className="min-h-screen flex flex-col">
      <Navbar user={profile} />
      <SidebarProvider>
        <div className="grid md:grid-cols-3 lg:grid-cols-4">
          <DashboardSidebar user={profile} />
          <main className="md:col-span-2 lg:col-span-3 flex justify-center">{children}</main>
        </div>
      </SidebarProvider>
    </section>
  );
};

export default DashboardGroupLayout;
