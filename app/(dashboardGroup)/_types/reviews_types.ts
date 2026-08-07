export interface IReview {
  id: string;
  propertyId: string;
  tenantId: string;
  content: string;
  rating: number;
  createdAt?: string;
}

export interface IGetReviewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    reviews: IReview[];
  };
}
