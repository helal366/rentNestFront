import { PropertyLocation, RentRequestStatus, RentStatus, UserStatus } from "@/lib/types";

// properties 
export interface getAllPropertiesMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface getAllPropertiesCategory {
  id: string;
  name: string; 
}

export interface getAllPropertiesRentRequest {
  id: string;
  isPaid: boolean;
  requestStatus: RentRequestStatus;
}

export interface getAllPropertiesProfileSummary {
  id: string;
  name: string;
  email: string;
  contactNo: string;
  userStatus: UserStatus;
}

export interface getAllPropertiesItem {
  id: string;
  propertyCategoryId: string;
  rentStatus: RentStatus;
  landlordId: string;
  approvedTenantId: string | null;
  rentPrice: number;
  location: PropertyLocation;
  areaInSqFt: number;
  amenities?: string[];
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  category: getAllPropertiesCategory;
  propertyRentRequests: getAllPropertiesRentRequest[];
  approvedTenant: getAllPropertiesProfileSummary | null;
  landlord: getAllPropertiesProfileSummary;
}

export interface GetPropertiesResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    meta: getAllPropertiesMeta;
    properties: getAllPropertiesItem[];
  };
}