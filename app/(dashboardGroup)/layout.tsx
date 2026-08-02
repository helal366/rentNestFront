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
          <DashboardSidebar user={profile} />
          <main className="flex-1 p-6">{children}</main>
      </SidebarProvider>
    </section>
  );
};

export default DashboardGroupLayout;
