import { getPaidRentalRequests } from "../_actions/createReviewTenantActions";
import {
  IPaidRentalRequest,
  IPayment,
} from "../_types/create_review_tenant_types";
import { Home, ShieldCheck, Calendar, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function CreateReviewTenantPage() {
  const res = await getPaidRentalRequests();

  if (!res.success) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-medium">
        {res.message || "Failed to load rental properties"}
      </div>
    );
  }

  const requests: IPaidRentalRequest[] = res.data;
  console.log({ requests });

  if (!requests || !requests.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 px-4 text-center">
        <Home className="h-12 w-12 text-gray-300 mb-3" />
        <h3 className="text-lg font-semibold text-gray-700">
          No verified rentals found
        </h3>
        <p className="text-sm text-gray-400 mt-1 max-w-sm">
          You can only submit official reviews for rental spaces containing
          successful payment records.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf5] px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Write a Review
          </h1>
          <p className="text-gray-500 mt-1">
            Select a previously paid property below to share your stay
            experience.
          </p>
        </div>

        <div className="space-y-6">
          {requests.map((request) => {
            const property = request.rentalRequestProperty;
            const landlord = request.landlord;
            const paymentId = request.payments?.find(
              (payment) => payment.paymentStatus === "COMPLETED",
            )?.id;
            const rentalId = request.id;
            const isReviewed =
              !!request.rentalRequestProperty?.propertyReviews?.length;

            return (
              <div
                key={request.id}
                className="bg-white border border-[#e6eddc] rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row justify-between"
              >
                {/* Left Content Side: Details */}
                <div className="p-6 flex-1 divide-y divide-gray-100 space-y-4">
                  {/* Step 1: Property Meta (Muted background framework) */}
                  <div className="pb-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      <Home className="h-3 w-3" />
                      Rentals Database • Request ID:{" "}
                      {request.id.slice(-6).toUpperCase()}
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {property?.location}
                    </h2>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                      <div>
                        Area:{" "}
                        <span className="font-medium text-gray-500">
                          {property?.areaInSqFt} sqft
                        </span>
                      </div>
                      <div>
                        Status:{" "}
                        <span className="font-medium text-amber-700 capitalize">
                          {property?.rentStatus.toLowerCase()}
                        </span>
                      </div>
                          {property?.amenities && (
                            <div className="w-full mt-1 text-gray-400 truncate max-w-xl">
                              Amenities:{" "}
                              <span className="font-medium text-gray-500">
                                {property.amenities.join(", ")}
                              </span>
                            </div>
                          )}
                        <div>
                          Category:{" "}
                          <span className="font-medium text-amber-700 capitalize">
                            {property?.category?.name}
                          </span>
                        </div>
                    </div>
                  </div>

                  {/* Step 2: Landlord Contact Meta info */}
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5 font-bold text-gray-400 uppercase tracking-wider">
                        <ShieldCheck className="h-3.5 w-3.5 text-gray-400" />
                        <span>Landlord Contact</span>
                      </div>
                      <p className="font-medium text-gray-700">
                        {landlord?.name}
                      </p>
                      <p className="text-gray-500 truncate max-w-60">
                        {landlord?.email}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end justify-end text-gray-400">
                      <div className="flex items-center gap-1 text-xs">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          Paid on:{" "}
                          {new Date(request.createdAt).toLocaleDateString(
                            undefined,
                            { year: "numeric", month: "short", day: "numeric" },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Action Side: Interactive Link Box */}
                <div className="bg-[#fcfdfa] border-t md:border-t-0 md:border-l border-[#e6eddc] p-6 flex items-center justify-center min-w-50">
                  {isReviewed ? (
                    /* 1. Disabled Button State (When already reviewed) */
                    <button
                      disabled
                      className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-400 font-semibold text-sm py-3 px-5 rounded-xl border border-gray-200 cursor-not-allowed"
                    >
                      <span>Reviewed</span>
                    </button>
                  ) : (
                    /* 2. Active Link State (When NOT reviewed yet) */
                    <Link
                      href={`/leave_review?paymentId=${paymentId}&rentalId=${rentalId}`}
                      className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold text-sm py-3 px-5 rounded-xl shadow-sm transition-all group"
                    >
                      <span>Leave Review</span>
                      <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
