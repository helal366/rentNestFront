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
        <div className="flex flex-1">
          <DashboardSidebar user={profile} />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </SidebarProvider>
    </section>
  );
};

export default DashboardGroupLayout;
