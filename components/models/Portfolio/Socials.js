import * as z from "zod";

export const socialsSchema = z.object({
  LinkedIn: z
    .string()
    .max(1000, { message: "Max length 1000 characters." })
    .url({ message: "Invalid url" })
    .regex(/^https?:\/\/(?:www\.)?linkedin\.com(?:\/[^\s"]*)?\b/, { message: "Invalid url" })
    .optional()
    .or(z.literal("")),
  GitHub: z
    .string()
    .max(1000, { message: "Max length 1000 characters." })
    .url({ message: "Invalid url" })
    .regex(/^https?:\/\/(?:www\.)?github\.com(?:\/[^\s"]*)?\b/, { message: "Invalid url" })
    .optional()
    .or(z.literal("")),
  Instagram: z
    .string()
    .max(1000, { message: "Max length 1000 characters." })
    .url({ message: "Invalid url" })
    .regex(/^https?:\/\/(?:www\.)?instagram\.com(?:\/[^\s"]*)?\b/, { message: "Invalid url" })
    .optional()
    .or(z.literal("")),
});
