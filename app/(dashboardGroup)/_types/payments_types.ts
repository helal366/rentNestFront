import { PropertyAmenity, PropertyLocation, RentRequestStatus, Role, UserStatus } from "@/lib/types";

export interface APIResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// ==========================================
// 1. ALL PAYMENTS LISTING TYPES
// ==========================================
export interface PaymentListProperty {
  category: {
    name: string;
  };
  rentPrice: number;
  location: PropertyLocation;
}

export interface PaymentListRentalRequest {
  isPaid: boolean;
  rentalRequestProperty: PaymentListProperty;
}

export interface PaymentUserSummary {
  name: string;
  email: string;
}

/**
 * PaymentRecordAll represents the precise shape returned by
 * your `getPaymentHistoryServices` finding array query.
 */
export interface PaymentRecordAll {
  id: string;
  transactionId: string;
  rentalRequestId: string;
  tenantId: string;
  landlordId: string;
  amount: number;
  paymentStatus: "VALID" | "FAILED" | "PENDING" | string;
  sslSessionId: string;
  sslValidationId: string | null;
  sslRiskTitle: string | null;
  sslCardType: string | null;
  method: "CARD" | string;
  provider: "SSLCOMMERZ" | string;
  paidAt: string;
  rentalRequest: PaymentListRentalRequest;
  tenant: PaymentUserSummary;
  landlord: PaymentUserSummary;
}

// ==========================================
// 2. SINGLE PAYMENT DETAIL TYPES
// ==========================================
export interface PaymentSingleAmenity {
  id: string;
  name: string;
}

export interface PaymentSingleCategory {
  id: string;
  name: string;
}

/**
 * Represents the comprehensive structure of a property asset
 * returned inside a deep individual lookup detail view.
 */
export interface PaymentSingleProperty {
  id: string;
  propertyCategoryId: string;
  category: PaymentSingleCategory;
  rentStatus: "RENTED" | "PENDING" | "AVAILABLE" | string;
  landlordId: string;
  rentPrice: number;
  location: PropertyLocation;
  areaInSqFt: number;
  amenities: PropertyAmenity[]; // Array of strings or structured enum references
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentSingleRentalRequest {
  id: string;
  tenantId: string;
  propertyId: string;
  requestStatus: RentRequestStatus;
  isPaid: boolean;
  landlordId: string;
  createdAt: string;
  updatedAt: string;
  rentalRequestProperty: PaymentSingleProperty;
}

export interface PaymentUserDetails {
  id: string;
  name: string;
  email: string;
  role: Role;
  address: string;
  contactNo: string;
  userStatus: UserStatus;
}

/**
 * PaymentRecordSingle represents the exhaustive tracking object
 * returned by your individual detail fetching routine.
 */
export interface PaymentRecordSingle {
  id: string;
  transactionId: string;
  rentalRequestId: string;
  tenantId: string;
  landlordId: string;
  amount: number;
  paymentStatus: "VALID" | "FAILED" | "PENDING" | string;
  sslSessionId: string;
  sslValidationId: string | null;
  sslRiskTitle: string | null;
  sslCardType: string | null;
  method: "CARD" | string;
  provider: "SSLCOMMERZ" | string;
  paidAt: string;
  rentalRequest: PaymentSingleRentalRequest;
  tenant: PaymentUserDetails;
  landlord: PaymentUserDetails;
}
