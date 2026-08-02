import {
  PropertyAmenity,
  PropertyLocation,
  RentRequestStatus,
  RentStatus,
  Role,
  UserStatus,
} from "@/lib/types";

export type OwnProperty = {
  category: {
    name: string;
  };
  rentStatus: RentStatus;
  propertyRentRequests: {
    requestStatus: RentRequestStatus;
    isPaid: boolean;
  }[];

  rentPrice: number;
  areaInSqFt: number;
  location: string; // or your enum type
  amenities: string[]; // or enum if you defined PropertyAmenity
};
export type TenantReview = {
  content: string;
  rating: number;
  property: {
    rentPrice: number;
    areaInSqFt: number;
    location: PropertyLocation; // or your enum type
    amenities: PropertyAmenity[]; // or enum if defined
  };
};

export type TenantRentalRequest = {
  isPaid: boolean;
  requestStatus: RentRequestStatus;

  rentalRequestProperty: {
    rentPrice: number;
    areaInSqFt: number;
    location: PropertyLocation; // or your enum
    amenities: PropertyAmenity[]; // or enum if defined
  };

  landlord: {
    name: string;
    email: string;
    contactNo: string;
    address: string;
  };
};

export type ApprovedRentalProperty = {
  rentPrice: number;
  areaInSqFt: number;
  location: PropertyLocation;
  amenities: PropertyAmenity[];
  landlord: {
    name: string;
    email: string;
    contactNo: string;
    address: string;
  };
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: Role;
  address: string;
  contactNo: string;
  userStatus: UserStatus;
  isDeleted: boolean;
  deletedAt: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;

  ownProperties: OwnProperty[];
  tenantReviews: TenantReview[];
  tenantRentalRequests: TenantRentalRequest[];
  approvedRentalProperties: ApprovedRentalProperty[];
};

export type UserResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserProfile | null;
  
};
