import { PropertyLocation, PropertyAmenity, RentRequestStatus } from "@/lib/types";

export interface ReviewerTenant {
  name: string;
  email: string;
}

export interface PropertyReview {
  content: string;
  rating: number;
  tenant: ReviewerTenant;
}

export interface UserContactInfo {
  name: string;
  email: string;
  address: string;
  contactNo: string;
}

export interface RentalRequestProperty {
  rentPrice: number;
  location: PropertyLocation;
  areaInSqFt: number;
  amenities: PropertyAmenity[];
  category: {
    name: string;
  };
  landlord: UserContactInfo;
  approvedTenant: UserContactInfo | null;
  propertyReviews: PropertyReview[];
}

export interface RentalRequest {
  id: string;
  tenantId: string;
  propertyId: string;
  requestStatus: RentRequestStatus;
  isPaid: boolean;
  landlordId: string;
  createdAt: string;
  updatedAt: string;
  rentalRequestProperty: RentalRequestProperty;
}

export interface APIResponseMeta {
  total: number;
}

export interface APIResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meta: APIResponseMeta;
    data: RentalRequest[];
  };
}
