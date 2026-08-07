import { PropertyAmenity, RentStatus } from "@/lib/types";

// Review Owner (Tenant)
export interface ITenant {
  name: string;
  email: string;
  address: string;
  contactNo: string;
}

// Property Category
export interface ICategory {
  name: string;
}

// Landlord Info
export interface ILandlord {
  name: string;
  email: string;
  address: string;
  contactNo: string;
}

// Property Info
export interface IProperty {
  category: ICategory;
  rentStatus: RentStatus;
  rentPrice: number;
  location: string;
  amenities: PropertyAmenity[];
  areaInSqFt: number;
  landlord: ILandlord;
}

// Review Main Type
export interface IReview {
  id: string;
  rating: number;
  content: string;
  propertyId:string;
  createdAt: string;

  tenant: ITenant;
  property: IProperty;
}

// API Response
export interface IGetAllReviewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    reviews: IReview[];
  };
}
// export interface IGetReviewsResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: {
//     reviews: IReview[];
//   };
// }
