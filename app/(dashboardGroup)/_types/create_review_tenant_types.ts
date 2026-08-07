import { PaymentStatus } from "@/lib/types";

export interface IPrismaProperty {
  id: string;
  rentStatus: string;
  category:{
    name:string;
  };
  approvedTenant: {
    name: string;
    email: string;
  } | null;
  location: string;
  areaInSqFt: number;
  amenities: string[];
  propertyReviews: IPropertyReview[] | null;
}

export interface IPrismaLandlord {
  id: string;
  name: string;
  email: string;
}

export interface IPayment {
  id: string;
  tenantId: string;
  paymentStatus: PaymentStatus;
}
export interface IPropertyReview {
  id: string;
  rating: number;
  content: string;
}
export interface IPaidRentalRequest {
  id: string;
  tenantId: string;
  landlordId: string;
  propertyId: string;
  
  isPaid: boolean;
  createdAt: string;
  rentalRequestProperty: IPrismaProperty;
  landlord: IPrismaLandlord;
  payments: IPayment[];
}

export interface IRentalRequestsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IPaidRentalRequest[];
}
