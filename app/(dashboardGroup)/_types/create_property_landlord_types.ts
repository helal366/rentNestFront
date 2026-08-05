import { PropertyAmenity, PropertyCategory, PropertyLocation, RentStatus } from "@/lib/types";


export interface IPropertyBackendData {
  id: string;
  propertyCategoryId: string;
  category: PropertyCategory;
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
}

export type CreatePropertyActionResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: IPropertyBackendData;
  errors?: string[];
};
