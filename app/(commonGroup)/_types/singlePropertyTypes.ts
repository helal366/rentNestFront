import {
  PropertyLocation,
  RentStatus,
  PropertyAmenity,
//   Role,
  UserStatus,
  RentRequestStatus,
} from "@/lib/types";

export interface UserMinimal {
  name: string;
  email: string;
  contactNo: string;
  address: string;
  userStatus: UserStatus;
}

export interface ReviewItem {
  content: string;
  rating: number;
  tenant: {
    name: string;
    email: string;
  };
}

export interface RentRequestItem {
  requestStatus: RentRequestStatus;
  isPaid: boolean;
  tenant: UserMinimal;
}

export interface PropertyDetails {
  id: string;
  propertyCategoryId: string;
  rentStatus: RentStatus;
  landlordId: string;
  approvedTenantId: string | null;
  rentPrice: number;
  location: PropertyLocation;
  areaInSqFt: number;
  amenities: PropertyAmenity[];
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  category: {
    name: string;
  };
  propertyRentRequests: RentRequestItem[];
  approvedTenant: UserMinimal | null;
  landlord: UserMinimal;
  propertyReviews: ReviewItem[];
}

export interface PropertyAPIResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    property: PropertyDetails;
  };
}
