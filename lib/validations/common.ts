import { z } from "zod"

export const emailSchema = z.email("Enter a valid email address")

export const urlSchema = z.url("Enter a valid URL")

export const uuidSchema = z.uuid("Enter a valid UUID")

export const dateSchema = z.iso.date("Enter a valid date (YYYY-MM-DD)")

export const dateTimeSchema = z.iso.datetime("Enter a valid date and time")

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s()-]{7,20}$/, "Enter a valid phone number")

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be at most 128 characters")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[0-9]/, "Password must contain a number")

export const slugSchema = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .max(128, "Slug must be at most 128 characters")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens")

export const nonEmptyString = (field: string, max = 255) =>
  z.string().trim().min(1, `${field} is required`).max(max, `${field} must be at most ${max} characters`)

export const idParamSchema = z.object({
  id: uuidSchema,
})

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
})

export type Email = z.infer<typeof emailSchema>
export type Url = z.infer<typeof urlSchema>
export type Password = z.infer<typeof passwordSchema>
export type Slug = z.infer<typeof slugSchema>
export type Pagination = z.infer<typeof paginationSchema>
export type IdParam = z.infer<typeof idParamSchema>