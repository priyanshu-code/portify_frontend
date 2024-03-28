import * as z from 'zod';

export const aboutMeSchema = z.object({
  aboutMe: z.string().min(10, { message: 'Write at least 10 characters.' }).max(1000, { message: 'Max length 1000 characters.' }),
});
