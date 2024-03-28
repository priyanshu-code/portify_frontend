import * as z from "zod";
export const workSchema = z.array(
  z.object({
    companyName: z
      .string()
      .min(2, { message: "Min length 2" })
      .max(50, { message: "Max length 50." }),
    position: z.string().min(2, { message: "Min length 2" }).max(50, { message: "Max length 50." }),
    jobDescription: z
      .string()
      .min(2, { message: "Min length 2" })
      .max(200, { message: "Max length 200." }),
  })
);
