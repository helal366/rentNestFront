import { z } from "zod";
import {
  PropertyLocationEnum,
  PropertyAmenityEnum,
  RentStatusEnum,
  PropertyCategoryEnum,
} from "@/lib/types";

export const updatePropertyValidationSchema = z.object({
  category: PropertyCategoryEnum.optional(),

  rentPrice: z
    .number({ message: "Rent price must be a valid number." })
    .int({ message: "Must be an integer." })
    .nonnegative({ message: "Cannot be negative." })
    .optional(),

  location: PropertyLocationEnum.optional(),

  areaInSqFt: z
    .number({ message: "Area must be a valid number." })
    .positive({ message: "Must be greater than 0." })
    .optional(),

  amenities: z
    .array(PropertyAmenityEnum, {
      message: "Amenities must be an array.",
    })
    .optional(),

  rentStatus: RentStatusEnum.optional(),

  approvedTenantId: z
    .uuid({
      message: "Must be a valid UUID.",
    })
    .nullable()
    .optional(),
});

export type UpdatePropertyFormValues = z.infer<
  typeof updatePropertyValidationSchema
>;
