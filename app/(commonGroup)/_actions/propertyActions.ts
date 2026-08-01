"use server";
import { redirect } from "next/navigation";

// Form action handler that manages your layout query states safely 
export async function handleFilterSubmit(formData: FormData) {
  const params = new URLSearchParams();
  console.log("from propertyActions: ", {formData, params})

  const location = formData.get("location") as string;
  const category = formData.get("category") as string;
  const rentStatus = formData.get("rentStatus") as string;
  const minPrice = formData.get("minPrice") as string;
  const maxPrice = formData.get("maxPrice") as string;
  
  // Collect all checked checkbox fields from shadcn layout
  const amenities = formData.getAll("amenities") as string[];

  if (location && location !== "ALL") params.set("location", location);
  if (category && category !== "ALL") params.set("category", category);
  if (rentStatus && rentStatus !== "ALL") params.set("rentStatus", rentStatus);
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);
  
  if (amenities.length > 0) {
    params.set("amenities", amenities.join(","));
  }

  params.set("page", "1");
  // params.set("limit", "12");

  const queryString= params.toString()

  console.log("after set data in params: ",{params})
  console.log("after set data in params and to String: ",{queryString})
  redirect(`/properties?${params.toString()}`);
}
