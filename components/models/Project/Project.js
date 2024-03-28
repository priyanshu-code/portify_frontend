import * as z from "zod";

export const projectSchema = z.object({
  projectName: z
    .string()
    .max(100, { message: "Max length 100 characters." })
    .nonempty({ message: "Project name is required." }),
  projectDesc: z
    .string()
    .max(500, { message: "Max length 500 characters." })
    .nonempty({ message: "Project description is required." }),
  projectImage: z.string().nonempty({ message: "Project image is required." }),

  githubLink: z
    .string()
    .max(1000, { message: "Max length 1000 characters." })
    .url({ message: "Invalid url" })
    .regex(
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
      { message: "Invalid url" }
    )
    .optional()
    .or(z.literal("")),
  liveLink: z
    .string()
    .max(1000, { message: "Max length 1000 characters." })
    .url({ message: "Invalid url" })
    .regex(
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
      { message: "Invalid url" }
    )
    .optional()
    .or(z.literal("")),
  showcase: z.boolean(),
});
