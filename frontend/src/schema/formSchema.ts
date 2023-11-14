import * as z from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name").trim(),
  lastName: z.string().min(1, "Please enter your last name").trim(),
  birthday: z
    .string()
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      return date < now;
    }, "Birthday must be in the past")
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      return now.getFullYear() - date.getFullYear() >= 100;
    }, "Please enter a valid birthday"),
  gender: z.string(),
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email")
    .trim(),
  password: z
    .string()
    .min(6, "Password should be 6 - 20 character long")
    .max(20, "Password should be 6 - 20 character long")
    .trim(),
});

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email")
    .trim(),
  password: z.string().min(1, "Please enter your password").trim(),
});
