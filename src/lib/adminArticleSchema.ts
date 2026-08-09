import { z } from "zod";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export const editableNewsArticleSchema = z.object({
  title: z.string().trim().min(1).max(200),
  date: z
    .string()
    .trim()
    .regex(datePattern)
    .refine((value) => !Number.isNaN(Date.parse(`${value}T12:00:00Z`))),
  excerpt: z.string().trim().min(1).max(600),
  body: z.string().trim().min(1).max(30_000),
});

export const editableNewsArticleRequestSchema = editableNewsArticleSchema.extend({
  pathname: z
    .string()
    .trim()
    .min(1)
    .max(500)
    .startsWith("/")
    .refine(
      (value) =>
        !value.startsWith("//") &&
        !value.includes("..") &&
        !value.includes("?") &&
        !value.includes("#"),
    ),
});

export type EditableNewsArticleFormValues = z.infer<
  typeof editableNewsArticleSchema
>;
