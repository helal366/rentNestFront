import { fetchAdminUsers } from "../_actions/fetchAdminUsers";
import UsersDashboardClient from "../_components/users/UsersDashboardClient";

export default async function AdminUsersPage() {

  const apiResult = await fetchAdminUsers();

  if (!apiResult.success) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <div className="rounded-lg bg-destructive/10 p-4 font-medium text-destructive">
          Error loading dashboard: {apiResult.message}
        </div>
      </div>
    );
  }


  return (
     <UsersDashboardClient 
      initialUsers={apiResult.data.users} 
      initialTotal={apiResult.data.meta.totalUsers} 
    />
  );
}
