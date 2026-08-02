import { getMe } from "@/services/getMe";
import { UserResponse } from "../_types/my_profile_types";

const LandlordDashboard = async () => {
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
        Landlord Dashboard
      </h1>

      {/* Profile Card */}
      <div className="bg-background border rounded-2xl shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* User Info */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>

            <span className="inline-block mt-2 rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary uppercase">
              {user.role}
            </span>
          </div>

          {/* Extra Info */}
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

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <div className="border rounded-xl p-4 bg-background">
          <p className="text-sm text-muted-foreground">Total Properties</p>
          <p className="text-xl font-bold">{user.ownProperties.length}</p>
        </div>

        <div className="border rounded-xl p-4 bg-background">
          <p className="text-sm text-muted-foreground">Total Requests</p>
          <p className="text-xl font-bold">
            {user.ownProperties.reduce(
              (acc, p) => acc + p.propertyRentRequests.length,
              0,
            )}
          </p>
        </div>

        <div className="border rounded-xl p-4 bg-background">
          <p className="text-sm text-muted-foreground">Available Properties</p>
          <p className="text-xl font-bold">
            {
              user.ownProperties.filter((p) => p.rentStatus === "AVAILABLE")
                .length
            }
          </p>
        </div>
      </div>

      {/* Optional: Property List Preview */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Your Properties</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {user.ownProperties.slice(0, 3).map((property, index) => (
            <div key={index} className="border rounded-xl p-4 bg-background">
              <p className="text-sm text-muted-foreground">
                {property.category?.name}
              </p>
              <p className="font-semibold text-base">{property.location}</p>
              <p className="text-sm">{property.areaInSqFt} sqft</p>
              <p className="text-primary font-bold mt-1">
                TK {property.rentPrice}
              </p>

              <span className="text-xs mt-2 inline-block bg-muted px-2 py-0.5 rounded">
                {property.rentStatus}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
