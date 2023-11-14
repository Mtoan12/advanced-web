import * as z from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(4, "Username should be 4 - 20 character long")
    .max(20, "Username should be 4 - 20 character long")
    .regex(
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "User ís not valid",
    )
    .trim(),
  password: z
    .string()
    .min(6, "Password should be 6 - 20 character long")
    .max(20, "Password should be 6 - 20 character long")
    .trim(),
});
