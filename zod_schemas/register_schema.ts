import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long." })
      .max(50, { message: "Name cannot exceed 50 characters." }),
    email: z.email({ message: "Invalid email address format." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required." }),
    role: z.enum(["TENANT", "LANDLORD", "ADMIN"], {
      error: () => "Please select a valid account role.",
    }),

    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters long." }),
    contactNo: z
      .string()
      .min(10, {
        message: "Contact number must be at least 10 characters long.",
      })
      .regex(/^0[19][0-9]{9}$/, {
         message: "Contact number must be 11 digits, starting with 01 or 09.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], 
  });

export type RegisterInput = z.infer<typeof registerSchema>;
