import CreatePropertyForm from "../_components/createPropertyLandlord/CreatePropertyForm";

export const metadata = {
  title: "Create Rental Property | Landlord Dashboard",
  description: "Publish your properties for verified tenants.",
};

export default function CreatePropertyLandlordPage() {
  return (
    <main className="min-h-screen w-full bg-neutral-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Decorative Header Block with custom color indicators */}
        <div className="p-6 md:p-8 rounded-xl bg-white border border-neutral-200 shadow-sm relative overflow-hidden">
          {/* Top structural accent bar using your signature olive-300 palette color */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C5E1A5]" />

          <div className="flex flex-col space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-green-700">
              Landlord Portal
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-black">
              List a New Rental Property
            </h1>
            <p className="text-sm text-neutral-600 max-w-xl">
              Fill out the details below to add a property. Once published, your
              listing will become instantly visible to active tenants searching
              in your location area.
            </p>
          </div>
        </div>

        {/* Form Placement Section with subtle background glow */}
        <div className="relative">
          {/* Subtle background ambient layout accent utilizing olive-200 / olive-300 palette gradients */}
          <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-[#DCEDC8] to-[#C5E1A5] opacity-20 blur-lg -z-10" />

          {/* Your React 19 optimized Form Component */}
          <CreatePropertyForm />
        </div>

        {/* Bottom Informational Segment */}
        <div className="p-4 rounded-lg bg-[#F1F8E9] border border-[#DCEDC8] flex items-start space-x-3">
          <div className="mt-0.5 rounded-full p-1 bg-[#C5E1A5]/40 text-green-700">
            <svg
              xmlns="http://w3.org"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-black uppercase tracking-wider">
              Verification Note
            </h4>
            <p className="text-xs text-neutral-700 leading-relaxed">
              Ensure accuracy for variables like{" "}
              <strong className="text-green-700">Rent Price</strong> and{" "}
              <strong className="text-green-700">Location Area</strong>.
              Falsifying system entries could get your landlord access
              privileges restricted under global platform standards.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
