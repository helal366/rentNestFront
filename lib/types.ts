export type Role = "ADMIN" | "TENANT" | "LANDLORD";
export type UserStatus = "BANNED" | " UNBAN";

export type PropertyLocation =
  | "JATRABARI"
  | "JURAINE"
  | "MOTIJHEEL"
  | "TIKATULI"
  | "DOYAGANJ"
  | "GULISTAN"
  | "MUGDA"
  | "MANDA"
  | "KAMLAPUR"
  | "FAKIRAPUL"
  | "GOLAPBAG"
  | "GOPIBAG"
  | "BASABO"
  | "KHILGAON"
  | "RAMPURA"
  | "BANASRI"
  | "HATIRJHEEL"
  | "DHANMONDI"
  | "JIGATOLA"
  | "FARMGATE";

export type RentStatus = "RENTED" | "PENDING" | "AVAILABLE";

export interface IUser {
  success: boolean;
  statusCode: number; 
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: Role;
    address: string;
    contactNo: string;
    userStatus: UserStatus;
    isDeleted: boolean;
    deletedAt: string | Date | null; 
    createdAt: string | Date;
    updatedAt: string | Date;
  };
}

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