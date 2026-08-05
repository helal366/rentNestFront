import { getMe } from "@/services/getMe";
import { UserResponse } from "../_types/my_profile_types";

const AdminDashboard = async () => {
  const result: UserResponse | null = await getMe();

  if (!result?.data) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-muted-foreground">
        No profile found
      </div>
    );
  }

  const user = result.data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Admin Dashboard
      </h1>

      {/* Admin Profile Card */}
      <div className="bg-background border rounded-2xl shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>

            <span className="inline-block mt-2 rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary uppercase">
              {user.role}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm w-full md:w-auto">
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">{user.contactNo}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Address</p>
              <p className="font-medium">{user.address}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Status</p>
              <p className="font-medium">{user.userStatus}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Joined</p>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* System Stats */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="border rounded-xl p-4 bg-background">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-xl font-bold">

            --
          </p>
        </div>

        <div className="border rounded-xl p-4 bg-background">
          <p className="text-sm text-muted-foreground">Total Properties</p>
          <p className="text-xl font-bold">--</p>
        </div>

        <div className="border rounded-xl p-4 bg-background">
          <p className="text-sm text-muted-foreground">Rental Requests</p>
          <p className="text-xl font-bold">--</p>
        </div>

        <div className="border rounded-xl p-4 bg-background">
          <p className="text-sm text-muted-foreground">Active Listings</p>
          <p className="text-xl font-bold">--</p>
        </div>
      </div> */}


    </div>
  );
};

export default AdminDashboard;
