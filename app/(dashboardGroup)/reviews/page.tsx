import { getAllReviews } from "../_actions/reviewsActions";
import { IReview } from "../_types/reviews_types";
import { Star, Home, MessageSquare, ShieldCheck, User } from "lucide-react";

export default async function ReviewsPage() {
  const res = await getAllReviews();

  if (!res.success) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-medium">
        Failed to load reviews
      </div>
    );
  }

  const reviews: IReview[] = res.data.reviews;

  if (!reviews.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">
        No reviews found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf5] px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            My Reviews
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and inspect property feedback, tenants, and lease conditions.
          </p>
        </div>

        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-[#e6eddc] rounded-2xl shadow-sm overflow-hidden"
          >
            {/* 1. PROPERTY INFO (Softened & Demoted Visual Weight) */}
            <div className="p-5 bg-gray-50/50 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    <Home className="h-3 w-3" />
                    {review.property?.category?.name || "Property"} • ID:{" "}
                    {review.propertyId}
                  </div>
                  <h2 className="text-base font-semibold text-gray-700">
                    {review.property?.location}
                  </h2>
                </div>
                <div className="text-left sm:text-right text-sm">
                  <p className="font-bold text-gray-700">
                    TK {review.property?.rentPrice}
                    <span className="text-xs font-normal text-gray-400">
                      /mo
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 capitalize">
                    {review.property?.rentStatus.toLowerCase()} Status
                  </p>
                </div>
              </div>

              {/* Sub-details made ultra-clean and minor */}
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                <div>
                  Area:{" "}
                  <span className="font-medium text-gray-500">
                    {review.property?.areaInSqFt} sqft
                  </span>
                </div>
                <div>
                  Amenities:{" "}
                  <span className="font-medium text-gray-500 line-clamp-1">
                    {review.property?.amenities?.join(", ") || "None"}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. REVIEW INFO (The Hero / High-Contrast Section) */}
            <div className="p-6 bg-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4 text-green-700" />
                  <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Tenant Rating & Review
                  </span>
                </div>
                {review.createdAt && (
                  <span className="text-xs font-medium text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>

              {/* Enhanced wrapper background to make green text pop */}
              <div className="bg-green-50/40 p-5 rounded-xl border border-green-100/60 shadow-inner">
                <div className="flex items-center gap-1 mb-2.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-green-700 text-md font-bold leading-relaxed italic">
                  {review.content}
                </p>
              </div>
            </div>

            {/* 3. LANDLORD & TENANT INFO (Subtle, Muted Footer Panels) */}
            <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50/30 border-t border-gray-100 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {/* Landlord Column */}
              <div className="p-5 text-xs">
                <div className="flex items-center gap-1.5 mb-2.5 font-bold text-gray-400 uppercase tracking-wider">
                  <ShieldCheck className="h-3.5 w-3.5 text-gray-400" />
                  <span>Landlord Details</span>
                </div>
                <div className="space-y-1.5 text-gray-500">
                  <div className="flex justify-between">
                    <span>Name:</span>{" "}
                    <span className="font-medium text-gray-700">
                      {review.property?.landlord?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>{" "}
                    <span className="font-medium text-gray-600 select-all">
                      {review.property?.landlord?.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact:</span>{" "}
                    <span className="font-medium text-gray-600">
                      {review.property?.landlord?.contactNo}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Address:</span>{" "}
                    <span className="font-medium text-gray-600 truncate max-w-50">
                      {review.property?.landlord?.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tenant Column */}
              <div className="p-5 text-xs">
                <div className="flex items-center gap-1.5 mb-2.5 font-bold text-gray-400 uppercase tracking-wider">
                  <User className="h-3.5 w-3.5 text-gray-400" />
                  <span>Tenant Details</span>
                </div>
                <div className="space-y-1.5 text-gray-500">
                  <div className="flex justify-between">
                    <span>Name:</span>{" "}
                    <span className="font-medium text-gray-700">
                      {review.tenant?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>{" "}
                    <span className="font-medium text-gray-600 select-all">
                      {review.tenant?.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact:</span>{" "}
                    <span className="font-medium text-gray-600">
                      {review.tenant?.contactNo}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Address:</span>{" "}
                    <span className="font-medium text-gray-600 truncate max-w-50">
                      {review.tenant?.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
