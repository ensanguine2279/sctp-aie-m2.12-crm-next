import { z } from "zod";

export const customerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().min(1, "Email is required").email("Invalid email"),
  phone: z.string().trim().min(1, "Phone is required"),
  status: z.enum(["active", "inactive"], {
    error: "Status is required",
  }),
});
