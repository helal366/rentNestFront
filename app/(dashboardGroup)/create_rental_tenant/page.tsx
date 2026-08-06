import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreateRentalRequestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-white via-olive-200 to-olive-300 px-4 text-black">
      <main className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl border border-olive-200 text-center">
        {/* Info Icon Placeholder */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-700 text-white text-2xl font-bold">
          i
        </div>

        {/* Professional Speech Content */}
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight">
          Initiate Your <span className="text-green-700">Rental Request</span>
        </h1>

        <p className="mb-8 text-base leading-relaxed text-gray-700">
          To submit a formal rental request, you must first select a listing.
          Please proceed to our premium directory to search, filter, and
          identify your desired property. You will be able to finalize and
          dispatch your request directly from the comprehensive property details
          view.
        </p>

        {/* Action Button */}
        <Button
          asChild
          className="w-full bg-green-700 font-semibold text-white hover:bg-green-800 transition-colors py-6 text-lg"
        >
          <Link href="/properties">Browse Properties</Link>
        </Button>
      </main>
    </div>
  );
}
