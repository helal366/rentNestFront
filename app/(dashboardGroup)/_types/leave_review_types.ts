export interface IRentalResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    rentalRequest: {
      id: string;
      rentalRequestProperty: {
        id: string;
      };
    };
  };
}

export interface ICreateReviewPayload {
  propertyId: string;
  content: string;
  rating: number;
}

export interface IReviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    id: string;
    propertyId: string;
    tenantId: string;
    content: string;
    rating: number;
  };
}
