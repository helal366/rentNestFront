"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { getRentalById, createReview } from "../_actions/leaveReviewActions";

export default function LeaveReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rentalId = searchParams.get("rentalId");

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setContent] = useState("");
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch propertyId from rentalId
  useEffect(() => {
    const fetchRental = async () => {
      if (!rentalId) return;

      const res = await getRentalById(rentalId);

      if (res?.success) {
        if(!res.data){
          return
        }
        const pid = res.data.rentalRequest.rentalRequestProperty.id;
        setPropertyId(pid);
        
      } else {
        toast.error("Failed to load rental info");
      }
    };

    fetchRental();
  }, [rentalId, router]);

  // ✅ Submit review
  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    if (!content.trim()) {
      toast.error("Please write a review");
      return;
    }

    if (!propertyId) {
      toast.error("Invalid property");
      return;
    }

    setLoading(true);

    const res = await createReview({
      propertyId,
      rating,
      content,
    });

    setLoading(false);

    if (res.success) {
      toast.success("Review submitted successfully 🎉");
      setRating(0);
      setContent("");
      setTimeout(() => {
        router.push("/reviews");
      }, 800);
    } else {
      toast.error(res.message || "Failed to submit review");
    }
  };

 
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8faf5] px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-md border border-[#e6eddc]">
        <h1 className="text-2xl font-bold text-black mb-4">Leave A Review</h1>

        {/* ⭐ Star Rating */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`cursor-pointer transition ${
                star <= (hover || rating)
                  ? "fill-green-700 text-green-700"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>

        <p className="text-sm text-gray-600 mb-2">
          Your Rating:{" "}
          <span className="text-green-700 font-semibold">
            {rating || "Not selected"}
          </span>
        </p>

        {/* 📝 Review Content */}
        <Textarea
          placeholder="Write your experience about the property..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4 bg-[#f1f5ec] text-black border border-[#dbe5cf]"
        />

        {/* 🚀 Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-700 hover:bg-green-800 text-white"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </div>
  );
}
