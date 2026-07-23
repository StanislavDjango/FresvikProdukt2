import { defineField, defineType } from "sanity";
import { languageFields } from "./languageFields";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    ...languageFields,
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "migrationCards",
      title: "Migrated cards",
      type: "array",
      of: [{ type: "migrationCard" }],
      description: "Exact page cards imported from the local migration source.",
    }),
    defineField({
      name: "migrationSections",
      title: "Migrated sections",
      type: "array",
      of: [{ type: "migrationSection" }],
      description: "Exact page sections imported from the local migration source.",
    }),
    defineField({ name: "heroImage", title: "Hero image", type: "image" }),
    defineField({
      name: "migratedImagePath",
      title: "Migrated local image path",
      type: "string",
      description:
        "Temporary public/assets path used before the image is imported as a Sanity asset.",
    }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "openGraphImage",
      title: "OpenGraph image",
      type: "image",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
