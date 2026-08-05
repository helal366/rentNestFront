import { PropertyAmenityEnum, PropertyCategoryEnum, PropertyLocationEnum, RentStatusEnum } from "@/lib/types";
import z from "zod";

// Form Validation Schema
export const createPropertyFormSchema = z.object({
  category: PropertyCategoryEnum,
  rentPrice: z.coerce
    .number({ message: "Rent price is required" })
    .int("Must be a whole number")
    .positive("Price must be greater than 0"),
  location: PropertyLocationEnum,
  areaInSqFt: z.coerce
    .number({ message: "Area is required" })
    .int()
    .positive("Area must be greater than 0"),
  amenities: z.array(PropertyAmenityEnum),
  rentStatus: RentStatusEnum.default("AVAILABLE"),
});

export type ICreatePropertyFormRawInput = z.input<
  typeof createPropertyFormSchema
>;
export type ICreatePropertyFormParsedOutput = z.output<
  typeof createPropertyFormSchema
>;
export type ICreatePropertyFormInput = z.infer<typeof createPropertyFormSchema>;
