import { PropertyAmenity, PropertyLocation, RentRequestStatus, Role, UserStatus } from "@/lib/types";

export interface BackendResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meta: {
      totalUsers: number; // The global total users count
    };
    users: UserData[]; // Your actual array list of users
  };
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: Role;
  address: string;
  contactNo: string;
  userStatus: UserStatus;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  tenantReviews: TenantReviewUsers[];
  ownProperties: LandlordPropertyUsers[];
  _count: {
    tenantReviews: number;
    tenantPayments: number;
    landlordPayments: number;
    tenantRentalRequests: number;
    approvedRentalProperties: number;
    ownProperties: number;
    requestsOwnProperty: number;
  };
}

export interface TenantReviewUsers {
  content: string;
  rating: number;
  tenant: BaseUserInfo;
  property: {
    rentPrice: number;
    areaInSqFt: number;
    amenities: PropertyAmenity[];
    location: PropertyLocation;
    landlord: BaseUserInfo;
  };
}

export interface LandlordPropertyUsers {
  rentPrice: number;
  areaInSqFt: number;
  amenities: PropertyAmenity[];
  location: PropertyLocation;
  category: {
    name: string;
  };
  propertyRentRequests: LandlordRentRequest[];
  approvedTenant: BaseUserInfo | null;
  _count: {
    propertyRentRequests: number;
    propertyReviews: number;
  };
}

export interface LandlordRentRequest {
  isPaid: boolean;
  requestStatus: RentRequestStatus;
  tenant: BaseUserInfo & { role: Role };
}

interface BaseUserInfo {
  name: string;
  email: string;
  address: string;
  contactNo: string;
}
