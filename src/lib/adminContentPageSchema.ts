import { z } from "zod";

const safePathnameSchema = z
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
    "Invalid pathname",
  );

const editableContentItemSchema = z.object({
  key: z.string().min(1).max(200),
  title: z.string().max(300),
  text: z.string().max(30_000),
  meta: z.string().max(2_000),
});

const editableContentSectionSchema = z.object({
  key: z.string().min(1).max(200),
  title: z.string().max(300),
  intro: z.string().max(5_000),
  items: z.array(editableContentItemSchema).max(100),
});

export const editableContentPageSchema = z.object({
  title: z.string().trim().min(1).max(300),
  intro: z.string().max(5_000),
  sections: z.array(editableContentSectionSchema).max(100),
});

export const editableContentPageRequestSchema =
  editableContentPageSchema.extend({
    pathname: safePathnameSchema,
  });

export type EditableContentPageFormValues = z.infer<
  typeof editableContentPageSchema
>;
