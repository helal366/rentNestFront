import { PropertyAmenityEnum, PropertyCategoryEnum, PropertyLocationEnum, RentStatusEnum } from "@/lib/types";
import { z } from "zod";

export const frontendPropertySearchSchema = z
  .object({
    location: PropertyLocationEnum.optional(),
    category: PropertyCategoryEnum.optional(),
    rentStatus: RentStatusEnum.optional(),
    minPrice: z.coerce.number().min(0).optional(),
    maxPrice: z.coerce.number().min(0).optional(),
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    amenities: z
      .union([z.string(), z.array(z.string())])
      .optional()
      .transform((val) => (Array.isArray(val) ? val : val ? [val] : []))
      .pipe(z.array(PropertyAmenityEnum)),
  })
  .refine(
    (data) => {
      if (data.minPrice === undefined || data.maxPrice === undefined) {
        return true;
      }
      return data.minPrice <= data.maxPrice;
    },
    {
      message: "Minimum price cannot be greater than maximum price",
      path: ["minPrice"],
    },
  );
