import { PropertyAmenity, PropertyLocation, RentStatus } from "@/lib/types";

export interface LandlordInfo {
  name: string;
  email: string;
  address: string;
  contactNo: string;
}

export interface PropertyInfo {
  id: string;
  rentStatus: RentStatus;
  rentPrice: number;
  areaInSqFt: number;
  location: PropertyLocation;
  amenities: PropertyAmenity[];
  landlord: LandlordInfo;
}

export interface CategoryWithProperties {
  id: string;
  name: string;
  properties: PropertyInfo[];
}

export interface CategoriesApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meta: {
      count: number;
    };
    categories: CategoryWithProperties[];
  };
}
