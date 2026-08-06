import CreatePropertyBottom from "../_components/createPropertyLandlord/CreatePropertyBottom";
import CreatePropertyForm from "../_components/createPropertyLandlord/CreatePropertyForm";
import CreatePropertyHeader from "../_components/createPropertyLandlord/CreatePropertyHeader";

export const metadata = {
  title: "Create Rental Property | Landlord Dashboard",
  description: "Publish your properties for verified tenants.",
};

export default function CreatePropertyLandlordPage() {
  return (
    <main className="min-h-screen w-full bg-neutral-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Decorative Header Block with custom color indicators */}
        <CreatePropertyHeader/>
        {/* Form Placement Section with subtle background glow */}
        <div className="relative">
          {/* Subtle background ambient layout accent utilizing olive-200 / olive-300 palette gradients */}
          <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-[#DCEDC8] to-[#C5E1A5] opacity-20 blur-lg -z-10" />

          {/* Your React 19 optimized Form Component */}
          <CreatePropertyForm />
        </div>

        {/* Bottom Informational Segment */}
        <CreatePropertyBottom/>
      </div>
    </main>
  );
}
