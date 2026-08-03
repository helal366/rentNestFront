import {
  PropertyLocation,
  RentStatus,
  PropertyAmenity,
  RentRequestStatus,
  UserStatus,
} from "@/lib/types"; // Adjust import path to your enums

// --- Types for All Rental Requests (findMany) ---
export interface ApprovedTenantSummary {
  name: string;
  email: string;
}

export interface PropertySummaryAll {
  id: string;
  rentStatus: RentStatus;
  approvedTenant: ApprovedTenantSummary | null;
  location: PropertyLocation;
  areaInSqFt: number;
  amenities: PropertyAmenity[];
}

export interface LandlordSummaryAll {
  id: string;
  name: string;
  email: string;
}

export interface RentalRequestAllItem {
  id: string;
  tenantId: string;
  propertyId: string;
  requestStatus: RentRequestStatus;
  isPaid: boolean;
  landlordId: string;
  createdAt: string;
  updatedAt: string;
  rentalRequestProperty: PropertySummaryAll;
  landlord: LandlordSummaryAll;
}

// --- Types for Single Rental Request (findUniqueOrThrow) ---
export interface CategorySummarySingle {
  name: string;
}

export interface PropertyDetailSingle {
  id: string;
  rentPrice: number;
  location: PropertyLocation;
  rentStatus: RentStatus;
  areaInSqFt: number;
  amenities: PropertyAmenity[];
  category: CategorySummarySingle;
}

export interface UserDetailSingle {
  id: string;
  name: string;
  email: string;
  address: string;
  contactNo: string;
  userStatus: UserStatus;
}

export interface PaymentItemSingle {
  amount: number;
  paidAt: string;
  method: string;
  paymentStatus: string;
  provider: string;
}

export interface RentalRequestSingleData {
  id: string;
  tenantId: string;
  propertyId: string;
  requestStatus: RentRequestStatus;
  isPaid: boolean;
  landlordId: string;
  createdAt: string;
  updatedAt: string;
  rentalRequestProperty: PropertyDetailSingle;
  landlord: UserDetailSingle;
  tenant: UserDetailSingle;
  payments: PaymentItemSingle[];
}

// Backend wraps single request response inside an object: { rentalRequest: ... }
export interface SingleRentalRequestResponse {
  rentalRequest: RentalRequestSingleData;
}
