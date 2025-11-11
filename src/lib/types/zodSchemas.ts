import { z } from "zod";

import { VALIDATION } from "@/lib/utils/constants";

export const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(1, VALIDATION.USERNAME_EMPTY)
    .min(2, VALIDATION.USERNAME_MINIMUM)
    .regex(/^[^\s]+$/, VALIDATION.USERNAME_WHITESPACE),
  email: z
    .string()
    .min(1, VALIDATION.EMAIL_EMPTY)
    .min(2, VALIDATION.EMAIL_MINIMUM)
    .regex(/^[^\s]+$/, VALIDATION.EMAIL_WHITESPACE)
    .email(VALIDATION.EMAIL_FORMAT),
  password: z
    .string()
    .min(1, VALIDATION.PASSWORD_EMPTY)
    .min(8, VALIDATION.PASSWORD_MINIMUM)
    .regex(/^[^\s]+$/, VALIDATION.PASSWORD_WHITESPACE)
    .refine((value) => /[A-Z]/.test(value), VALIDATION.PASSWORD_UPPERCASE)
    .refine((value) => /[a-z]/.test(value), VALIDATION.PASSWORD_LOWERCASE)
    .refine((value) => /\d/.test(value), VALIDATION.PASSWORD_NUMBER)
    .refine(
      (value) => /[!@#$%^&*()_+-=\[\]\/\\;:'"{}|,.<>?`~]/.test(value),
      VALIDATION.PASSWORD_SPECIAL
    )
});

export const LoginFormSchema = z.object({
  emailOrUsername: z.string().min(1, VALIDATION.EMAIL_OR_USERNAME_EMPTY),
  password: z.string().min(1, VALIDATION.PASSWORD_EMPTY)
});

export const PasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(1, VALIDATION.PASSWORD_EMPTY)
      .min(8, VALIDATION.PASSWORD_MINIMUM)
      .regex(/^[^\s]+$/, VALIDATION.PASSWORD_WHITESPACE)
      .refine((value) => /[A-Z]/.test(value), VALIDATION.PASSWORD_UPPERCASE)
      .refine((value) => /[a-z]/.test(value), VALIDATION.PASSWORD_LOWERCASE)
      .refine((value) => /\d/.test(value), VALIDATION.PASSWORD_NUMBER)
      .refine(
        (value) => /[!@#$%^&*()_+-=\[\]\/\\;:'"{}|,.<>?`~]/.test(value),
        VALIDATION.PASSWORD_SPECIAL
      ),
    confirmPassword: z.string().min(1, VALIDATION.PASSWORD_EMPTY)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match!",
    path: ["confirmPassword"]
  });

export const UpdateEmailFormSchema = z
  .object({
    email: z.email(VALIDATION.EMAIL_FORMAT),
    oldEmail: z.string(),
    otp: z.string().min(1, VALIDATION.OTP_EMPTY).min(6, VALIDATION.OTP_MINIMUM)
  })
  .refine((data) => data.oldEmail.toLowerCase() !== data.email.toLowerCase(), {
    message: "Email must not be the same as the current email!",
    path: ["email"]
  });

export const UpdateUsernameFormSchema = z
  .object({
    username: z
      .string()
      .min(1, VALIDATION.USERNAME_EMPTY)
      .min(2, VALIDATION.USERNAME_MINIMUM)
      .regex(/^[^\s]+$/, VALIDATION.USERNAME_WHITESPACE),
    oldUsername: z.string()
  })
  .refine(
    (data) => data.username.toLowerCase() !== data.oldUsername.toLowerCase(),
    {
      message: "Username must not be the same as the current username!",
      path: ["username"]
    }
  );

export const UrlSchema = z.url();
