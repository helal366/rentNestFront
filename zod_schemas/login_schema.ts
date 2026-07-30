import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email({ message: "Invalid email address format." }),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export type LoginInput = z.infer<typeof loginSchema>;
