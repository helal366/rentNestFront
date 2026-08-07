import { getAllReviews } from "../_actions/reviewsActions";
import { IReview } from "../_types/reviews_types";
import { Star } from "lucide-react";

export default async function ReviewsPage() {
  const res = await getAllReviews();

  if (!res.success) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load reviews
      </div>
    );
  }

  const reviews: IReview[] = res.data.reviews;

  if (!reviews.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No reviews found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf5] px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-black">My Reviews</h1>

        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-[#e6eddc] rounded-xl p-5 shadow-sm"
          >
            {/* ⭐ Rating */}
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating
                      ? "fill-green-700 text-green-700"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* 📝 Content */}
            <p className="text-black mb-2">{review.content}</p>

            {/* 📌 Meta Info */}
            <div className="text-sm text-gray-500 flex justify-between">
              <span>
                Property ID:{" "}
                <span className="text-green-700 font-medium">
                  {review.propertyId}
                </span>
              </span>

              {review.createdAt && (
                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
