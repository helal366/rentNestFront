"use server";

import { RentStatus, PropertyLocation, PropertyAmenity } from "@/lib/types";

export interface PropertyItem {
  id: string;
  rentPrice: number;
  location: PropertyLocation;
  areaInSqFt: number;
  amenities: PropertyAmenity[];
  rentStatus: RentStatus;
  category: {
    id: string;
    name: string;
  };
  landlord: {
    name: string;
  };
}

export interface PropertiesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    properties: PropertyItem[];
  };
}

const BASE_URL = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");

export async function fetchAvailableProperties(
  limit = 12,
): Promise<PropertiesResponse | null> {
  try {
    // Injecting query filters explicitly matching your backend filter properties
    const res = await fetch(
      `${BASE_URL}/api/properties?rentStatus=AVAILABLE&limit=${limit}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching homepage listings:", error);
    return null;
  }
}
