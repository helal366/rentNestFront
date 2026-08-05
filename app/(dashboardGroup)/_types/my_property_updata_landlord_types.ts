import { PropertyAmenity, PropertyCategory, PropertyLocation, RentStatus } from "@/lib/types";

export interface UpdatePropertyInput {
  category?: PropertyCategory;
  // This can be a string, number, or unknown prior to coercion/transformation
  rentPrice?: string | number | null | undefined;
  location?: PropertyLocation;
  areaInSqFt?: string | number | null | undefined;
  amenities?: PropertyAmenity[];
  rentStatus?: RentStatus;
}

export interface UpdatePropertyOutput {
  category?: PropertyCategory;
  rentPrice?: number; // Fully parsed whole integer number
  location?: PropertyLocation;
  areaInSqFt?: number; // Fully parsed layout footprint number
  amenities?: PropertyAmenity[];
  rentStatus?: RentStatus;
}

export interface UpdatePropertyFields {
  category?: PropertyCategory;
  rentPrice?: number;
  location?: PropertyLocation;
  areaInSqFt?: number;
  amenities?: PropertyAmenity[];
  rentStatus?: RentStatus;
}
export interface UpdatePropertyFieldsRHF {
  category?: PropertyCategory;
  rentPrice?: number | undefined;
  location?: PropertyLocation;
  areaInSqFt?: number |undefined;
  amenities?: PropertyAmenity[];
  rentStatus?: RentStatus;
}