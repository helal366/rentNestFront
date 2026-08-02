import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { z } from "zod";

export const RoleEnum = z.enum(["ADMIN", "TENANT", "LANDLORD"]);
export const RentRequestStatusEnum = z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const UserStatusEnum = z.enum(["BANNED", "UNBAN"]);
export const RentStatusEnum = z.enum(["RENTED", "PENDING", "AVAILABLE"]);

export const PropertyLocationEnum = z.enum([
  "JATRABARI", "JURAINE", "MOTIJHEEL", "TIKATULI", "DOYAGANJ",
  "GULISTAN", "MUGDA", "MANDA", "KAMLAPUR", "FAKIRAPUL",
  "GOLAPBAG", "GOPIBAG", "BASABO", "KHILGAON", "RAMPURA",
  "BANASRI", "HATIRJHEEL", "DHANMONDI", "JIGATOLA", "FARMGATE"
]);


export const PropertyAmenityEnum = z.enum([
  "WIFI", "PARKING", "AIR_CONDITIONING", "HEATING", "KITCHEN",
  "WASHER", "DRYER", "SWIMMING_POOL", "GYM", "ELEVATOR"
]);



export const PropertyCategoryEnum = z.enum([
  "APARTMENT",
  "OFFICE",
  "SHOP",
  "STUDIO",
  "DUPLEX",
  "HOUSE",
]);

export type Role = z.infer<typeof RoleEnum>;
export type PropertyLocation = z.infer<typeof PropertyLocationEnum>;
export type RentStatus = z.infer<typeof RentStatusEnum>;
export type PropertyAmenity = z.infer<typeof PropertyAmenityEnum>;
export type PropertyCategory = z.infer<typeof PropertyCategoryEnum>;
export type RentRequestStatus = z.infer<typeof RentRequestStatusEnum>;
export type UserStatus = z.infer<typeof UserStatusEnum>;


export type LoginActionState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    accessToken?: string;
    refreshToken?:string
  };
  errors?: {
    email?: string[];
    password?: string[];
  };
};
export type LoginResponse = {
  success: boolean;
  message: string;
  data : {
    accessToken: string;
    refreshToken:string;
  }
}

// register

export interface IRegisterUserData {
  id: string;
  name: string;
  email: string;
  role: Role;
  address: string;
  contactNo: string;
  userStatus: UserStatus;
  createdAt: string; 
  updatedAt: string; 
}

export interface RegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IRegisterUserData;
}

export interface RegisterActionState {
  success: boolean;
  statusCode: number;
  message: string;
  data?: IRegisterUserData | null;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    role?: string[];
    address?: string[];
    contactNo?: string[];
  };
}

export type ISidebarItem = {
    label: string,
    href: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}


