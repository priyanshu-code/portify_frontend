import * as z from 'zod';

// Register user Schema
export const registerUserSchema = z
  .object({
    username: z
      .string()
      .regex(/^[a-zA-Z][a-zA-Z0-9_.-]*$/, {
        message: 'Username must not start with number and can only contain alphanumeric',
      })
      .min(3, { message: 'username must be at least 3 characters.' })
      .max(50, { message: 'Max length 50 characters.' }),
    firstname: z.string().min(3, { message: 'First name must be at least 3 characters.' }).max(50, { message: 'Max length 50 characters.' }),
    lastname: z.string().min(3, { message: 'Last name must be at least 3 characters.' }).max(50, { message: 'Max length 50 characters.' }),
    email: z.string().email().min(3, { message: 'Email must be at least 3 characters.' }).max(50, { message: 'Max length 50 characters.' }),
    password: z.string().min(6, { message: 'Password must be least 6 characters.' }).max(500, { message: 'Max length 500 characters.' }),
    confirm: z.string().min(3, { message: 'Password must be least 6 characters.' }).max(500, { message: 'Max length 500 characters.' }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

// Username schema for google registration
export const usernameSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z][a-zA-Z0-9_.-]*$/, {
      message: 'Username must not start with number and can only contain alphanumeric',
    })
    .min(3, { message: 'username must be at least 3 characters.' })
    .max(50, { message: 'Max length 50 characters.' }),
});

// Reset password schema
export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, { message: 'Password must be least 6 characters.' }).max(500, { message: 'Max length 500 characters.' }),
    confirm: z.string().min(3, { message: 'Password must be least 6 characters.' }).max(500, { message: 'Max length 500 characters.' }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

// Reset password using current password schema
export const resetPasswordUsingCurrentPasswordSchema = z
  .object({
    currentPassword: z.string().min(6, { message: 'Password must be least 6 characters.' }).max(500, { message: 'Max length 500 characters.' }),
    password: z.string().min(6, { message: 'Password must be least 6 characters.' }).max(500, { message: 'Max length 500 characters.' }),
    confirm: z.string().min(3, { message: 'Password must be least 6 characters.' }).max(500, { message: 'Max length 500 characters.' }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

// User Update schema
export const userSchema = z.object({
  firstname: z.string().min(3, { message: 'First name must be at least 3 characters.' }).max(50, { message: 'Max length 50 characters.' }),
  lastname: z.string().min(3, { message: 'Last name must be at least 3 characters.' }).max(50, { message: 'Max length 50 characters.' }),
});
